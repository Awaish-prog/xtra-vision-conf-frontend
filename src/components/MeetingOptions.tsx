import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import MeetingOption from './MettingOption';
import VideocamIcon from '@mui/icons-material/Videocam';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { checkEmptyInput } from '../utils/InputValidation';
import { createNewMeetingApi } from '../apis/MeetingApis';

const MeetingOptions: React.FC = (): JSX.Element => {
    const [ open, setOpen ] = useState<boolean>(false);
    const [ openDate, setOpenDate ] = useState<boolean>(false);
    const [ title, setTitle ] = useState<string>("");
    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ titleErrorMessage, setTitleErrorMessage] = useState<string>("");
    const [ date, setDate ] = React.useState<Dayjs | null>(dayjs().add(1, 'hour'));

    function handleClose(){
        setOpen(false);
        setOpenDate(false);
        setTitle("");
        setDate(dayjs().add(1, 'hour'));
        setTitleError(false);
        setTitleErrorMessage("");
    }

    function handleMeetingFormPopUp(withDate: boolean){
        setOpen(true);
        if(withDate){
            setOpenDate(true);
            setDate(dayjs().add(1, 'hour'));
        }
        else{
            setOpenDate(false);
            setDate(dayjs());
        }
    }

    function validateTitle(){
        return checkEmptyInput(title, setTitleError, setTitleErrorMessage, "Meeting Title");
    }

    async function createMeeting(){
        if(validateTitle()){
            const response = await createNewMeetingApi(title, date);
            response.data.status === 200 ? handleClose(): console.log("Failed..");
        }
    }

    return <Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Meeting</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="title" label="Meeting Title" type="text" fullWidth variant="standard" value={title} onChange={e => setTitle(e.target.value)} error={titleError} helperText={titleErrorMessage} onBlur={validateTitle} />
                    
                    {openDate && <DateTimePicker label="Meeting Date" value={date} onChange={(newValue) => setDate(newValue)} disablePast />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createMeeting}>Create Meeting</Button>
                </DialogActions>
            </Dialog>
            <Container onClick={() => handleMeetingFormPopUp(false)}>
                <MeetingOption icon = {VideocamIcon} iconText = {"New meeting"} />
            </Container>
            <Container onClick={() => handleMeetingFormPopUp(true)}>
                <MeetingOption icon = {CalendarMonthIcon} iconText = {"Schedule meeting"} />
            </Container>
        </Container>
}

export default MeetingOptions;