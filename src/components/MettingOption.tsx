import React from "react";
import { Button } from "@mui/material";
import { MeetingOptionProps } from "../types/PropTypes";

const MeetingOption: React.FC<MeetingOptionProps> = ({ icon: Icon, iconText }: MeetingOptionProps): JSX.Element => {
    return <Button>
        <Icon />
        <p>{iconText}</p>
    </Button>
}

export default MeetingOption;