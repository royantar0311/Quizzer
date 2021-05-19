import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import {FC, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Controls, Form, PageHeader, useForm } from '../components';
import { Quiz as QuizType} from '../redux/quiz/quiz.types';
import { RootState } from '../redux/root.reducer';
import { validate } from '../Util';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const useStyles = makeStyles(theme => ({
    left: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      left: "0px",
      width: "50%",
      height: "100%"
    },
    right: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        right: "0px",
        width: "50%",
        height: "100%",
        backgroundColor: theme.palette.secondary.light
      },
      leftPaper: {
        textAlign: 'center',
        margin: '10vh auto',
        padding: theme.spacing(1),
        '& MuiGrid-root': {
            margin: '10px auto'
        },
        borderColor: 'primary'
    },
    rightPaper: {
        width: '70%',
        margin: '15vh auto',
        padding: theme.spacing(5),
        borderRadius: '25px',
        borderColor: 'primary'
    },
  }));
const initialState = {
    email: '',
    fullName: ''
}

const StartQuiz : FC = () => {
    //@ts-ignore
    const {quizCode} = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [data, _, errors, setErrors, handleChange] = useForm(initialState, true, validate);
    const quiz : QuizType[] = useSelector((state : RootState) => state.quiz.quizzes)
                                .filter((x: QuizType) => x.quizCode === quizCode);
    
    useEffect(() => {
        console.log(quiz);
        if(quiz.length ===0)history.push('/pagenotfound');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {

    }

    return (
        quiz.length !==0 ? 
        <>
            <div className={classes.left}>
                <Paper elevation={0} className={classes.leftPaper}>
                    <Typography variant="h3">{quiz[0].name}</Typography>
                    <Typography variant="h5">
                        <span style={{color: '#666666'}}>{quiz[0].description}</span></Typography>
                    <br/><br/>
                    <Typography variant="subtitle2">
                        <span style={{color: '#858585'}}>Instructions: {quiz[0].instructions}</span></Typography>
                </Paper>

            </div>
            <div className={classes.right}>
                <Paper elevation={8} className={classes.rightPaper}>
                    <PageHeader 
                    title='Start Quiz'
                    subtitle=''
                    icon={<PlayCircleFilledIcon  style={{fill: 'primary'}}/>}
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
                            error={errors.fullName} 
                            name='password' 
                            label='Full Name' 
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
        </> : null
    )
}

export default StartQuiz;