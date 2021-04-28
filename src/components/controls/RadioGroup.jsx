import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as RGroup } from '@material-ui/core'
import React from 'react'

const  RadioGroup = (props) => {
    const {items, title, onChange, name, value} = props;
    console.log(value);
    return (
        <FormControl>
        <FormLabel>{title}</FormLabel>
            <RGroup row>
                {
                    items.map((item, index) =>
                        <FormControlLabel onChange={onChange} name={name} key={index} value={item.value} control={<Radio/>} label={item.value}/>
                    )
                }
            </RGroup>
        </FormControl>
    )
}

export default RadioGroup
