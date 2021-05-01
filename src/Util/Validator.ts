import { emailRegex } from "./Regex";

const validate : Function = (fieldsValues: any, errors: any, setErrors: Function) => {
    let temp = {...errors};
    
    if('email' in fieldsValues){
        temp.email = fieldsValues.email !== ""?"":"This field is required";
        temp.email = emailRegex.test(fieldsValues.email) === true?"":"Invalid Email";
    }
    if('password' in fieldsValues){
        temp.password = fieldsValues.password !== ""?"":"This field is required";
        temp.password = fieldsValues.password.length >= 6?"":"Password should be of at least length 6";
    }
    
    setErrors({
        ...temp
    })

    return Object.values(temp).every(x => x === "");
}

export default validate;