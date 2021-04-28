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
    const {size, color, variant, onClick, ...others} = props

    return (
        <MuiButton variant={variant} classes={{root:classes.root, label: classes.label}} size={size} color={color} onClick={onClick} {...others}>
            {props.children}
        </MuiButton>
    )
}

export default Button

