import React, { SyntheticEvent, useState } from "react";
import { checkEmailInput, checkEmptyInput } from "../utils/InputValidation";
import { Button, Paper, TextField } from "@mui/material";
import { signUpUserApi } from "../apis/UserApis";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import "../styles/LoginSignup.css";

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
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ loader, setLoader ] = useState<boolean>(false);
    const navigate = useNavigate();

    async function handleSignup(e: SyntheticEvent){
        e.preventDefault();
        if(checkEmail() && checkPassword() && checkUserName()){
            setLoader(true);
            const response = await signUpUserApi(userName, password, email);
            if(response.data && response.data.status === 200){
                localStorage.setItem('email', response.data.data.email);
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('userId', response.data.data.id);
                localStorage.setItem('userName', response.data.data.name);
                setLoader(false);
                navigate("/meetings")
            }
            setErrorMessage(response.data.data.message);
            setLoader(false);
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
        <Paper className="form-container" component="form" elevation={5} onSubmit={handleSignup} >
            <h1 className="heading">Signup</h1>
            <TextField className="inputs" id="userName" label="Name" variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} error={userError} helperText={userErrorMessage} onBlur={checkUserName} />

            <TextField className="inputs" id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailErrorMessage} onBlur={checkEmail} />

            <TextField className="inputs" id="password" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={passwordError} helperText={passwordErrorMessage} onBlur={checkPassword} />
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <Button variant="contained" size="large" type="submit">{loader ? <CircularProgress size={30} color='secondary' /> : "Sign up"}</Button>
            <span><Link style={{color: 'blue'}} to="/">Login</Link> is you already have an account</span>
        </Paper>
    </>
}

export default Signup