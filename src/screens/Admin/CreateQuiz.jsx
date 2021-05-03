import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { Controls, PageHeader } from '../../components';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles(theme => ({
    paperStyle: {
        width: '70%',
        height: '400px',
        margin: '30px auto',
        padding: theme.spacing(2)
    }
}));

const CreateQuiz  = () => {
    const classes = useStyles();
    return (
        <>
            <Paper elevation={5} className={classes.paperStyle}>
                <PageHeader 
                    title="Create a Quiz"
                    subtitle="add questions and options"
                    icon={<AddBoxIcon/>}
                />
            <Controls.Input label="Quiz Name">
                Quiz Name
            </Controls.Input>
            </Paper>
            
        </>
    )
}

export default CreateQuiz;