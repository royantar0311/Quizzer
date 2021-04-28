import React from 'react'
import {TextField }from '@material-ui/core';
const Input = (props) => {

    const {name, label, value, error = null, onChange, ...other} = props;
    return (
        <TextField variant='outlined'
        {...other}
         {...(error && {error: true, helperText: error})} 
         name={name} label={label} value={value} onChange={onChange}/>
    )
}

export default Input
