import { makeStyles } from '@material-ui/core';
import  { useState } from 'react'

const useForm = (initialState: any, validateOnChange?: boolean, validate?: Function) => {
    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setState(initialState);
        setErrors({});
    }

    const handleChange = (e: any) => {
        console.log(e.target.value)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        if(validateOnChange === true && validate !== undefined){
            validate({[e.target.name]: e.target.value}, errors, setErrors);
        }
    }

    return [state, setState, errors, setErrors, handleChange, resetForm];
}


const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(2)
        }
    }
}))

export const Form = (props: any) => {

    const classes = useStyle();
    const { ...other } = props;
    return (
        <form {...other} className={classes.root} autoComplete="off">
            {props.children}
        </form>
    )
}

export default useForm;
