import React, { useState} from 'react';
import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Controls, PageHeader } from '../../components';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Question } from '../../redux/quiz/quiz.types';
import ActionButton from '../../components/controls/ActionButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import useTable from '../../components/useTable';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles(theme => ({
    paperStyle: {
        width: '70%',
        height: '400px',
        margin: '30px auto',
        padding: theme.spacing(3)
    },
    chipsStyle: {
        marginLeft: '20px', 
        height: "70px",
    }
}));    
const headCells = [
    { id: 'question', label: 'Question' },
    { id: 'options', label: 'Options' },
    { id: 'emotions', label: 'Emotions'},
    { id: 'weights', label: 'Weights'},
    { id: 'category', label: 'Category'},
    { id: 'imageLink', label: 'Image Link'},
    { id: 'action', label: 'Action'},
];
const initialState = [
    {
        category: 'physics',
        emotions: 'asd',
        imageLink: 'qsd',
        options: 'asdasd',
        questionText: 'asdasd asdasdasd asdasdasd',
        weights: '10,20,30',
        id: '1'
    }
];

const CreateQuiz = () => {
    const classes = useStyles();
    const [records, setRecords] = useState(initialState);
    const [chips, setChips] = useState([]);
    console.log(chips);
    const {
        TblContainer,
        TblHead,
        TblPagination,
    } = useTable(records, headCells, () => {});

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
            <ChipInput
                className={classes.chipsStyle}
                label="Categories"
                variant="outlined"
                placeholder="Categories"
                value={chips}
                onAdd={(chip) => setChips(chips => [...chips, chip])}
                onDelete={(chip, index) => {
                    setChips(values => values.filter((_, i) => i !== index))}}
            />
            <TblContainer>
            <TblHead />
            
            <TableBody>
            {
                records.map((question) =>
                        <TableRow key={question.id}>
                            <TableCell>{question.questionText}</TableCell> 
                            <TableCell>{question.options}</TableCell> 
                            <TableCell>{question.emotions}</TableCell> 
                            <TableCell>{question.weights}</TableCell> 
                            <TableCell>{question.category}</TableCell>
                            <TableCell>{question.imageLink}</TableCell> 
                            <TableCell>
                                {   
                                    <div>
                                        <ActionButton>
                                            <EditIcon/>
                                        </ActionButton>
                                        <ActionButton >
                                            <CancelIcon/>
                                        </ActionButton>
                                    </div>
                                    
                                
                                }
                            </TableCell>
                        </TableRow>   
                )
            }
            </TableBody>
        </TblContainer>
        <TblPagination />
            </Paper>
        </>
    )
}

export default CreateQuiz;