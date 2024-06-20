import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { testEmail, testPassword } from '../../utils/utls';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import PasswordInput from './PasswordInput';
import { jwtDecode } from 'jwt-decode';
import { saveInfo } from '../../store/userInfoSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomLoader from '../loaders/CustomLoader';
import Alert from '@mui/material/Alert';
import useThemeColor from '../../hooks/useThemeColor';
import useValidation from '../../hooks/useValidation';
import useToken from '../../hooks/useToken';





const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { data, callApi, isLoading, apiErrors, errorFlag, METHOD } = useApi()
    const { validate, ACTION_TYPES, formErrors } = useValidation()
    const { decodeToken, token } = useToken()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { primaryColor, backgroundColor, } = useThemeColor();





    const handleSubmit = (e) => {
        e.preventDefault()

        const loginObject = {
            email: email,
            password: password
        }

        if (!validate({ type: ACTION_TYPES.LOGIN, payload: loginObject })) return

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login`,
            METHOD.LOGIN,
            loginObject
        );

        callApi(newRequest)

    }


    useEffect(() => {
        if (data) {
            localStorage.setItem(`token`, data)
            const decodedToken = decodeToken(data)
            dispatch(saveInfo(decodedToken));
            navigate('/success/Log in')
        }
    }, [data])


    if (isLoading) return <CustomLoader />


    return (
        <div className='flex justify-center items-center h-screen w-screen' style={{ backgroundColor: backgroundColor }}>
            <form
                className='flex flex-col w-[350px] sm:w-[auto] border-4 rounded py-16 px-10 md:px-24'
                style={{ borderColor: primaryColor }}
            >
                <h1
                    className='text-center text-2xl md:text-5xl uppercase font-bold pb-10 md:pb-20'
                    style={{ color: primaryColor }}
                >Log In</h1>
                <div className='my-2 '>
                    <TextField
                        id="outlined-error-helper-text"
                        error={formErrors && formErrors[`email`] ? true : false}
                        color='primary'
                        helperText={formErrors && formErrors[`email`]}
                        type="email"
                        label='Email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='my-2'>
                    <PasswordInput
                        label='Password'
                        error={formErrors && formErrors[`password`] ? true : false}
                        helperText={formErrors && formErrors[`password`]}
                        setter={setPassword}
                    />
                </div>

                <Button onClick={handleSubmit} variant='contained' color='primary'>Submit</Button>
            </form>

            {errorFlag && <div className='flex items-center absolute top-12'>
                <Alert className='animate-bounce' severity='error'>{`${apiErrors.response.status}: ${apiErrors.response.data}`}</Alert>
            </div>}
        </div>
    )
}

export default Login
