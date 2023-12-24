import React, { SyntheticEvent, useState } from "react";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { checkEmailInput, checkEmptyInput } from "../utils/InputValidation";


const Login: React.FC = (): JSX.Element => {
    const [ email, setEmail ] = useState<string>("");
    const [ emailErrorMessage, setEmailErrorMessage ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState<string>("");
    const [ emailError, setEmailError ] = useState<boolean>(false);
    const [ passwordError, setPasswordError ] = useState<boolean>(false);

    function handleLogin(e: SyntheticEvent){
        e.preventDefault();
        if(checkEmail() && checkPassword()){
            console.log(email);
            console.log(password);            
        }
    }
    function checkPassword(): boolean {
        return checkEmptyInput(password, setPasswordError, setPasswordErrorMessage, "Password");
    }

    function checkEmail(): boolean {
        return checkEmailInput(email, setEmailError, setEmailErrorMessage);
    }

    return <>
        <Paper component="form" elevation={5} onSubmit={handleLogin} >
            <TextField id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailErrorMessage} onBlur={checkEmail} />

            <TextField id="password" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={passwordError} helperText={passwordErrorMessage} onBlur={checkPassword} />

            <Button variant="contained" size="large" type="submit">Login</Button>
        </Paper>
    </>
}

export default Login