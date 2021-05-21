import {
	Paper,
	TableBody,
	TableCell,
	TableRow,
	makeStyles,
} from '@material-ui/core';
import { FC, useState } from 'react';
import { useParams } from 'react-router';
import useTable from '../../components/useTable';
import { Examinee } from '../../redux/types';
import EmailIcon from '@material-ui/icons/Email';
import { PageHeader } from '../../components';
import ActionButton from '../../components/controls/ActionButton';
import DescriptionIcon from '@material-ui/icons/Description';
import { QuizState } from '../../redux/quiz/quiz.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root.reducer';
import './QuizResult.css';
import Modal from '@material-ui/core/Modal';

const headCells = [
	{ id: 'email', label: 'Email' },
	{ id: 'fullName', label: 'Full Name' },
	{ id: 'totalTime', label: 'Total Time' },
	{ id: 'totalScore', label: 'Total Score' },
	{ id: 'action', label: 'Action' },
];

const useStyles = makeStyles((theme) => ({
	paperStyle: {
		width: '70%',
		height: '400px',
		margin: '30px auto',
		padding: theme.spacing(3),

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

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const initialRecordState: Examinee[] = [
	{
		id: '21',
		fullName: 'Antar Roy',
		email: 'a@g.com',
		totalScore: 23,
		totalTime: 222,
	},
];

const QuizResult: FC = () => {
	// @ts-ignore
	const { quizCode } = useParams();
	const quizState: QuizState = useSelector((state: RootState) => state.quiz);
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const [modalOpen, setModalOpen] = useState(false);
	const [records, setRecords] = useState<Examinee[]>(initialRecordState);
	const { TblContainer, TblHead, TblPagination } = useTable(
		records,
		headCells,
		() => { }
	);

	return (
		<Paper elevation={0} className={classes.paperStyle}>
			<PageHeader
				title="Result Page"
				subtitle="see resuts for each individual person"
				icon={<EmailIcon />}
			/>
			<TblContainer >
				<TblHead />
				<TableBody >
					{records.map((record) => (
						<TableRow key={record.id} >
							<TableCell>{record.email}</TableCell>
							<TableCell>{record.fullName}</TableCell>
							<TableCell>{record.totalTime}</TableCell>
							<TableCell>{record.totalScore}</TableCell>
							<TableCell>
								<ActionButton onClick={() => setModalOpen(true)}>
									<DescriptionIcon />
								</ActionButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TblContainer>
			<TblPagination />

			<Modal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__form">

						{/* necessary elements */}

						<button className="modal__button" onClick={() => setModalOpen(false)}> Close </button>
					</form>
				</div>
			</Modal>

		</Paper>
	);
};

export default QuizResult;
