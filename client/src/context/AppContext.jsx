import { createContext, useEffect, useState } from "react";
import { assets,  specialityData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const navigate = useNavigate();

    const [doctors,setDoctors] = useState([]);

    const [userData,setUserData] = useState(false);

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);



    const currency = '$'
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const getAllDoctors = async () => {

        try {

            const res = await axios.get(backendUrl + '/api/doctor/list');

            if(res.data.success){
                setDoctors(res.data.doctors)
            }
            else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }

        
    }


    const loadingProfileData = async () => {
        try {
            
            const res = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}});

            if(res.data.success){
                setUserData(res.data.userData);
            }
            else{
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    

    useEffect(()=>{
        getAllDoctors();
    },[])

    useEffect(()=>{
        if(token){
            loadingProfileData();
        }
        else{
            setUserData(false)
        }
        
    },[token])


    const value = {
        doctors,getAllDoctors,
        assets,
        specialityData,
        navigate,
        currency,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadingProfileData,
        
    };

    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
}

export default  AppContextProvider;


