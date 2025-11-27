import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import medilogo from '../assets/medilogo.png'

const Footer = () => {
  const { assets } = useContext(AppContext);

  return (
    <div className='mt-10 bg-gray-100'>
      <div className='grid gap-8 px-6 py-10 mx-auto sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-7xl'>

        
        <div>
          
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-700 via-gray-500 to-gray-300 text-transparent bg-clip-text font-logo">
            MediConnect
          </h1>
          <p className='text-sm leading-relaxed text-gray-700'>
            At <strong>MediConnect</strong>, we are committed to making healthcare accessible, reliable, and convenient. 
            Connect with trusted doctors across various specializations. Your health is our priority.
          </p>
        </div>

        
        <div>
          <h1 className='mb-3 text-lg font-semibold text-gray-800'>Company</h1>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li className='cursor-pointer hover:underline'>Home</li>
            <li className='cursor-pointer hover:underline'>About Us</li>
            <li className='cursor-pointer hover:underline'>Contact Us</li>
            <li className='cursor-pointer hover:underline'>Privacy Policy</li>
          </ul>
        </div>

        
        <div>
          <h1 className='mb-3 text-lg font-semibold text-gray-800'>Get in Touch</h1>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li>+121-2889902</li>
            <li>mediconnect@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className='border-gray-300' />

      <p className='py-4 text-sm text-center text-gray-600'>
        © 2025 <strong>MediConnect</strong>. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
