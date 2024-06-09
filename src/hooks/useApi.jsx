import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useApi = () => {

    const [data, setData] = useState();
    const [URL, setURL] = useState();
    const [method, setMethod] = useState();
    const [headers, setHeaders] = useState(null);
    const [payload, setPayload] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState();
    const [errorFlag, setErrorFlag] = useState(false)


    const initRequest = async () => {
        try {
            setIsLoading(true);
            let responseData;
            let response;

            // eslint-disable-next-line default-case
            switch (method) {
                case METHOD.LOGIN:
                case METHOD.REGISTER:
                    response = await axios.post(URL, payload)

                    responseData = response.data
                    break;
                case METHOD.GET_ALL:
                    response = await axios.get(URL)

                    responseData = response.data
                    break;

                case METHOD.GET_MY_CARDS:
                    console.log(headers);

                    response = await axios.get(URL, {
                        headers: {
                            'x-auth-token': headers
                        }
                    })

                    responseData = response.data
                    break;

                case METHOD.LIKE:
                    console.log(headers);
                    console.log(payload);
                    console.log(`${URL}/${payload}`, {
                        headers: {
                            'x-auth-token': headers
                        }
                    });
                    response = await axios.patch(`${URL}${payload}`, {}, {
                        headers: {
                            'x-auth-token': headers
                        }
                    })

                    responseData = response.data
            }

            setData(responseData)

        } catch (error) {

            setApiErrors(error)

        } finally {

            setIsLoading(false)

        }
    }




    const callApi = (requestObj) => {
        const { rUrl, rMethod, rHeaders, rPayload /* ,rID */ } = requestObj;

        setURL(rUrl);
        setMethod(rMethod);
        setHeaders(rHeaders ? rHeaders : null);
        setPayload(rPayload ? rPayload : null);
    }

    useEffect(() => {
        if (URL) {
            initRequest()
        }
    }, [URL])

    useEffect(() => {
        if (apiErrors) {
            setErrorFlag(true);
            setTimeout(() => {
                setErrorFlag(false)
            }, 3000)
        }
    }, [apiErrors])

    const METHOD = {
        LOGIN: `LOGIN`,
        REGISTER: `REGISTER`,
        GET_ALL: `GET_ALL`,
        GET_MY_CARDS: `GET_MY_CARDS`,
        LIKE: `LIKE`
    }

    return { data, callApi, isLoading, apiErrors, errorFlag, METHOD }
}

export default useApi
