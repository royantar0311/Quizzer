import React, { FC, useEffect } from 'react';
import { Controls, Form, PageHeader, useForm } from '../components';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router';
import { SignInData } from '../redux/types';
import { emailRegex } from '../Util/Regex';
import { signIn } from '../redux/auth/auth.actions';

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    paperStyle: {
        width: '500px',
        height: '500px',
        margin: '30px auto',
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    buttonStyle: {
        // margin: '30px auto',
        // padding: theme.spacing(3)
    }
}));

const initialState : SignInData = {
    email: 'admin@admin.com',
    password: '123456'
}

const Login : FC = () => {
    const history = useHistory();
    const classes = useStyles();
    // @ts-ignore
    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const dispatch = useDispatch();
    const validate : Function = (fieldsValues = data) => {
        let temp = {...errors};
        
        if('email' in fieldsValues){
            temp.email = fieldsValues.email !== ""?"":"This field is required";
            temp.email = emailRegex.test(fieldsValues.email) === true?"":"Invalid Email";
        }
        if('password' in fieldsValues){
            temp.password = fieldsValues.password !== ""?"":"This field is required";
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
    useEffect(() => {
        if(isAuthenticated === true)history.push('/home');
    }, [isAuthenticated])
    
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
                            className={classes.buttonStyle}
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