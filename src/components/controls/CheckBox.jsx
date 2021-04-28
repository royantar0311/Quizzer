import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core'
import React from 'react'

const CheckBox = (props) => {

    const convert = (e) => (
        {
            target: {
                name: e.target.name,
                value: e.target.checked
            }
        }
    );

    const {name, value, onChange, label} = props;
    return (
        <FormControl>
            <FormControlLabel 
                control={<Checkbox/>} 
                name={name}
                checked={value}
                onChange={(e) => onChange(convert(e))}
                label={label} 
                color="primary" 
                />
        </FormControl>
    )
}

export default CheckBox
