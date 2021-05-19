import { Paper, Card, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#fdfdff',
	},
	pageHeader: {
		padding: theme.spacing(4),
		marginBottom: theme.spacing(2),
		display: 'flex',
	},
	pageIcon: {
		display: 'inline-block',
		padding: theme.spacing(2),
		color: theme.palette.primary.main,
	},
	pageTitle: {
		paddingLeft: theme.spacing(4),
		'& .MuiTypography-subtitle2': {
			opacity: '0.6',
		},
	},
}));

const PageHeader = (props: any) => {
	const classes = useStyles();
	const { icon, title, subtitle } = props;
	return (
		<Paper elevation={0} square className={classes.root}>
			<div className={classes.pageHeader}>
				{icon && <Card className={classes.pageIcon}>{icon}</Card>}
				<div className={classes.pageTitle}>
					<Typography variant="h6" component="div">
						{title}
					</Typography>
					<Typography variant="subtitle2" component="div">
						{subtitle}
					</Typography>
				</div>
			</div>
		</Paper>
	);
};

export default PageHeader;
