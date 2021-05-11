import { CircularProgress, makeStyles } from '@material-ui/core';
import {FC} from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px'
    }
}));

interface props{
    progress?: number;
}

const Loader: FC<props> = ({progress}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <CircularProgress
            {...(progress && {value: progress})}
        />  
        </div>
    )
}   

export default Loader;