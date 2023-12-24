import { ErrorMessageFunction, ErrorStateFunction } from "../types/SetStateTypes";

function checkEmptyInput(inputValue: string, setError: ErrorStateFunction, setErrorMessage: ErrorMessageFunction, inputLabel: string) : boolean{
    if(!inputValue){
        setError(true);
        setErrorMessage(inputLabel + " cannot be empty");
        return false;
    }
    else{
        setError(false);
        setErrorMessage("");
        return true;
    }
}

function checkEmailInput(email: string, setError: ErrorStateFunction, setErrorMessage: ErrorMessageFunction) : boolean{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(email && emailRegex.test(email)){
        setError(false);
        setErrorMessage("");
        return true;
    }
    else{
        setError(true);
        setErrorMessage("Enter a valid email address");
        return false;
    }
}

export { checkEmailInput, checkEmptyInput };