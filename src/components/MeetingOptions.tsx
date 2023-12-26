import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import MeetingOption from './MettingOption';
import VideocamIcon from '@mui/icons-material/Videocam';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { checkEmptyInput } from '../utils/InputValidation';
import { createNewMeetingApi } from '../apis/MeetingApis';
import { Meeting } from '../types/MeetingTypes';
import { useNavigate } from 'react-router-dom';
import "../styles/MeetingDashboard.css";

const MeetingOptions: React.FC<{addMeetingInUpcomingMeetings: Function}> = ({ addMeetingInUpcomingMeetings } : {addMeetingInUpcomingMeetings: Function}): JSX.Element => {
    const [ open, setOpen ] = useState<boolean>(false);
    const [ openDate, setOpenDate ] = useState<boolean>(false);
    const [ title, setTitle ] = useState<string>("");
    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ titleErrorMessage, setTitleErrorMessage] = useState<string>("");
    const [ date, setDate ] = React.useState<Dayjs | null>(dayjs().add(1, 'hour'));
    const navigate = useNavigate();

    function handleClose(){
        setOpen(false);
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
            if(response.data.status === 200){
                handleClose();
                const { id, hostId, title, dateTime }: Meeting = response.data.data;
                addMeetingInUpcomingMeetings({ id, hostId, title, dateTime });
                if(!openDate){
                    navigate(`/join-meeting?roomId=${id}`)
                }
                setOpenDate(false);
            }
            else{
                console.log(response.data.data);
            }
        }
    }

    return <div className="meeting-options-container">
            <Dialog open={open} onClose={handleClose} scroll="body" PaperProps={{ sx: { mt: "10px", verticalAlign: "top", width: '40vw' } }}>
                <DialogTitle>Create Meeting</DialogTitle>
                <DialogContent>
                    <p></p>
                    {openDate && <DateTimePicker label="Meeting Date" value={date} onChange={(newValue) => setDate(newValue)} disablePast />}
                    <p></p>
                    <TextField autoFocus margin="dense" id="title" label="Meeting Title" type="text" fullWidth variant="standard" value={title} onChange={e => setTitle(e.target.value)} error={titleError} helperText={titleErrorMessage} onBlur={validateTitle} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createMeeting}>Create Meeting</Button>
                </DialogActions>
            </Dialog>
            <div className="create-meeting-options">
                <div className="create-meeting-option" onClick={() => handleMeetingFormPopUp(false)}>
                    <MeetingOption icon = {VideocamIcon} iconText = {"New meeting"} />
                </div>
                <div className="create-meeting-option" onClick={() => handleMeetingFormPopUp(true)}>
                    <MeetingOption icon = {CalendarMonthIcon} iconText = {"Schedule meeting"} />
                </div>
            </div>
        </div>
}

export default MeetingOptions;