import React from 'react'
import {Button as MuiButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2)
    },
    label: {
        textTransform: 'none'
    }
}))

const Button = (props) => {
    const classes = useStyles();
    const {size, color, variant, onClick} = props

    return (
        <MuiButton variant={variant} align='center' classes={{root:classes.root, label: classes.label}} size={size} color={color} onClick={onClick}>
            {props.children}
        </MuiButton>
    )
}

export default Button

