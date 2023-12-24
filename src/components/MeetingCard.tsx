import { Card } from "@mui/material";
import React from "react";
import { MeetingCardProps } from "../types/PropTypes";

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }: MeetingCardProps): JSX.Element => {
    return <Card>
        <p>{meeting.dateTime}</p>
        <h3>{meeting.title}</h3>
        <p>Host: {meeting.host}</p>
    </Card>
}

export default MeetingCard;