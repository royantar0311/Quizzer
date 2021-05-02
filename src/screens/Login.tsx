import React, { FC, useEffect } from 'react';
import { Controls, Form, PageHeader, useForm } from '../components';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory} from 'react-router';
import { AuthState, SignInData } from '../redux/types';
import { signIn } from '../redux/auth/auth.actions';
import { RootState } from '../redux/root.reducer';
import { validate } from '../Util';
import Loader from '../components/useLoader';

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    paperStyle: {
        width: '500px',
        height: '500px',
        margin: '30px auto',
        padding: theme.spacing(2),
        textAlign: 'center'
    }
}));

const initialState : SignInData = {
    email: 'admin@admin.com',
    password: '123456'
}

const Login : FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const authState : AuthState = useSelector((state : RootState) => state.auth);
    const dispatch = useDispatch();
    const [data, _, errors, setErrors, handleChange] = useForm(initialState, true, validate);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(validate(data, errors, setErrors)){
            dispatch(signIn(data));
        }
    }
    useEffect(() => {
        if(authState.authenticated)history.push('/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState.authenticated]);
    if(authState.isLoading)return <Loader/>;
    return (
        <div>
            <Paper elevation={10} className={classes.paperStyle}>
                <PageHeader 
                title='Login'
                subtitle='Form Design With Validation'
                icon={<LockOpenIcon style={{fill: 'primary'}} />}
                />
                 <Form onSubmit={handleSubmit}>
                    <Grid container>
                        <Controls.Input
                            error={errors.email} 
                            name='email' 
                            label='Email' 
                            value={data.email} 
                            onChange={handleChange}/>
                        <Controls.Input 
                            error={errors.password} 
                            name='password' 
                            label='Password' 
                            value={data.password} 
                            onChange={handleChange}/>
                        <Controls.Button 
                            // className={classes.buttonStyle}
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={handleSubmit}
                            >Login</Controls.Button> 
                    </Grid>
                </Form>
            </Paper>
            
        </div>
    )
}

export default Login;