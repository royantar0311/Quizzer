import { Grid, makeStyles } from '@material-ui/core';
import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {Controls, useForm} from './index';
import { Form } from './useForm';
import { emailRegex } from '../Util/Regex';
import log from '../Util/Logger';
import { signIn } from '../redux/auth/auth.actions';
import { SignInData } from '../redux/types';


const initialState : SignInData = {
    email: 'admin@admin.com',
    password: '123456'
}

const useStyles = makeStyles(theme => ({
    buttonStyle: {
        margin: '30px auto'
    }
}));
const LoginForm : FC = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const validate = (fieldsValues = data) => {
        log(fieldsValues);
        let temp = {...errors};
        
        if('email' in fieldsValues){
            
            temp.email = fieldsValues.email === ""?"":"This field is required";
            temp.email = emailRegex.test(fieldsValues.email) === true?"":"Invalid Email";
        }
        if('password' in fieldsValues){
            temp.password = fieldsValues.password === ""?"":"This field is required";
            temp.password = fieldsValues.password.length >= 6?"":"Password should be of at least length 6";
        }
        
        
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }
    const [data, _, errors, setErrors, handleChange] = useForm(initialState, true, validate);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(validate()){
            dispatch(signIn(data));
        }
    }
    return (
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
                    className={classes.buttonStyle}
                    variant="outlined"
                    onClick={handleSubmit}
                    >Login</Controls.Button> 
            </Grid>
        </Form>
    )
}

export default LoginForm;