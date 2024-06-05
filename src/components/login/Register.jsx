import { Alert, Button, TextField } from '@mui/material'
import Checkbox from '@mui/joy/Checkbox';
import React, { useEffect, useState } from 'react'
import PasswordInput from './PasswordInput'
import { testEmail, testPassword } from '../../utils/utls';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import CustomLoader from '../loaders/CustomLoader';
import useThemeColor from '../../hooks/useThemeColor';

const Register = () => {
    const [name, setName] = useState({ first: null, last: null });
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [address, setAddress] = useState({
        country: null,
        city: null,
        street: null,
        houseNumber: null,
        zip: null,
    });
    const [isBuisness, setIsBusiness] = useState(false);

    const [formErrors, setFormErrors] = useState();

    const { data, callApi, isLoading, apiErrors, errorFlag, METHOD } = useApi();

    const { primaryColor, backgroundColor } = useThemeColor();

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

        if (!phone || phone.length < 9 || phone.length > 11) {
            validationErrors[`phone`] = `Phone number  must be 9-11 characters`
        }

        if (!testEmail(email)) {
            validationErrors[`email`] = `Please enter a valid email`
        }

        if (!testPassword(password)) {
            validationErrors[`password`] = `Please enter a valid password`
        }

        if (password !== confirmPassword) {
            validationErrors[`confirmPassword`] = `Value doesnt match password`
        }

        for (const key in address) {
            if (key == `state`) break
            if (address.hasOwnProperty(key)) {
                let value = address[key];
                if (!value || value.length < 2 || value.length > 256) {
                    validationErrors[key] = `${key} must be 2-256 characters`
                }
            }
        }

        setFormErrors(validationErrors)


        if (Object.keys(validationErrors).length === 0) {

            const formData = {
                name: name,
                phone: phone,
                email: email,
                password: password,
                image: {},
                address: address,
                isBusiness: isBuisness
            }

            const newRequest = new RequestObject(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`,
                METHOD.REGISTER,
                formData
            )


            callApi(newRequest)
        }

    }

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data])

    if (isLoading) return <CustomLoader />


    return (
        <div
            className='w-screen flex justify-center p-4'
            style={{ backgroundColor: backgroundColor }}
        >
            <form
                className='border-2 px-20 rounded  py-10 flex-col'
                style={{ backgroundColor: backgroundColor, borderColor: primaryColor }}
            >
                <h1
                    className='text-4xl text-center font-bold pb-6 uppercase'
                    style={{ color: primaryColor }}
                >Register</h1>
                <div className='flex flex-col md:flex-row my-6 justify-center gap-6'>
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
                <div className='flex flex-col md:flex-row  my-6 justify-center gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="tel"
                        label='Phone Number'
                        error={formErrors && formErrors.phone ? true : false}
                        helperText={formErrors && formErrors.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="email"
                        label='Email'
                        error={formErrors && formErrors.email ? true : false}
                        helperText={formErrors && formErrors.email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-col md:flex-row  gap-6 my-6'>
                    <div className='flex'>
                        <PasswordInput
                            label='Password'
                            error={formErrors && formErrors.password ? true : false}
                            helperText={formErrors && formErrors.password}
                            setter={setPassword}
                        />
                    </div>
                    <div className='flex'>
                        <PasswordInput
                            label='Confirm Password'
                            error={formErrors && formErrors.confirmPassword ? true : false}
                            helperText={formErrors && formErrors.confirmPassword}
                            setter={setconfirmPassword}
                        />
                    </div>
                </div>
                <div className='my-6 flex flex-col md:flex-row  gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Street'
                        error={formErrors && formErrors.street ? true : false}
                        helperText={formErrors && formErrors.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='House Number'
                        error={formErrors && formErrors.houseNumber ? true : false}
                        helperText={formErrors && formErrors.houseNumber}
                        onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                        required
                    />
                </div>
                <div className='my-6 flex flex-col md:flex-row  gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='City'
                        error={formErrors && formErrors.city ? true : false}
                        helperText={formErrors && formErrors.city}
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
                <div className='my-6 flex flex-col md:flex-row  gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='country'
                        error={formErrors && formErrors.country ? true : false}
                        helperText={formErrors && formErrors.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='Zip'
                        error={formErrors && formErrors.zip ? true : false}
                        helperText={formErrors && formErrors.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        required
                    />
                </div>
                <div className='my-6'>
                    {/* <Checkbox label="Business Account" color="primary" onChange={(e) => setIsBusiness(e.target.checked)} /> */}
                </div>
                <div>
                    <Button style={{ width: '100%' }} onClick={handleSubmit} variant='contained'>Submit</Button>
                </div>
            </form>

            {errorFlag && <div className='flex items-center fixed top-12'>
                <Alert className='animate-bounce' severity='error'>{`${apiErrors.response.status}: ${apiErrors.response.data}`}</Alert>
            </div>}
        </div>
    )
}

export default Register
