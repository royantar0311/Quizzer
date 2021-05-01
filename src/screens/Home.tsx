import { Grid, makeStyles, Paper } from '@material-ui/core';
import {FC} from 'react';
import { Controls, Form, PageHeader, useForm } from '../components';
import InputIcon from '@material-ui/icons/Input';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    paperStyle: {
        width: '500px',
        height: '400px',
        margin: '30px auto',
        padding: theme.spacing(2)
    },
    buttonStyle: {
        margin: '30px auto',
        width: '100%'
    }
}));
interface state {
    quizCode: String;
}
const initialState : state= {
    quizCode: ''
}

const Home : FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const validate : Function = (fieldsValues = data) => {
        let temp = {...errors};
        console.log(data);
        if('quizCode' in fieldsValues){
            temp.quizCode = fieldsValues.quizCode === ""?"This field is required":"";
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
            history.push(`/quiz/${data.quizCode}`);
        }
    }
    return (
        <Paper elevation={10} className={classes.paperStyle}>
                <PageHeader 
                title='Enter a Quiz'
                subtitle='Enter quize code below to enter!'
                icon={<InputIcon style={{fill: 'primary'}} />}
                />
                <Form onSubmit={handleSubmit}>
                    <Grid container>
                        <Controls.Input
                            error={errors.quizCode} 
                            name='quizCode' 
                            label='Code' 
                            value={data.quizCode} 
                            onChange={handleChange}/>
                            <Controls.Button 
                            className={classes.buttonStyle}
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={handleSubmit}
                            >Find</Controls.Button>                      
                    </Grid>
                </Form>
            </Paper>
    )
}

export default Home;