import React, { useMemo, useRef, useState } from "react";
import Meeting from "../components/Meeting";
import { Button, Container } from "@mui/material";
import Timers from "../components/Timers";
import Timer from "../components/Timer";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const MeetingPage: React.FC = (): JSX.Element => {
    const [ myVideoOn, setMyVideoOn ] = useState<boolean>(true);
    const [ myAudioOn, setMyAudioOn ] = useState<boolean>(true);
    const timers: number[] = [15, 30, 45, 60]
    const [ timer, setTimer ] = useState<number>(-3)
    let interval: number = useMemo(() => 0, [])
    const ws: WebSocket = useMemo(() => new WebSocket('ws://localhost:3001'), []);
    const userVideo = useRef<HTMLVideoElement | null>(null);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const roomId: string | null = queryParams.get('roomId');
    const userId: string | null = localStorage.getItem('userId') ? localStorage.getItem('userId') : uuidv4();

    function sendTimer(timer: number){
        ws.send(JSON.stringify({event: "send-timer", data: { timer, roomId}}));
    }

    function toggleCamera(){
        ws.send(JSON.stringify({event: "turn-camera-off", data: { userId, roomId, turnOn: !myVideoOn}}))
        setMyVideoOn(prev => !prev)
    }

    function toggleMic(){
        ws.send(JSON.stringify({event: "turn-mic-off", data: { userId, roomId, turnOn: !myAudioOn}}))
        setMyAudioOn(prev => !prev)
    }

    function startTimer(seconds: number){
        clearInterval(interval);
        let time: number = seconds;
        interval = window.setInterval(() => {
            setTimer(prev => {
                if(seconds){
                    seconds = 0;
                    return time;
                }
                else{
                    time -= 1;
                    return prev - 1;
                }
            })
            if(time === -3){
                clearInterval(interval);
            }
        }, 1000)
    }

    return <>
        <Timer timer= {timer} />
        <Meeting ws = {ws} roomId={roomId} userId = {userId} userVideo={userVideo} myVideoOn={myVideoOn} myAudioOn={myAudioOn} startTimer={startTimer} />
        <Button onClick={toggleCamera} >toggle camera</Button>
        <Button onClick={toggleMic} >toggle mic</Button>
        <Container>
            <Timers timers={timers} sendTimer={sendTimer} />
        </Container>
    </>
}

export default MeetingPage;