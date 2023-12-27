import { Paper, Tabs, Tab, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MeetingCard from "../components/MeetingCard";
import { Meeting } from "../types/MeetingTypes";
import MeetingOptions from "../components/MeetingOptions";
import { getMeetingsListApi } from "../apis/MeetingApis";
import { sortMeetingAsc, sortMeetingDsc } from "../utils/sortMeetings";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';
import "../styles/MeetingDashboard.css";

const Dashboard: React.FC = (): JSX.Element => {
    const [ toggleMeetings, setToggleMeetings ] = useState<number>(0);
    const [ upcomingMettings, setUpcomingMettings ] = useState<Meeting[]>([])
    const [ previousMettings, setPreviousMettings ] = useState<Meeting[]>([])
    const [ loader, setLoader ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const navigate = useNavigate()

    async function getMeetingsList(){
        setLoader(true);
        const response = await getMeetingsListApi();
        if(response.data.status === 200){
            setPreviousMettings(sortMeetingDsc(response.data.data.previousMeetings));
            setUpcomingMettings(sortMeetingAsc(response.data.data.upcomingMeetings));
        }
        else{
            setErrorMessage(response.data.data.message);
        }
        setLoader(false)
    }

    function addMeetingInUpcomingMeetings(meeting: Meeting){
        setUpcomingMettings(sortMeetingAsc([...upcomingMettings, meeting]));
    }

    function logout(){
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
        window.history.replaceState(null, "", '/');
        navigate(-1);
    }
    
    useEffect(() => {
        if(!localStorage.getItem("userId") || !localStorage.getItem("userId") || !localStorage.getItem("email")){
            window.history.replaceState(null, "", '/');
            navigate(-1)
        }
        getMeetingsList()
    }, [])

    return <>
        <Paper className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="heading">Meetings</h1>
                <Button onClick={logout}><LogoutIcon /></Button>
            </header>
            <div className="meetings-options-container">
                <MeetingOptions addMeetingInUpcomingMeetings={addMeetingInUpcomingMeetings} />
                <div className="meetings-container">
                    <Tabs className="tabs" value={toggleMeetings}>
                        <Tab label = {"Upcoming Meetings"} onClick={() => setToggleMeetings(0)} />
                        <Tab label = {"Previous Meetings"} onClick={() => setToggleMeetings(1)} />
                    </Tabs>
                    {
                        loader ?
                        <div className="loader">
                        <CircularProgress size={90} color='info' />
                        </div>
                        :
                        <>
                            <div className="meetings-list-container">
                            {
                                errorMessage && <p className="error-message error-message-margin" >{errorMessage}</p>
                            }
                            {
                                toggleMeetings === 0 ?
                                (upcomingMettings.length ?
                                upcomingMettings.map((upcomingMetting) => {
                                    return <MeetingCard meeting = {upcomingMetting} />
                                })
                                :
                                <p className="error-message-margin">You don't have any upcoming meetings</p>)
                                :
                                (previousMettings.length ?
                                previousMettings.map((previousMetting) => {
                                    return <MeetingCard meeting = {previousMetting} />
                                })
                                :
                                <p className="error-message-margin">You don't have any previous meetings</p>)
                            }
                            </div>
                        </>
                    }
                </div>
            </div>
        </Paper>
    </>
}

export default Dashboard