import { Button, TextField } from '@mui/material'
import Checkbox from '@mui/joy/Checkbox';
import React, { useEffect, useState } from 'react'
import PasswordInput from './PasswordInput'

const Register = () => {
    const [name, setName] = useState({ first: null, last: null });
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [address, setAddress] = useState({});
    const [isBuisness, setIsBusiness] = useState();

    const [formErrors, setFormErrors] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        let validationErrors = {}

        for (const key in name) {

            if (name.hasOwnProperty(key)) {
                let value = name[key];
                if (!value || value.length < 2 || value.length > 256) {
                    validationErrors[key] = `${key} name must be 2-256 characters`
                }
            }
        }
        setFormErrors(validationErrors)
    }

    return (
        <div className='w-screen flex justify-center'>
            <form className='border-2 rounded bg-slate-100 p-10'>
                <h1 className='text-4xl text-center font-bold pb-6 uppercase'>Register</h1>
                <div className='flex my-6 gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='First Name'
                        error={formErrors && formErrors.first ? true : false}
                        helperText={formErrors && formErrors.first}
                        onChange={(e) => setName({ ...name, first: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Last Name'
                        error={formErrors && formErrors.last ? true : false}
                        helperText={formErrors && formErrors.last}
                        onChange={(e) => setName({ ...name, last: e.target.value })}
                        required
                    />
                </div>
                <div className='flex my-6 gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="tel"
                        label='Phone Number'
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="email"
                        label='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='flex gap-6 my-6'>
                    <div className='flex'>
                        <PasswordInput
                            label='Password'
                            setter={setPassword}
                        />
                    </div>
                    <div className='flex'>
                        <PasswordInput
                            label='Confirm Password'
                            setter={setconfirmPassword}
                        />
                    </div>
                </div>
                <div className='my-6 flex gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Street'
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='House Number'
                        onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                        required
                    />
                </div>
                <div className='my-6 flex gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='City'
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        label='State'
                    />
                </div>
                <div className='my-6 flex gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='country'
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='Zip'
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        required
                    />
                </div>
                <div className='my-6'>
                    <Checkbox label="Business Account" color="primary" onChange={(e) => setIsBusiness(e.target.checked)} />
                </div>
                <div>
                    <Button style={{ width: '100%' }} onClick={handleSubmit} variant='contained'>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Register
