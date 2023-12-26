import { Container, Paper, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import MeetingCard from "../components/MeetingCard";
import { Meeting } from "../types/MeetingTypes";
import MeetingOptions from "../components/MeetingOptions";
import { getMeetingsListApi } from "../apis/MeetingApis";

const Dashboard: React.FC = (): JSX.Element => {
    const [ toggleMeetings, setToggleMeetings ] = useState<number>(0);
    const [ upcomingMettings, setUpcomingMettings ] = useState<Meeting[]>([])
    const [ previousMettings, setPreviousMettings ] = useState<Meeting[]>([])

    async function getMeetingsList(){
        const response = await getMeetingsListApi();
        if(response.data.status === 200){
            setPreviousMettings(response.data.data.previousMeetings);
            setUpcomingMettings(response.data.data.upcomingMeetings);
        }
    }

    useEffect(() => {
        getMeetingsList()
    }, [])

    return <>
        <Paper>
            <h1>Meetings</h1>
            <Container>
                <MeetingOptions />
                <Container>
                    <Tabs value={toggleMeetings}>
                        <Tab label = {"Upcoming Meetings"} onClick={() => setToggleMeetings(0)} />
                        <Tab label = {"Previous Meetings"} onClick={() => setToggleMeetings(1)} />
                    </Tabs>
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
                </Container>
            </Container>
        </Paper>
    </>
}

export default Dashboard