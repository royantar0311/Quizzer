import React, { FC } from 'react';
import { LoginForm, PageHeader } from '../components';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    paperStyle: {
        width: '500px',
        height: '500px',
        margin: '30px auto',
        padding: theme.spacing(2)
    }
}));


const Login : FC = () => {

    const classes = useStyles();

    return (
        <>
            <Paper elevation={10} className={classes.paperStyle}>
                <PageHeader 
                title='Login'
                subtitle='Form Design With Validation'
                icon={<LockOpenIcon style={{fill: 'primary'}} />}
                />
                <LoginForm/>
            </Paper>
            
        </>
    )
}

export default Login;