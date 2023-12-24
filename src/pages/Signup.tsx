import React, { SyntheticEvent, useState } from "react";
import { checkEmailInput, checkEmptyInput } from "../utils/InputValidation";
import { Button, Paper, TextField } from "@mui/material";

const Signup: React.FC = (): JSX.Element => {
    const [ email, setEmail ] = useState<string>("");
    const [ emailErrorMessage, setEmailErrorMessage ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState<string>("");
    const [ userName, setUserName ] = useState<string>("");
    const [ userErrorMessage, setUserErrorMessage ] = useState<string>("");
    const [ emailError, setEmailError ] = useState<boolean>(false);
    const [ passwordError, setPasswordError ] = useState<boolean>(false);
    const [ userError, setUserError ] = useState<boolean>(false);

    function handleSignup(e: SyntheticEvent){
        e.preventDefault();
        if(checkEmail() && checkPassword() && checkUserName()){
            console.log(email);
            console.log(password);
            console.log(userName);         
        }
    }
    function checkPassword(): boolean {
        return checkEmptyInput(password, setPasswordError, setPasswordErrorMessage, "Password");
    }
    function checkUserName(): boolean {
        return checkEmptyInput(userName, setUserError, setUserErrorMessage, "User Name");
    }
    function checkEmail(): boolean {
        return checkEmailInput(email, setEmailError, setEmailErrorMessage);
    }

    return <>
        <Paper component="form" elevation={5} onSubmit={handleSignup} >

            <TextField id="userName" label="User Name" variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} error={userError} helperText={userErrorMessage} onBlur={checkUserName} />

            <TextField id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailErrorMessage} onBlur={checkEmail} />

            <TextField id="password" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={passwordError} helperText={passwordErrorMessage} onBlur={checkPassword} />

            <Button variant="contained" size="large" type="submit">Sign up</Button>
        </Paper>
    </>
}

export default Signup