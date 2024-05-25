import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { testEmail, testPassword } from '../utils/utls';
import useApi from '../hooks/useApi';
import { RequestObject } from '../models/RequestObject'; 
import PasswordInput from './PasswordInput';




const Login = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [formErrors, setFormErrors]=useState();
    const [showPassword, setShowPassword]=useState();

    const {data, callApi, isLoading, apiErrors, METHOD}= useApi()



    const handleSubmit=(e)=>{
        e.preventDefault()
        const validationErrors={};


        if (!testEmail(email)) {
            validationErrors[`email`]=`Please enter a valid email address`
        }

        if (!testPassword(password)) {
            validationErrors[`password`]=`Please enter a valid password`
        }

        setFormErrors(validationErrors)

        if (validationErrors[`password`] || validationErrors[`email`]) {
            return
        }

        const newRequest= new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login`,
            METHOD.LOGIN,
            {
                email:email,
                password:password
            }
        );

        callApi(newRequest)

    }


    useEffect(()=>{
        console.log(data);
    },[data])

    return (
        <div className='flex justify-center items-center h-[60vh] w-screen'>
            <form className='flex flex-col border-2 rounded py-16 px-24 bg-slate-100'>
                <h1 className='text-center text-xl md:text-5xl uppercase font-bold pb-24'>Log In</h1>
                <div className='my-2 '>
                    <TextField 
                        id="outlined-error-helper-text"
                        error={formErrors && formErrors[`email`]?true:false}
                        helperText={formErrors && formErrors[`email`]}
                        type="email" 
                        label='Email'
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className='my-2'>
                    <PasswordInput 
                        label='Password'
                        error={formErrors && formErrors[`password`]?true:false}
                        helperText={formErrors && formErrors[`password`]}
                        setter={setPassword}
                    />
                </div>

                    <Button onClick={handleSubmit}  variant='contained'>Submit</Button>
            </form>
        </div>
    )
    }

export default Login
