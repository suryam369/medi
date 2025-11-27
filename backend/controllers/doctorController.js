import bcrypt from "bcryptjs";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

import sendMail from "../utils/sendMail.js";

const changeAvailability = async (req,res) => {
    try {
        
        const {docId} = req.body;

        const doct = await doctorModel.findById(docId);

        await doctorModel.findByIdAndUpdate(docId,{available:!doct.available});
        res.json({success:true,message:'Availability Changed'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const doctorsList = async (req,res) => {
    try {
        

        const doctors = await doctorModel.find({}).select(['-password','-email']);

        res.json({success:true,doctors});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
 }


 const loginDoctor = async (req,res) => {
    try {

        const {email,password} = req.body;

        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success:false,message:"Invalid credinitials"})
        }

        const isMatch = await bcrypt.compare(password,doctor.password);

        if(isMatch){

            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET);

            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credinitials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
 }


 const appointmentsDoctor =  async (req,res) => {

    try {
        
        const {docId} = req.body;

        const appointments = await appointmentModel.find({docId});

        res.json({success:true,appointments});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
 }

//  const appointmentComplete = async (req,res) => {
//     try {
        
//         const {docId , appointmentId} = req.body;

//         const appointmentData = await appointmentModel.findById(appointmentId);

//         if(appointmentData && appointmentData.docId === docId){
//             await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
//             return res.json({success:true,message:"Appointment Completed"})
//         }
//         else{
//             return res.json({success:false,message:'Mark Failed'})
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message});
//     }
//  }

//  const appointmentCancel = async (req,res) => {
//     try {
        
//         const {docId , appointmentId} = req.body;

//         const appointmentData = await appointmentModel.findById(appointmentId);

//         if(appointmentData && appointmentData.docId === docId){
//             await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
//             return res.json({success:true,message:"Appointment Cancelled"})
//         }
//         else{
//             return res.json({success:false,message:'Cancellation Failed'})
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message});
//     }
//  }



const appointmentComplete = async (req, res) => {
    try {
      const { docId, appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      if (appointmentData && appointmentData.docId === docId) {
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

        const message = `Your appointment with Dr. ${appointmentData.docData.name} has been completed. Thank you for visiting!`;
        await sendMail(appointmentData.userData.email, "Appointment Completed", message);
  
        return res.json({ success: true, message: "Appointment Completed and Email Sent" });
      } else {
        return res.json({ success: false, message: 'Marking as complete failed' });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
const appointmentCancel = async (req, res) => {
    try {
      const { docId, appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      if (appointmentData && appointmentData.docId === docId) {
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  
      
        let message = `Your appointment with Dr. ${docId} has been cancelled due to personal reasons. Please book another doctor.`;
        if (appointmentData.payment) {
          message += `\nYour payment will be refunded to your account soon.`;
        }
  
        await sendMail(appointmentData.userData.email, "Appointment Cancelled", message);
  
        return res.json({ success: true, message: "Appointment Cancelled and Email Sent" });
      } else {
        return res.json({ success: false, message: 'Cancellation failed' });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };


 const doctorDashboard = async (req,res) => {
    try {
        
        const {docId} = req.body;

        const appointments = await appointmentModel.find({docId});

        let earnings = 0;

        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
 }

 const doctorProfile = async (req,res) => {
    try {

        const {docId} = req.body;

        const profileData = await doctorModel.findById(docId).select('-password');

        res.json({success:true,profileData});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
 }

 const updateDoctorProfile = async(req,res) => {
        try {

            const {docId,fees,address,available} = req.body;
            
            await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

            res.json({success:true,message:"profile updated"});
            
        } catch (error) {
            console.log(error);
            res.json({success:false,message:error.message});
        }
 }


export {changeAvailability,doctorsList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile}