import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, {FC} from 'react';
import { useParams } from 'react-router';
import { Controls, PageHeader } from '../components';

const quizzes = [
    {name: 'Stress Test', instructions: 'asdasd', quizCode: '2r2q', description: 'test for aci limited'},
    {name: 'asdasdawqfa', instructions: 'aasdacsdasd', quizCode: '2t2q', description: 'acawwf'},
    {name: 'Stress Test', instructions: 'asdasd', quizCode: '2r2q', description: 'test for aci limited'},
    {name: 'asdasdawqfa', instructions: 'aasdacsdasd', quizCode: '2t2q', description: 'acawwf'},
    {name: 'Stress Test', instructions: 'asdasd', quizCode: '2r2q', description: 'test for aci limited'},
    {name: 'asdasdawqfa', instructions: 'aasdacsdasd', quizCode: '2t2q', description: 'acawwf'},
    {name: 'Stress Test', instructions: 'asdasd', quizCode: '2r2q', description: 'test for aci limited'},
    {name: 'asdasdawqfa', instructions: 'aasdacsdasd', quizCode: '2t2q', description: 'acawwf'},
]

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    paperStyle: {
        width: '30%',
        height: '170px',
        margin: '30px auto',
        padding: theme.spacing(1),
        borderRadius: '25px',
        '& MuiButtonBase-root': {
            margin: '0px'
        }
    }
}));
const Quizzes : FC = () =>  {
    // @ts-ignore
    const {quizCode} = useParams();
    const classes = useStyles();

    return (
        <>
         {console.log('asda')}
        {   
       
            quizzes.map((quiz) => 
            
                <Paper elevation={10} className={classes.paperStyle}>
                    <Grid container>
                        <Grid item>
                            <PageHeader key={quiz.quizCode} 
                                title={quiz.name}
                                subtitle={quiz.description}
                                icon={null}
                                />
                        </Grid>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Grid item>
                                <Controls.Button
                                    variant="outlined"
                                    color="primary"
                                    >Enter</Controls.Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                
            )
        }
        </>
    )
}

export default Quizzes;