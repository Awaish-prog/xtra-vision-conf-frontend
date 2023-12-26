import { Button, Card } from "@mui/material";
import React from "react";
import { MeetingCardProps } from "../types/PropTypes";
import { useNavigate } from "react-router-dom";

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }: MeetingCardProps): JSX.Element => {
    const navigate = useNavigate()
    function joinMeeting(){
        navigate(`/join-meeting?roomId=${meeting.id}`)
    }

    return <Card>
        <p>{(new Date(meeting.dateTime)).toLocaleString()}</p>
        <h3>{meeting.title}</h3>
        <Button onClick={joinMeeting}>Join</Button>
    </Card>
}

export default MeetingCard;