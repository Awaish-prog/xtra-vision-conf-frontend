import { Container, Paper, Tabs, Tab } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useState } from "react";
import MeetingOption from "../components/MettingOption";
import MeetingCard from "../components/MeetingCard";
import { Meeting } from "../types/MeetingTypes";

const Dashboard: React.FC = (): JSX.Element => {
    const [ toggleMeetings, setToggleMeetings ] = useState<number>(0);
    const [ upcomingMettings, setUpcomingMettings ] = useState<Meeting[]>([
        {
            id: 1,
            title: "Title 1",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 2,
            title: "Title 1",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 3,
            title: "Title 1",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 4,
            title: "Title 1",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 5,
            title: "Title 1",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 6,
            title: "Title 1",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 7,
            title: "Title 1",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
    ])

    const [ previousMettings, setPreviousMettings ] = useState<Meeting[]>([
        {
            id: 1,
            title: "Title 11",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 2,
            title: "Title 12",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 3,
            title: "Title 13",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 4,
            title: "Title 14",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 5,
            title: "Title 15",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 6,
            title: "Title 16",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
        {
            id: 7,
            title: "Title 17",
            host: "Host 1",
            dateTime: "12-12-12, 12:00 PM"
        },
    ])

    return <>
        <Paper>
            <h1>Meetings</h1>
            <Container>
                <Container>
                    <MeetingOption icon = {VideocamIcon} iconText = {"New meeting"} />
                    <MeetingOption icon = {AddIcon} iconText = {"Join meeting"} />
                    <MeetingOption icon = {CalendarMonthIcon} iconText = {"Schedule meeting"} />
                </Container>
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