import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import PasswordInput from './PasswordInput'

const Register = () => {
    const [name, setName] = useState({});

    return (
        <div className='w-screen flex justify-center'>
            <form className='border-2 rounded bg-slate-100 p-10'>
                <div className='flex my-6 gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='First Name'
                        onChange={(e) => setName({ ...name, first: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Last Name'
                        required
                    />
                </div>
                <div className='flex my-6 gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="tel"
                        label='Phone Number'
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="email"
                        label='Email'
                        required
                    />
                </div>
                <div className='flex gap-6 my-6'>
                    <div className='flex'>
                        <PasswordInput
                            label='Password'
                        />
                    </div>
                    <div className='flex'>
                        <PasswordInput
                            label='Confirm Password'
                        />
                    </div>
                </div>
                <div className='my-6 flex gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Street'
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='House Number'
                        required
                    />
                </div>
                <div className='my-6 flex gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='City'
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='State'
                    />
                </div>
                <div className='my-6 flex gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='country'
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Zip'
                        required
                    />
                </div>
                <div>
                    <Button style={{ width: '100%' }} /* onClick={handleSubmit} */ variant='contained'>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Register
