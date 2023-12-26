import { Button, Container } from "@mui/material";
import React from "react";
import { TimerProps } from "../types/PropTypes";

const Timers: React.FC<TimerProps> = ({ timers, sendTimer }: TimerProps): JSX.Element => {
    return <Container>
    {
        timers.map((timer, index) => {
            return <Button key={index} onClick={() => sendTimer(timer)} >{timer}</Button>
        })
    }
    </Container>
}

export default Timers;