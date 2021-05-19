import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
} from '@material-ui/core';
import React from 'react';

const Select = (props) => {
	const { name, label, error = null, value, onChange, options } = props;
	console.log(error);
	return (
		<FormControl variant="outlined" {...(error && { error: true })}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect name={name} value={value} label={label} onChange={onChange}>
				<MenuItem value="">None</MenuItem>
				{options.map((option, index) => (
					<MenuItem key={index} value={option.title}>
						{option.title}
					</MenuItem>
				))}
			</MuiSelect>
			<FormHelperText>{error}</FormHelperText>
		</FormControl>
	);
};

export default Select;
