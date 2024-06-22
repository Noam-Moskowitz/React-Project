import React from 'react'
import HailIcon from '@mui/icons-material/Hail';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import FlagIcon from '@mui/icons-material/Flag';
import HandshakeIcon from '@mui/icons-material/Handshake';
import useThemeColor from '../hooks/useThemeColor';

const About = () => {
    const {primaryColor, textColor, backgroundColor}=useThemeColor()
    return (
        <div 
            className='p-10'
            style={{color:textColor, backgroundColor:backgroundColor}}
        >
            <h1
                className='text-5xl font-bold'
                style={{color:primaryColor}}
            >About Us</h1>
            <p className='p-2 py-5'>
                Welcome to Bcard, your premier destination for creating and sharing virtual business cards. Our platform is designed to help businesses of all sizes showcase their essential information in an easily accessible and visually appealing format.
            </p>
            <div className='flex flex-col gap-5'>
                <div 
                    className='flex flex-col md:flex-row border-4 p-5 gap-3 rounded-lg items-center'
                    style={{borderColor:primaryColor}}    
                >
                    <div className='flex flex-col items-center gap-3 md:w-[15%]'>
                        <FlagIcon fontSize='large' color='primary'/>
                        <h2
                            className='text-lg font-bold'
                        >Our Mission</h2>
                    </div>
                    <p className='md:w-[85%]'>
                        At Bcard, our mission is to streamline the way businesses present themselves online. We believe that a well-crafted virtual business card is a powerful tool for networking, marketing, and connecting with potential clients and partners. By providing an easy-to-use platform for creating and displaying these cards, we aim to enhance the visibility and professionalism of businesses everywhere.

                    </p>
                </div>
                <div 
                    className='flex flex-col md:flex-row border-4 p-5 gap-3 rounded-lg items-center'
                    style={{borderColor:primaryColor}} 
                >
                    <div className='flex flex-col items-center gap-3 md:w-[15%]'>
                        <HandshakeIcon fontSize='large' color='primary'/>
                        <h2
                            className='text-lg font-bold'
                        >What We Offer
                        </h2>
                    </div>
                    <p className='md:w-[85%]'>
                    Our website allows businesses to log in and create their own virtual business cards, complete with:
                        <ul className='list-disc pl-10 py-5 md:py-0 md:pl-16'>
                            <li>
                                
                                <span className='font-bold'>Photo:</span> Add a professional image that represents your business.
                            </li>
                            <li>
                                <span className='font-bold'>Description:</span> Provide a concise and compelling summary of what your business is all about.
                            </li>
                            <li>
                                <span className='font-bold'>Contact Information:</span> Display your phone number, address, email, and website, making it easy for potential clients to get in touch.
                            </li>
                        </ul>
                        Each virtual business card is part of our growing collection, making it simple for visitors to browse and discover businesses like yours.
                    </p>
                </div>
                <div 
                    className='flex flex-col md:flex-row border-4 p-5 gap-3 items-center rounded-lg'
                    style={{borderColor:primaryColor}} 
                >
                    <div className='flex flex-col items-center gap-3 md:w-[15%]'>
                        <HailIcon fontSize='large' color='primary'/>
                        <h2
                            className='text-lg font-bold'
                        >Why Choose Us?</h2>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 md:w-[85%]'>
                        <div className='flex flex-col border-l-2 pl-4'>
                            <h6
                                className='underline font-bold'
                            >User-Friendly Interface:</h6>
                            <p>
                                Our platform is designed to be intuitive and straightforward, allowing you to create a stunning business card in just a few steps.
                            </p>
                        </div>
                        <div className='flex flex-col border-l-2 pl-4'>
                            <h6
                                className='underline font-bold'
                            >Increased Visibility:</h6>
                            <p>
                                By being part of our collection, your business gains exposure to a wider audience looking for services like yours.
                            </p>
                        </div>
                        <div className='flex flex-col border-l-2 pl-4'>
                            <h6
                                className='underline font-bold'
                            >Professional Presentation:</h6>
                            <p>
                                Our virtual business cards are designed to look clean and professional, helping you make a great first impression.
                            </p>
                        </div>
                    </div>
                </div>
                <div 
                    className='flex flex-col md:flex-row border-4 p-5 gap-3 rounded-lg items-center'
                    style={{borderColor:primaryColor}}     
                >
                    <div className='flex flex-col items-center gap-3 md:w-[15%]'>
                        <Diversity1Icon fontSize='large' color='primary'/>
                        <h2
                            className='text-lg font-bold'
                        >Join Us Today
                        </h2>
                    </div>
                    <div className='flex flex-col gap-5 md:w-[85%]'>
                        <p>
                            Whether you're a small startup or an established company, Bcard is here to help you present your business in the best light. Join us today and take the first step towards enhancing your online presence with a virtual business card that stands out.
                        </p>
                        <p>
                            Feel free to contact us with any questions or feedback. We're here to help you make the most of your online presence.
                        </p>
                    </div>
                </div>
                <p>
                    Thank you for visiting Bcard. We look forward to helping your business shine!
                </p>
            </div>
        </div>
        
    )
}

export default About
