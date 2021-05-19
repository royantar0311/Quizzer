import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Controls, PageHeader } from '../components';
import { Quiz } from '../redux/quiz/quiz.types';

const useStyles = makeStyles((theme) => ({
	root: {},
	paperStyle: {
		textAlign: 'center',
		width: '500px',
		height: '170px',
		margin: '30px auto',
		padding: theme.spacing(1),
		borderRadius: '25px',
		'& MuiGrid-root': {
			margin: '10px auto',
		},
		borderColor: 'primary',
	},
	buttonStyle: {
		textDecoration: 'none',
	},
}));
const Quizzes: FC = () => {
	const classes = useStyles();
	// @ts-ignore
	const quizzes: Quiz[] = useSelector((state) => state.quiz.quizzes);
	return (
		<>
			{console.log('asda')}
			{quizzes.map((quiz) => (
				<Paper elevation={10} className={classes.paperStyle}>
					<Grid container>
						<Grid item>
							<PageHeader
								key={quiz.quizCode}
								title={quiz.name}
								subtitle={quiz.description}
								icon={null}
							/>
						</Grid>
						<Grid item xs></Grid>
						<Grid item>
							<Grid item>
								<Link
									to={`/quiz/${quiz.quizCode}`}
									className={classes.buttonStyle}
								>
									<Controls.Button
										className={classes.buttonStyle}
										variant="outlined"
										color="primary"
									>
										Enter
									</Controls.Button>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			))}
		</>
	);
};

export default Quizzes;
