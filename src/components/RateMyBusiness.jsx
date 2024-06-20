import { Rating, Typography } from '@mui/material';
import React, { useState } from 'react'

const RateMyBusiness = () => {
    const [value, setValue] = useState();
    return (
        <div>
            <Typography component="legend">Rate Us!</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </div>
    )
}

export default RateMyBusiness
