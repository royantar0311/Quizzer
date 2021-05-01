import React from 'react';
import {Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        maring: theme.spacing(0)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& MuiButton-label': {
            color: 'white',
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.main,
        '& MuiButton-label': {
            color: 'white',
        }
    }
}))

const ActionButton = (props) => {
    const classes = useStyles();
    const {color, children, onClick} = props;
    return (
        <Button
            onClick={onClick}
            className={`${classes.root} ${classes[color]}`}
        >
            {children}
        </Button>
    )
}

export default ActionButton;