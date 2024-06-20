import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useApi = () => {

    const [data, setData] = useState();
    const [URL, setURL] = useState();
    const [method, setMethod] = useState();
    const [headers, setHeaders] = useState(null);
    const [payload, setPayload] = useState(null);
    const [requestFlag, setRequestFlag] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState();
    const [errorFlag, setErrorFlag] = useState(false);
    const [successFlag, setSuccessFlag] = useState(false);


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
                    if (headers) {
                        response = await axios.get(URL, {
                            headers: {
                                'x-auth-token': headers
                            }
                        })
                    } else {
                        response = await axios.get(URL)
                    }

                    responseData = response.data
                    break;

                case METHOD.GET_MY_CARDS:

                    response = await axios.get(URL, {
                        headers: {
                            'x-auth-token': headers
                        }
                    })

                    responseData = response.data
                    break;

                case METHOD.GET_ONE:
                    if (headers) {
                        response = await axios.get(URL, {
                            headers: {
                                'x-auth-token': headers
                            }
                        })
                    } else {
                        response = await axios.get(URL);
                    }

                    responseData = response.data
                    break;

                case METHOD.UPDATE:

                    response = await axios.put(URL, payload, {
                        headers: {
                            'x-auth-token': headers
                        }
                    })

                    responseData = response.data
                    break;

                case METHOD.CREATE_CARD:

                    response = await axios.post(URL, payload, {
                        headers: {
                            'x-auth-token': headers
                        }
                    })

                    responseData = response.data
                    break;

                case METHOD.LIKE:
                    response = await axios.patch(URL, {}, {
                        headers: {
                            'x-auth-token': headers
                        }
                    })

                    responseData = response.data
                    break;

                case METHOD.DELETE:
                    response = await axios.delete(URL, {
                        headers: {
                            'x-auth-token': headers
                        },
                        data: {
                            bizNumber: payload
                        }
                    })

                    responseData = response.data
                    break;
            }

            setData(responseData)

        } catch (error) {

            setApiErrors(error)

        } finally {

            setIsLoading(false)
            setRequestFlag(false);

        }
    }




    const callApi = (requestObj) => {
        const { rUrl, rMethod, rHeaders, rPayload } = requestObj;

        setURL(rUrl);
        setMethod(rMethod);
        setHeaders(rHeaders ? rHeaders : null);
        setPayload(rPayload ? rPayload : null);
        setRequestFlag(true);
    }

    useEffect(() => {
        if (requestFlag) {
            initRequest()
        }
    }, [requestFlag])

    useEffect(() => {
        if (apiErrors) {
            setErrorFlag(true);
            setTimeout(() => {
                setErrorFlag(false)
            }, 3000)
        }
    }, [apiErrors])

    useEffect(() => {
        if (data) {
            setSuccessFlag(true);
            setTimeout(() => {
                setSuccessFlag(false)
            }, 1500)
        }
    }, [data])

    const METHOD = {
        LOGIN: `LOGIN`,
        REGISTER: `REGISTER`,
        GET_ALL: `GET_ALL`,
        GET_ONE: `GET_ONE`,
        GET_MY_CARDS: `GET_MY_CARDS`,
        UPDATE: `UPDATE`,
        CREATE_CARD: `CREATE_CARD`,
        LIKE: `LIKE`,
        DELETE: `DELETE`
    }

    return { data, callApi, isLoading, apiErrors, errorFlag, successFlag, METHOD, method }
}

export default useApi
