import React, { useState } from 'react'

const Card = ({ content }) => {


    return (
        <div className='border-2 rounded-lg bg-slate-200 p-2 flex flex-col justify-between'>
            <div className='h-[50%]'>
                <img className='w-full h-full rounded' src={content.image.url} alt={content.image.alt} />
            </div>
            <div className='border-b-2 border-gray-400 '>
                <h2 className='text-3xl font-bold'>{content.title}</h2>
                <h3 className='text-xl'>{content.subtitle}</h3>
            </div>
            <div className='border-b-2 border-gray-400'>
                {content.description}
            </div>
            <div className='border-b-2 border-gray-400 flex justify-center gap-8'>
                <p>{content.email}</p>
                <p>{content.phone}</p>
            </div>
            <div className='border-b-2 border-gray-400 '>
                <p>{`${content.address.street} ${content.address.houseNumber}, ${content.address.city}, ${content.address.zip}`}</p>
                <p>{` ${content.address.country}`}</p>
            </div>
            <div>
                likes:{content.likes.length}
            </div>
        </div>
    )
}

export default Card