import { IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({ setter, error, helperText, label }) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className=' flex relative'>
            <TextField
                type={showPassword ? `text` : 'password'}
                label={label}
                error={error}
                helperText={helperText}
                onChange={(e) => setter(e.target.value)}
                required
            />
            <IconButton
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 0, top: 10 }}
            >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
        </div>
    )
}

export default PasswordInput
