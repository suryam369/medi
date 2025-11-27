import React, { useContext } from 'react'

import {AppContext} from '../context/AppContext'

const About = () => {

  const {assets} = useContext(AppContext)
  
  return (
    <div>
      <div>
        <p className='font-lora text-center text-gray-500 sm:text-base md:text-2xl my-9'>ABOUT <span className='text-gray-700 font-lora'>US</span></p>
      </div>
      <div className='flex flex-col gap-2 md:flex-row'>
        <img className='w-full shadow-md md:w-1/4 rounded' src={assets.about_image} alt="" />
        <div className='flex flex-col w-full gap-4 p-2 border rounded-lg shadow-md md:w-3/4 shadow-gray-300'>
          <p >Welcome to our Doctor’s Appointment Portal — your trusted platform for connecting patients with top healthcare professionals quickly, easily, and securely. Whether you're looking for a general check-up, specialist consultation, or follow-up appointment, our platform is designed to simplify your journey toward better health. With a user-friendly interface and verified doctor profiles, we aim to bridge the gap between quality care and those who seek it.</p>
          <p>Our journey began with a simple mission: to improve how people find and connect with doctors. We’ve built a system that not only showcases experienced and verified medical professionals but also empowers users to make informed decisions. With detailed doctor profiles, availability slots, real-time updates, and secure booking, we take the guesswork out of finding the right care.</p>
          <p className='text-lg'>OUR VISION</p>
          <p className='flex items-end'>Our vision is to revolutionize the healthcare experience by making it more accessible, efficient, and patient-centric. We strive to create a future where booking an appointment with a doctor is as easy as ordering your favorite food — simple, fast, and reliable. We believe that everyone deserves timely medical care, and through digital innovation, we aim to ensure no one is left waiting when they need help the most.</p>
        </div>
      </div>
      <div>
        <div className='mt-5 text-2xl font-lora'>WHY CHOOSE US</div>
        <div className='flex flex-col gap-3 my-4 md:flex-row'>
          <div className='p-2 leading-6 rounded-lg shadow-lg shadow-gray-400'>
            <p className='text-xl font-poppins'>Efficiency</p>
            <p>We understand that time is valuable — especially when it comes to health. Our platform is designed to minimize waiting time and maximize productivity. With real-time availability and instant booking features, you can secure appointments with top doctors in just a few clicks. No more endless calls or standing in long queues — just quick and smooth scheduling when you need it most.</p>
          </div>
          <div className='p-2 leading-6 rounded-lg shadow-lg shadow-gray-400'>
            <p className='text-xl font-poppins'>Convenience</p>
            <p>Whether you're at home, at work, or on the go, our platform lets you book appointments anytime, from anywhere. We've made the entire process seamless — from browsing doctors to receiving confirmations and reminders. With an easy-to-use interface and responsive design, accessing quality healthcare has never been more convenient.</p>
          </div>
          <div className='p-2 leading-6 rounded-lg shadow-lg shadow-gray-400'>
            <p className='text-xl font-poppins'>Personalization</p>
            <p>Everyone's health journey is unique — and so is our approach. We offer tailored doctor recommendations based on your needs, preferences, and medical history. From specialties to consultation modes, we ensure that every step of your booking experience feels customized, comfortable, and built just for you.</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default About