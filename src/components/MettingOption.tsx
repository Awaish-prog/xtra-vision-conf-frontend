import React from "react";
import { Button } from "@mui/material";
import { MeetingOptionProps } from "../types/PropTypes";
import "../styles/MeetingDashboard.css";

const MeetingOption: React.FC<MeetingOptionProps> = ({ icon: Icon, iconText }: MeetingOptionProps): JSX.Element => {
    return <div className="create-meeting-buttons">
            <Button className="create-meeting-buttons">
                <Icon />
            <span>{iconText}</span>
            </Button>
        </div>
}

export default MeetingOption;