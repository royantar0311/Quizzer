import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import {FC, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../../components/controls/ActionButton';
import useTable from '../../components/useTable';
import { Quiz } from '../../redux/quiz/quiz.types';
import { RootState } from '../../redux/root.reducer';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { deleteQuiz } from '../../redux/quiz/quiz.actions';
import { useHistory } from 'react-router';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const headCells = [
    { id: 'quizCode', label: 'Code' },
    { id: 'quizName', label: 'Name' },
    { id: 'actions', label: 'Actions', disableSorting: true }
];

const useStyles = makeStyles(theme => {

})
const QuizList : FC = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory(); 
    const quizzes : Quiz[] = useSelector((state: RootState) => state.quiz.quizzes)
    const [records, setRecords] = useState(quizzes);
    // @ts-ignore
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    useEffect(() => {
        setRecords(quizzes);
    }, [quizzes]);
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    return (
        <Paper elevation={10} style={{width: '40%', margin: '20px auto', padding: '20px'}}>
            <TblContainer>
            <TblHead />
            <TableBody>
            {
                recordsAfterPagingAndSorting().map((quiz : Quiz) =>
                        <TableRow key={quiz.quizCode}>
                            <TableCell>{quiz.quizCode}</TableCell>
                            <TableCell>{quiz.name}</TableCell> 
                            <TableCell>
                                {   
                                    <div>
                                        <ActionButton onClick={()=>history.push(`/admin/edit/${quiz.quizCode}`)}>
                                            <EditIcon/>
                                        </ActionButton>
                                        <ActionButton onClick={()=>{dispatch(deleteQuiz(quiz))}}>
                                            <CancelIcon/>
                                        </ActionButton>
                                        <ActionButton onClick={()=> history.push(`/admin/result/${quiz.quizCode}`)}>
                                            <QuestionAnswerIcon/>
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
        
    )
} 

export default QuizList;