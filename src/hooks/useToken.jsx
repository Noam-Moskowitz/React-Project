import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveInfo } from '../store/userInfoSlice';

const useToken = () => {

    const [token, setToken] = useState(localStorage.getItem(`token`));
    const dispatch = useDispatch();

    const decodeToken = (paramToken) => {
        return jwtDecode(paramToken)
    }

    const checkToken = () => {
        if (token) {
            const decodedToken = decodeToken(token);
            dispatch(saveInfo(decodedToken));
            console.log(decodedToken);
            return true;
        } else {
            dispatch(saveInfo({
                _id: null,
                isBusiness: null,
                isAdmin: null,
                iat: null
            }))
            return false
        }
    }

    return { token, checkToken, decodeToken }
}

export default useToken
