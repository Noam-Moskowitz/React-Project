import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';




const Login = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [formErrors, setFormErrors]=useState();
    const [showPassword, setShowPassword]= useState(false)



    const handleSubmit=(e)=>{
        e.preventDefault()
        const validationErrors={};


        if (!email) {
            validationErrors[`email`]=`Please enter a valid email address`
        }

        if (!password) {
            validationErrors[`password`]=`Please enter a password`
        }

        setFormErrors(validationErrors)

    }

    return (
        <div className='flex justify-center items-center h-[60vh] w-screen'>
            <form className='flex flex-col border-2 rounded py-16 px-24 bg-slate-100'>
                <h1 className='text-center text-xl md:text-5xl uppercase font-bold pb-24'>Log In</h1>
                <div className='my-2'>
                    <TextField 
                        id="outlined-error-helper-text"
                        error={formErrors && formErrors[`email`]?true:false}
                        helperText={formErrors && formErrors[`email`]}
                        type="email" 
                        label='Email'
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className='my-2 flex '>
                    <TextField 
                        type={showPassword? `text`:`password`}
                        label='Password'
                        error={formErrors && formErrors[`password`]?true:false}
                        helperText={formErrors && formErrors[`password`]}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>

                    <Button onClick={handleSubmit}  variant='contained'>Submit</Button>
            </form>
        </div>
    )
    }

export default Login
