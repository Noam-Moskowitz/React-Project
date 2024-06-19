import { Alert, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PasswordInput from './PasswordInput'
import { testEmail, testPassword } from '../../utils/utls';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import CustomLoader from '../loaders/CustomLoader';
import useThemeColor from '../../hooks/useThemeColor';
import useValidation from '../../hooks/useValidation';
import { useParams } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const Register = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        name: {
            first: '',
            last: ''
        },
        phone: '',
        email: '',
        address: {
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            zip: ''
        }
    });
    const [password, setPassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const { token } = useToken()

    const [isBuisness, setIsBusiness] = useState(false);


    const { data, callApi, isLoading, apiErrors, errorFlag, METHOD } = useApi();
    const { validate, ACTION_TYPES, formErrors } = useValidation();

    const { primaryColor, backgroundColor } = useThemeColor();

    const handleSubmit = (e) => {
        e.preventDefault()

        const userObj = {
            ...user,
            password: {
                password: password, confirmPassword: confirmPassword
            }
        }

        console.log(userObj);

        if (!validate({ type: ACTION_TYPES.REGISTER, payload: userObj })) return


        const formData = {
            name: user.name,
            phone: user.phone,
            email: user.email,
            password: password,
            image: {},
            address: user.address,
            isBusiness: isBuisness
        }

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`,
            METHOD.REGISTER,
            formData
        )


        callApi(newRequest)
    }
    useEffect(() => {
        if (id) {
            const newRequest = new RequestObject(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
                METHOD.GET_ONE,
                null,
                token
            )

            callApi(newRequest);
        }
    }, [])


    useEffect(() => {
        if (data) {
            setUser(data)
        }
    }, [data])

    if (isLoading) return <CustomLoader />


    return (
        <div
            className='w-screen md:h-screen flex justify-center p-4'
            style={{ backgroundColor: backgroundColor }}
        >
            <form
                className='border-4 px-20 rounded  py-10 flex-col'
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
                        error={formErrors && formErrors.firstName ? true : false}
                        helperText={formErrors && formErrors.firstName}
                        onChange={(e) => setUser({ ...user, name: { ...user.name, first: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Last Name'
                        error={formErrors && formErrors.lastName ? true : false}
                        helperText={formErrors && formErrors.lastName}
                        onChange={(e) => setUser({ ...user, name: { ...user.name, last: e.target.value } })}
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
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="email"
                        label='Email'
                        error={formErrors && formErrors.email ? true : false}
                        helperText={formErrors && formErrors.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                        onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='House Number'
                        error={formErrors && formErrors.houseNumber ? true : false}
                        helperText={formErrors && formErrors.houseNumber}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, houseNumber: e.target.value } })}
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
                        onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        onChange={(e) => setUser({ ...user, address: { ...user.address, state: e.target.value } })}
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
                        onChange={(e) => setUser({ ...user, address: { ...user.address, country: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='Zip'
                        error={formErrors && formErrors.zip ? true : false}
                        helperText={formErrors && formErrors.zip}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, zip: e.target.value } })}
                        required
                    />
                </div>
                <div className='my-6'>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => setIsBusiness(e.target.checked)}
                            />
                        }
                        label="Business Account"
                    />
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
