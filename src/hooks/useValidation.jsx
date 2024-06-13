import React, { useState } from 'react'
import { testEmail } from '../utils/utls';

const useValidation = () => {

    const [formErrors, setFormErrors] = useState();

    const validate = (formContent) => {
        const { type, payload } = formContent;
        let validationErrors = {};

        switch (type) {
            case ACTION_TYPES.CARD:
                const {
                    title,
                    subtitle,
                    description,
                    phone,
                    email,
                    web,
                    image,
                    address
                } = payload;

                const ShorthandVerificationVars = { title: title, subtitle: subtitle, imageDescription: image.alt }

                for (const key in ShorthandVerificationVars) {
                    if (ShorthandVerificationVars.hasOwnProperty(key)) {
                        const value = ShorthandVerificationVars[key];

                        if (value.length < 2 || value.length > 256) {
                            const capitalizedKey = key[0].charAt(0).toUpperCase() + key.slice(1);
                            validationErrors[`${key}`] = `${capitalizedKey} must be between 2-256 characters`
                        }
                    }
                }

                if (description.length < 2 || description.length > 1_024) {
                    validationErrors[`description`] = `Description must be between 2-1,024 characters`
                }

                if (phone.length < 9 || phone.length > 11) {
                    validationErrors[`phone`] = `Phone Number must be between 9-11 characters`
                }

                if (!testEmail(email)) {
                    validationErrors[`email`] = `Please enter a valid email address`
                }

                if (web) {
                    if (web.length < 14) {
                        validationErrors[`web`] = `URL must be at least 14 characters`
                    }
                }

                if (image.url.length < 14) {
                    validationErrors[`imageUrl`] = `Image URL must be at least 14 characters`
                }

                delete address[`state`];
                delete address[`zip`];
                delete address[`_id`];

                for (const key in address) {
                    if (address.hasOwnProperty(key)) {
                        const value = address[key];
                        if (!value) {
                            const capitalizedKey = key[0].charAt(0).toUpperCase() + key.slice(1);
                            validationErrors[key] = `Please add a ${capitalizedKey}`
                        }
                    }
                }

                break;

            case ACTION_TYPES.REGISTER:
                const {
                    name,
                    password
                } = payload;
        }

        if (Object.keys(validationErrors).length == 0) return true

        setFormErrors(validationErrors)
    }



    const ACTION_TYPES = {
        CARD: `CARD`,
        REGISTER: `REGISTER`
    }

    return { validate, ACTION_TYPES, formErrors }
}

export default useValidation
