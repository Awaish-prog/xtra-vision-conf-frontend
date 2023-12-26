import React, { SyntheticEvent, useState } from "react";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { checkEmailInput, checkEmptyInput } from "../utils/InputValidation";
import { loginUserApi } from "../apis/UserApis";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginSignup.css";

const Login: React.FC = (): JSX.Element => {
    const [ email, setEmail ] = useState<string>("");
    const [ emailErrorMessage, setEmailErrorMessage ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState<string>("");
    const [ emailError, setEmailError ] = useState<boolean>(false);
    const [ passwordError, setPasswordError ] = useState<boolean>(false);
    const navigate = useNavigate();

    async function handleLogin(e: SyntheticEvent){
        e.preventDefault();
        if(checkEmail() && checkPassword()){
            const response = await loginUserApi(password, email);
            if(response.data && response.data.status === 200){
                localStorage.setItem('email', response.data.data.email);
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('userId', response.data.data.id);
                navigate("/meetings")
            }
        }
    }
    function checkPassword(): boolean {
        return checkEmptyInput(password, setPasswordError, setPasswordErrorMessage, "Password");
    }

    function checkEmail(): boolean {
        return checkEmailInput(email, setEmailError, setEmailErrorMessage);
    }
    return <>
        <Paper className="form-container" component="form" elevation={5} onSubmit={handleLogin} >
            <h1 className="heading">Login</h1>
            <TextField className="inputs" id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailErrorMessage} onBlur={checkEmail} />

            <TextField className="inputs" id="password" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={passwordError} helperText={passwordErrorMessage} onBlur={checkPassword} />

            <Button variant="contained" size="large" type="submit">Login</Button>
            <span><Link style={{color: 'blue'}} to="/signup">Signup</Link> is you don't have an account</span>
        </Paper>
    </>
}

export default Login