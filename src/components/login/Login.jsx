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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [formErrors, setFormErrors] = useState();

    const { data, callApi, isLoading, apiErrors, METHOD } = useApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {};


        if (!testEmail(email)) {
            validationErrors[`email`] = `Please enter a valid email address`
        }

        if (!testPassword(password)) {
            validationErrors[`password`] = `Please enter a valid password`
        }

        setFormErrors(validationErrors)

        if (validationErrors[`password`] || validationErrors[`email`]) {
            return
        }

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login`,
            METHOD.LOGIN,
            {
                email: email,
                password: password
            }
        );

        callApi(newRequest)

    }


    useEffect(() => {
        if (data) {
            const token = data;
            localStorage.setItem(`token`, token)
            const decodedToken = jwtDecode(token);
            dispatch(saveInfo(decodedToken));
            navigate('/')
        }
    }, [data])

    useEffect(() => {
        if (apiErrors) {
            console.log(apiErrors.response);
            toast.error(`${apiErrors.response.status}: ${apiErrors.response.data}`);
        }
    }, [apiErrors])

    if (isLoading) return <CustomLoader />


    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <form className='flex flex-col border-2 rounded py-16 px-24 bg-slate-100'>
                <h1 className='text-center text-xl md:text-5xl uppercase font-bold pb-24'>Log In</h1>
                <div className='my-2 '>
                    <TextField
                        id="outlined-error-helper-text"
                        error={formErrors && formErrors[`email`] ? true : false}
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

                <Button onClick={handleSubmit} variant='contained'>Submit</Button>
            </form>

            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
                transition='Bounce'
            />
        </div>
    )
}

export default Login
