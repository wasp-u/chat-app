import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import FilledInput from '@mui/material/FilledInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import { FormikProps } from 'formik'

type initialFormValues = {
    email: string
    password: string
    repeatPassword: string
    fullName: string
}

type Props = {
    formik: FormikProps<initialFormValues>
}
const PasswordInput: React.FC<Props> = ({ formik }) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <FormControl fullWidth variant='filled'>
            <InputLabel htmlFor='password'>Password *</InputLabel>
            <FilledInput
                aria-autocomplete='none'
                autoComplete='new-password'
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            edge='end'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText style={{ color: 'red' }}>
                {formik.touched.password && formik.errors.password}
            </FormHelperText>
        </FormControl>
    )
}

export default PasswordInput
