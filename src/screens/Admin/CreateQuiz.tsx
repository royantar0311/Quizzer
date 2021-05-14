import { FC, useState } from 'react';
import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Controls, PageHeader } from '../../components';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Question } from '../../redux/quiz/quiz.types';
import ActionButton from '../../components/controls/ActionButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import useTable from '../../components/useTable';
import ChipInput from 'material-ui-chip-input';
import Modal from '@material-ui/core/Modal';
import { Input } from '@material-ui/core';
import './CreateQuiz.css';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
    },
    paper: {
        position: 'absolute',
        width: 'auto',
        minWidth: 500,
        maxWidth: '50%',
        height: 'auto',
        maxHeight: '80%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '10%',
        left: '10%',
        overflow: 'scroll',
        display: 'block'
    },
}));
const headCells = [
    { id: 'question', label: 'Question' },
    { id: 'options', label: 'Options' },
    { id: 'emotions', label: 'Emotions' },
    { id: 'weights', label: 'Weights' },
    { id: 'category', label: 'Category' },
    { id: 'imageLink', label: 'Image Link' },
    { id: 'action', label: 'Action' },
];

const initialState: Question[] = [
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

const CreateQuiz: FC = () => {
    const classes = useStyles();
    const [records, setRecords] = useState(initialState);
    const [chips, setChips] = useState<string[]>([]);
    const [modalStyle] = useState(getModalStyle);
    const [openModal, setOpenModal] = useState(false)

    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState("");
    const [emotions, setEmotions] = useState("");
    const [weights, setWeights] = useState("");
    const [catagory, setCatagory] = useState("");
    const [imageLink, setImageLink] = useState("");

    console.log(chips);
    const {
        TblContainer,
        TblHead,
        TblPagination,
    } = useTable(records, headCells, () => { });

    return (
        <>
            <Paper elevation={0} className={classes.paperStyle}>
                <PageHeader
                    title="Create a Quiz"
                    subtitle="add questions and options"
                    icon={<AddBoxIcon />}
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
                    onAdd={(chip) => setChips(chips => [...chips!, chip])}
                    onDelete={(chip: string, index: number) => {
                        setChips(values => values.filter((_, i) => i !== index))
                    }}
                />

                <button className="aq__button" onClick={() => setOpenModal(true)}>Add Question</button>

                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <div style={modalStyle} className={classes.paper}>

                        <form className="app__form">
                            <Input
                                type="text"
                                placeholder="Question Text"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Options"
                                value={options}
                                onChange={(e) => setOptions(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Emotions"
                                value={emotions}
                                onChange={(e) => setEmotions(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Weights"
                                value={weights}
                                onChange={(e) => setWeights(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Catagory"
                                value={catagory}
                                onChange={(e) => setCatagory(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Image Link"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                            />
                            <button className="modal__button" onClick={() => setOpenModal(false)}>Add this Question to the Quiz</button>
                        </form>
                    </div>
                </Modal>

                <TblContainer>
                    <TblHead />

                    <TableBody>
                        {
                            records.map((question: Question) =>
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
                                                    <EditIcon />
                                                </ActionButton>
                                                <ActionButton >
                                                    <CancelIcon />
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