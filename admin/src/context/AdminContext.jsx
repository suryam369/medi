
import { createContext, useState } from "react";

import {assets} from '../assets/assets'
import { toast } from "react-toastify";
import axios from "axios";



export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [doctors,setDoctors] = useState([])

    const [appointments,setAppointments] = useState([])

    const [dashData,setDashdata] = useState(false)

    const getAllDoctors = async() =>{

        try {
            
            const res = await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{aToken}})

            if(res.data.success){
                setDoctors(res.data.doctors);
            }
            else{
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            
            const res = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}});

            if(res.data.success){
                toast.success(res.data.message);
                getAllDoctors();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAllAppointments = async () => {
        try {
            
            const res = await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}});

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

    const cancelAppointment = async (appointmentId) => {
        try {
            
            const res = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            
            if(res.data.success){
                toast.success(res.data.message);
                getAllAppointments();
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

            const res = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}});

            if(res.data.success){
                setDashdata(res.data.dashData);
            }
            else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        aToken,setAToken,backendUrl,assets,doctors,getAllDoctors,changeAvailability,getAllAppointments,appointments,cancelAppointment,
        dashData,getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;