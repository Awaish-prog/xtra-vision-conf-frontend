import React from "react";
import { TimerProps } from "../types/PropTypes";
import "../styles/MeetingDashboard.css";

const Timers: React.FC<TimerProps> = ({ timers, sendTimer }: TimerProps): JSX.Element => {
    return <>
    {
        timers.map((timer, index) => {
            return <div className="meeting-button" key={index} onClick={() => sendTimer(timer)} >{timer}</div>
        })
    }
    </>
}

export default Timers;