
import validator from 'validator'

import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

import razorpay  from 'razorpay'


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validations
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" }); 
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already in use" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({ success: true, token });

    } catch (error) {
        console.log("Login error:", error);
        return res.json({ success: false, message: error.message });
    }
}


const getProfile = async (req,res) => {
    try {
        
        const { userId } = req.body;

        // const {userId} = req;

        const userData = await userModel.findById(userId).select('-password');

        res.json({success:true,userData});


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}


const updateprofile = async (req,res) => {
    try {
        
        const {userId,name,phone,address,dob,gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !gender || !dob || !address){
            return res.json({success:false,message:"Missing values"});
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){

            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId,{image:imageUrl});
        }

        res.json({success:true,message:"profile Updated"});

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}


const bookAppointment = async (req,res) => {

    try {
        
        const {userId,docId,slotDate,slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success:false,message:'Doctor not available'});
        }

        let slots_booked = docData.slots_booked;

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:'slot not available'});
            }
            else{
                slots_booked[slotDate].push(slotTime);
            }
        }else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);

        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"appointment booked"});



    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
    
}

const listAppointments = async (req,res) => {

    try {
        const {userId} = req.body

        const appointments = await appointmentModel.find({userId})

        res.json({success:true,appointments});

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
   
}

const cancelAppointments = async (req,res) => {
    const {userId,appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId);

    if(appointmentData.userId !== userId){
        return res.json({success:false,message:"unauthorized action"});
    }

    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    const {docId,slotDate,slotTime} = appointmentData

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:"Appointment Cancelled"});
}


//Api to make payment online using stripe

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req,res) => {

    try {

        const {appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:false,message:"Appointment cancelled or not found"});
        }

        const options = {
            amount:appointmentData.amount * 100,
            currency:process.env.CURRENCY,
            receipt:appointmentId
        }

        const order = await razorpayInstance.orders.create(options)

        res.json({success:true,order})
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
    
}


//api to verify payment of razorpay

const verifyRazorpay = async (req,res) => {
    try {
        
        const {razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payment successful"})
        }
        else{
            res.json({success:false,message:"Payment failed"})
        }

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}




export {registerUser,loginUser,getProfile,updateprofile,bookAppointment,listAppointments,cancelAppointments,paymentRazorpay,verifyRazorpay}