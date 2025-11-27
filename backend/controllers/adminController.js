import validator from 'validator'
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

const addDoctor = async (req,res) =>{

    try {

        const {name,email,password,speciality,degree,experience,about,available,fees,address} = req.body;

        const imageFile = req.file;

        
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            res.json({success:false,message:"missing Values"})
        }

        if(!validator.isEmail(email)){
            res.json({success:false,message:"invalid email"});
        }

        if(password.length < 8){
            res.send({success:false,message:"Enter strong password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url;


        const doctorData = {
            name,
            email,
            password:hashedpassword,
            image:imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:error.message});
    }   
}

const loginAdmin = async (req,res) =>{

    try {
        const {email,password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);

            res.json({success:true,token});
        }
        else{
            res.json({success:false,message:"invalid credinitials"});
        }

        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const allDoctors = async (req,res) => {
    const doctors = await doctorModel.find({}).select('-password');

    res.json({success:true,doctors});
}


//api to get appointment list

const appointmentsAdmin = async (req,res) => {

    try {

        const appointments = await appointmentModel.find({});
        res.json({success:true,appointments});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const appointmentCancel = async (req,res) => {
    const {appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId);

    
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    const {docId,slotDate,slotTime} = appointmentData

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:"Appointment Cancelled"});
}


const adminDashboard = async (req,res) =>{
    try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}


export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}