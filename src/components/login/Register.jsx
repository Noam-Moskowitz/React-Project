import { Alert, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PasswordInput from './PasswordInput'
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import CustomLoader from '../loaders/CustomLoader';
import useThemeColor from '../../hooks/useThemeColor';
import useValidation from '../../hooks/useValidation';
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const Register = () => {

    //hooks
    const { data, callApi, isLoading, apiErrors, errorFlag, METHOD } = useApi();
    const { validate, ACTION_TYPES, formErrors } = useValidation();
    const { primaryColor, backgroundColor } = useThemeColor();
    const { token } = useToken()
    const navigate = useNavigate();
    const { id } = useParams();

    //states
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
    const [isEdit, setIsEdit] = useState(id ? true : false)
    const [onMount, setOnMount] = useState(false);
    const [navigateTo, setNavigateTo] = useState();
    const [isBuisness, setIsBusiness] = useState(false);

    //functions
    const handleSubmit = (e) => {
        e.preventDefault()
        let userObj = {};
        let formData = {};
        let newRequest = {};

        if (isEdit) {
            userObj = {
                ...user,
            };
        } else {
            userObj = {
                ...user,
                password: {
                    password: password, confirmPassword: confirmPassword
                }
            };
        }

        if (!validate({ type: ACTION_TYPES.USER, payload: userObj })) return

        if (isEdit) {

            formData = {
                name: user.name,
                phone: user.phone,
                email: user.email,
                image: {},
                address: user.address,
            };

            delete formData.name._id;
            delete formData.address._id;
            delete formData.email

            newRequest = new RequestObject(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
                METHOD.UPDATE,
                formData,
                token
            )

            setNavigateTo(`/success/Update`)

        } else {
            formData = {
                name: user.name,
                phone: user.phone,
                email: user.email,
                password: password,
                image: {},
                address: user.address,
                isBusiness: isBuisness
            };

            newRequest = new RequestObject(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`,
                METHOD.REGISTER,
                formData
            )
            setNavigateTo(`/success/Registration`)
        }

        callApi(newRequest)
    }

    //useEffects
    useEffect(() => {
        if (id) {
            setOnMount(true)
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
            if (onMount) {
                setOnMount(false);
            } else {
                navigate(navigateTo);
            }
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
                >{id ? `Edit Profile` : `Register`}</h1>
                <div className='flex flex-col md:flex-row my-6 justify-center gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='First Name'
                        value={user.name.first}
                        error={formErrors && formErrors.firstName ? true : false}
                        helperText={formErrors && formErrors.firstName}
                        onChange={(e) => setUser({ ...user, name: { ...user.name, first: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Last Name'
                        value={user.name.last}
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
                        value={user.phone}
                        error={formErrors && formErrors.phone ? true : false}
                        helperText={formErrors && formErrors.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        required
                    />
                    {!isEdit &&
                        <TextField
                            id="outlined-error-helper-text"
                            type="email"
                            label='Email'
                            value={user.email}
                            error={formErrors && formErrors.email ? true : false}
                            helperText={formErrors && formErrors.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    }
                </div>
                {!isEdit &&
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
                }
                <div className='my-6 flex flex-col md:flex-row  gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Street'
                        value={user && user.address.street}
                        error={formErrors && formErrors.street ? true : false}
                        helperText={formErrors && formErrors.street}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='House Number'
                        value={user.address.houseNumber}
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
                        value={user.address.city}
                        error={formErrors && formErrors.city ? true : false}
                        helperText={formErrors && formErrors.city}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        value={user.address.state}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, state: e.target.value } })}
                        label='State'
                    />
                </div>
                <div className='my-6 flex flex-col md:flex-row  gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='country'
                        value={user.address.country}
                        error={formErrors && formErrors.country ? true : false}
                        helperText={formErrors && formErrors.country}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, country: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="number"
                        label='Zip'
                        value={user.address.zip}
                        error={formErrors && formErrors.zip ? true : false}
                        helperText={formErrors && formErrors.zip}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, zip: e.target.value } })}
                        required
                    />
                </div>
                {!isEdit &&
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
                }
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
