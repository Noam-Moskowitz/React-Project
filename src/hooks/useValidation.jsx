import React, { useState } from 'react'
import { testEmail, testPassword } from '../utils/utls';

const useValidation = () => {

    const [formErrors, setFormErrors] = useState();

    const validate = (formContent) => {
        const { type, payload } = formContent;
        let validationErrors = {};

        // eslint-disable-next-line default-case
        switch (type) {
            case ACTION_TYPES.CARD:

                if (!payload.title || payload.title.length < 2 || payload.title.length > 256) {
                    validationErrors[`title`] = `Title must be between 2-256 characters`
                }
                if (!payload.subtitle || payload.subtitle.length < 2 || payload.subtitle.length > 256) {
                    validationErrors[`subtitle`] = `Subtitle must be between 2-256 characters`
                }
                if (!payload.description || payload.description.length < 2 || payload.description.length > 1_024) {
                    validationErrors[`description`] = `Description must be between 2-1,024 characters`
                }

                if (!payload.phone || payload.phone.length < 9 || payload.phone.length > 11) {
                    validationErrors[`phone`] = `Phone Number must be between 9-11 characters`
                }

                if (!testEmail(payload.email)) {
                    validationErrors[`email`] = `Please enter a valid email address`
                }

                if (payload.web) {
                    if (payload.web.length < 14) {
                        validationErrors[`web`] = `URL must be at least 14 characters`
                    }
                }


                delete payload.address[`state`];
                delete payload.address[`zip`];
                delete payload.address[`_id`];

                for (const key in payload.address) {
                    if (payload.address.hasOwnProperty(key)) {
                        const value = payload.address[key];
                        if (!value) {
                            const capitalizedKey = key[0].charAt(0).toUpperCase() + key.slice(1);
                            validationErrors[key] = `Please add a ${capitalizedKey}`
                        }
                    }
                }

                break;

            case ACTION_TYPES.USER:
                const {
                    name,
                    password
                } = payload;


                const newObject = {
                    firstName: name.first,
                    lastName: name.last,
                    ...payload.address
                };

                if (!newObject.houseNumber) {
                    validationErrors[`houseNumber`] = `House Number must be defined!`
                }

                delete newObject.state
                delete newObject.houseNumber


                for (const key in newObject) {

                    const value = newObject[key];
                    if (!value || value.length < 2 || value.length > 256) {
                        validationErrors[key] = `${key} must be between 2-256 characters`;
                    }
                }

                if (!payload.phone || payload.phone.length < 9 || payload.phone.length > 11) {
                    validationErrors[`phone`] = `Phone Number must be between 9-11 characters`
                }

                if (!payload.email) break;

                if (!testEmail(payload.email)) {
                    validationErrors[`email`] = `Please enter a valid email`
                }

                if (!password) break;

                if (!testPassword(password.password)) {
                    validationErrors[`password`] = `Please enter a valid password`
                }

                if (password.password !== password.confirmPassword) {
                    validationErrors[`confirmPassword`] = `Value doesnt match password`
                }

                break;

            case ACTION_TYPES.LOGIN:
                if (!testEmail(payload.email)) {
                    validationErrors[`email`] = `Please enter a valid email address`
                }

                if (!testPassword(payload.password)) {
                    validationErrors[`password`] = `Please enter a valid password`
                }

                break;
        }

        if (Object.keys(validationErrors).length == 0) return true
        setFormErrors(validationErrors)
    }



    const ACTION_TYPES = {
        CARD: `CARD`,
        USER: `USER`,
        LOGIN: `LOGIN`
    }

    return { validate, ACTION_TYPES, formErrors }
}

export default useValidation
