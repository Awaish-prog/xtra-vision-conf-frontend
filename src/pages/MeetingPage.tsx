import React, { useMemo } from "react";
import Meeting from "./Meeting";
import { Container } from "@mui/material";
import Timer from "../components/Timer";


const MeetingPage: React.FC = (): JSX.Element => {
    const timers: number[] = useMemo(() => [15, 30, 45, 60], []);
    const ws: WebSocket = useMemo(() => new WebSocket('ws://localhost:3001'), []);
    const roomId = "1234";

    function sendTimer(timer: number){
        ws.send(JSON.stringify({event: "send-timer", data: { timer, roomId}}));
    }

    return <>
        <Container>
            <Timer timers={timers} sendTimer={sendTimer} />
        </Container>
        <Meeting ws = {ws} roomId={roomId} />
    </>
}

export default MeetingPage;