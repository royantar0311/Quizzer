import { makeStyles, Paper, Typography } from '@material-ui/core';
import {FC, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { PageHeader } from '../components';

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
      paperStyle: {
        textAlign: 'center',
        // width: '500px',
        // height: '170px',
        margin: '50px auto',
        padding: theme.spacing(1),
        // borderRadius: '25px',
        '& MuiGrid-root': {
            margin: '10px auto'
        },
        borderColor: 'primary'
    },
  }));


const Quiz : FC = () => {
    //@ts-ignore
    const {quizCode} = useParams();
    const history = useHistory();
    const classes = useStyles();
    //@ts-ignore
    const quiz : Quiz[] = useSelector(state => state.quiz.quizzes).filter((x: Quiz) => x.quizCode === quizCode);
    
    useEffect(() => {
        if(quiz.length ===0)history.push('/pagenotfound');
    }, []);
    return (
        <> <div className={classes.left}>
                <Paper elevation={0} className={classes.paperStyle}>
                    <Typography variant="h3">{quiz[0].name}</Typography>
                    <Typography variant="h5">
                        <span style={{color: '#666666'}}>{quiz[0].description}</span></Typography>
                    <br/><br/>
                    <Typography variant="subtitle2">
                        <span style={{color: '#858585'}}>Instructions: {quiz[0].instructions}</span></Typography>
                </Paper>

            </div>
            <div className={classes.right}>


            </div>
        </>
    )
}

export default Quiz;