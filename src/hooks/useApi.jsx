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


    const initRequest = async () => {
        try {
            setIsLoading(true);
            let responseData;

            // eslint-disable-next-line default-case
            switch (method) {
                case METHOD.LOGIN | METHOD.REGISTER:

                    const response = await axios.post(URL, payload)
                    let responseData = response.data

                    break;

                    setData(responseData)
            }

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

    const METHOD = {
        LOGIN: `LOGIN`,
        REGISTER: `REGISTER`
    }

    return { data, callApi, isLoading, apiErrors, METHOD }
}

export default useApi
