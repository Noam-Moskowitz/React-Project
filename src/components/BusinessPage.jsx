import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../hooks/useApi';
import { RequestObject } from '../models/RequestObject';

const BusinessPage = () => {

    const { id } = useParams();
    const { data, callApi, isLoading, apiErrors, errorFlag, successFlag, METHOD } = useApi();

    const [content, setContent] = useState();

    useEffect(() => {
        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
            METHOD.GET_ONE,
        )

        callApi(newRequest);
    }, [])

    useEffect(() => {
        if (data) {
            console.log(data);
            setContent(data)
        }
    }, [data])

    return (
        <div className='p-5'>
            {content &&
                <div className='w-full h-full flex flex-col items-center boder-4 rounded-lg'>
                    <div className='w-full h-[35vh] flex justify-center items-center gap-4 border-2'>
                        <div>
                            <div className='text-6xl py-6 font-bold'>
                                {content.title}
                            </div>
                            <div className='text-3xl'>
                                {content.subtitle}
                            </div>
                            <div className='text-lg py-6'>
                                {content.description}
                            </div>
                        </div>
                        <div className='w-96'>
                            <img src={content.image.url} alt={content.image.alt} />
                        </div>
                    </div>
                    <div className='w-full flex gap-3 justify-center border-2 p-4'>
                        <div>{content.phone}</div>
                        <div>{content.email}</div>
                        <div>{content.web}</div>
                    </div>
                    <div className='flex gap-2'>
                        <div>
                            {content.address.street}
                        </div>
                        <div>
                            {content.address.houseNumber},
                        </div>
                        <div>
                            {content.address.city},
                        </div>
                        <div>
                            {content.address.zip},
                        </div>
                        <div>
                            {content.address.country}
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default BusinessPage
