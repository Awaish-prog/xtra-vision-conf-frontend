import { Paper, Tabs, Tab, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MeetingCard from "../components/MeetingCard";
import { Meeting } from "../types/MeetingTypes";
import MeetingOptions from "../components/MeetingOptions";
import { getMeetingsListApi } from "../apis/MeetingApis";
import { sortMeetingAsc, sortMeetingDsc } from "../utils/sortMeetings";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import "../styles/MeetingDashboard.css";

const Dashboard: React.FC = (): JSX.Element => {
    const [ toggleMeetings, setToggleMeetings ] = useState<number>(0);
    const [ upcomingMettings, setUpcomingMettings ] = useState<Meeting[]>([])
    const [ previousMettings, setPreviousMettings ] = useState<Meeting[]>([])
    const navigate = useNavigate()

    async function getMeetingsList(){
        const response = await getMeetingsListApi();
        if(response.data.status === 200){
            setPreviousMettings(sortMeetingDsc(response.data.data.previousMeetings));
            setUpcomingMettings(sortMeetingAsc(response.data.data.upcomingMeetings));
        }
    }

    function addMeetingInUpcomingMeetings(meeting: Meeting){
        setUpcomingMettings(sortMeetingAsc([...upcomingMettings, meeting]));
    }

    function logout(){
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
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
                    <div className="meetings-list-container">
                    {
                        toggleMeetings === 0 ?
                        upcomingMettings.map((upcomingMetting) => {
                            return <MeetingCard meeting = {upcomingMetting} />
                        })
                        :
                        previousMettings.map((previousMetting) => {
                            return <MeetingCard meeting = {previousMetting} />
                        })
                    }
                    </div>
                </div>
            </div>
        </Paper>
    </>
}

export default Dashboard