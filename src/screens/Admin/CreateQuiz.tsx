import { FC, useState, ChangeEvent } from 'react';
import {
	makeStyles,
	Paper,
	TableBody,
	TableCell,
	TableRow,
} from '@material-ui/core';
import { Controls, PageHeader } from '../../components';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Question, QuizState } from '../../redux/quiz/quiz.types';
import ActionButton from '../../components/controls/ActionButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import useTable from '../../components/useTable';
import ChipInput from 'material-ui-chip-input';
import Modal from '@material-ui/core/Modal';
import { useParams } from 'react-router-dom';
import { Quiz } from '../../redux/quiz/quiz.types';
import './CreateQuiz.css';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root.reducer';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paperStyle: {
		width: '70%',
		height: '400px',
		margin: '30px auto',
		padding: theme.spacing(3),
	},
	chipsStyle: {
		marginLeft: '20px',
		height: '70px',
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
		display: 'block',
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
const initialRecordState: Question[] = [
	{
		category: 'physics',
		emotions: 'asd',
		imageLink: 'qsd',
		options: 'asdasd',
		questionText: 'asdasd asdasdasd asdasdasd',
		weights: '10,20,30',
		id: '1',
	},
];

const intialModalInputState: Question = {
	category: '',
	emotions: '',
	imageLink: '',
	options: '',
	questionText: '',
	weights: '',
	id: '',
};

const CreateQuiz: FC = () => {
	// @ts-ignore
	const { quizCode } = useParams();
	const quizState: QuizState = useSelector((state: RootState) => state.quiz);
	const editQuiz: Quiz | undefined = quizState.quizzes.find(
		(quiz) => quiz.quizCode === quizCode
	);
	const classes = useStyles();
	const [quizName, setQuizName] = useState(editQuiz?.name ?? '');
	const [records, setRecords] = useState(
		editQuiz?.questions ?? initialRecordState
	);
	const [chips, setChips] = useState<string[]>(editQuiz?.categories ?? []);
	const [modalStyle] = useState(getModalStyle);
	const [isModalOpen, setModalOpen] = useState({
		status: false,
		mode: 'create',
	});

	const [modalInputState, setModalInputState] = useState<Question>(
		intialModalInputState
	);

	const { TblContainer, TblHead, TblPagination } = useTable(
		records,
		headCells,
		() => {}
	);

	const changeModalState = (
		status: boolean,
		mode: string,
		question?: Question
	) => {
		setModalOpen({
			status,
			mode,
		});
		if (question) setModalInputState(question);
	};

	const handleModalSubmit = () => {
		if (isModalOpen.mode === 'create') {
			const newQuestion: Question = {
				...modalInputState,
				id: nanoid().toString(),
			};
			setRecords([newQuestion, ...records]);
		} else {
			setRecords([
				modalInputState,
				...records.filter((question) => question.id !== modalInputState.id),
			]);
		}
		changeModalState(false, 'create');
		setModalInputState(intialModalInputState);
	};

	return (
		<>
			<Paper elevation={0} className={classes.paperStyle}>
				<PageHeader
					title="Create a Quiz"
					subtitle="add questions and options"
					icon={<AddBoxIcon />}
				/>

				<Controls.Input
					variant="outlined"
					label="Quiz Name"
					value={quizName}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setQuizName(e.target.value)
					}
				/>

				<ChipInput
					className={classes.chipsStyle}
					label="Categories"
					variant="outlined"
					placeholder="Categories"
					value={chips}
					onAdd={(chip) => setChips((chips) => [...chips, chip])}
					onDelete={(chip, index) => {
						setChips((values) => values.filter((_, i) => i !== index));
						setRecords([
							...records.filter((record) => record.category !== chip),
						]);
					}}
				/>

				<button
					className="aq__button"
					onClick={() => changeModalState(true, 'create')}
				>
					Add Question
				</button>

				<Modal
					open={isModalOpen.status}
					onClose={() => {
						changeModalState(false, 'create');
						setModalInputState(intialModalInputState);
					}}
				>
					<div style={modalStyle} className={classes.paper}>
						<form className="app__form">
							<Controls.Input
								type="text"
								label="Question"
								placeholder="Question Text"
								value={modalInputState.questionText}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setModalInputState({
										...modalInputState,
										questionText: e.target.value,
									})
								}
							/>
							<Controls.Input
								type="text"
								label="Options"
								placeholder="Options"
								value={modalInputState.options}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setModalInputState({
										...modalInputState,
										options: e.target.value,
									})
								}
							/>
							<Controls.Input
								type="text"
								label="Emotions"
								placeholder="Emotions"
								value={modalInputState.emotions}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setModalInputState({
										...modalInputState,
										emotions: e.target.value,
									})
								}
							/>
							<Controls.Input
								type="text"
								label="Weights"
								placeholder="Weights"
								value={modalInputState.weights}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setModalInputState({
										...modalInputState,
										weights: e.target.value,
									})
								}
							/>
							<Controls.Input
								type="text"
								label="Category"
								placeholder="Catagory"
								value={modalInputState.category}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setModalInputState({
										...modalInputState,
										category: e.target.value,
									})
								}
							/>
							<Controls.Input
								type="text"
								label="Image Link"
								placeholder="Image Link"
								value={modalInputState.imageLink}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setModalInputState({
										...modalInputState,
										imageLink: e.target.value,
									})
								}
							/>
							<button className="modal__button" onClick={handleModalSubmit}>
								{isModalOpen.mode === 'create' ? 'Add' : 'Edit'} this Question
								to the Quiz
							</button>
						</form>
					</div>
				</Modal>

				<TblContainer>
					<TblHead />

					<TableBody>
						{records.map((question) => (
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
											<ActionButton
												onClick={() => changeModalState(true, 'edit', question)}
											>
												<EditIcon />
											</ActionButton>
											<ActionButton
												onClick={() =>
													setRecords([
														...records.filter(
															(record) => record.id !== question.id
														),
													])
												}
											>
												<CancelIcon />
											</ActionButton>
										</div>
									}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
		</>
	);
};

export default CreateQuiz;
