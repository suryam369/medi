
import { createContext, useState } from "react";

import axios from 'axios'

import {toast} from 'react-toastify'

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [dToken,setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');

    const [appointments,setAppointments] = useState([]);

    const [dashData,setDashData] = useState(false);

    const [profileData,setProfileData] = useState(false)

    const getAppointments =async () => {
       try {

            const res = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}});

            if(res.data.success){
                setAppointments(res.data.appointments);
                
            }
            else{
                toast.error(res.data.message);
            }

       } catch (error) {
            toast.error(error.message);
       }
    }   
    
    const completeAppointment =async (appointmentId) => {
        try {
            
            const res = await axios.post(backendUrl + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}});

            if(res.data.success){
                
                toast.success(res.data.message);
                getAppointments()
            }
            else{
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const cancelAppointment =async (appointmentId) => {
        try {
            
            const res = await axios.post(backendUrl + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}});

            if(res.data.success){
                
                toast.success(res.data.message);
                getAppointments()
            }
            else{
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDashData = async () => {
        try {

            const res = await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{dToken}});
            
            if(res.data.success){
                setDashData(res.data.dashData);
            }
            else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    const getprofileData =async () => {
        try {
            
            const res = await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}});

            if(res.data.success){
                setProfileData(res.data.profileData)
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        dToken,setDToken,backendUrl,
        appointments,getAppointments,
        completeAppointment,cancelAppointment,
        getDashData,dashData,profileData,getprofileData,
        setProfileData 
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;
