import React, { useEffect, useMemo, useRef, useState } from "react";
import Meeting from "../components/Meeting";
import Timers from "../components/Timers";
import Timer from "../components/Timer";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getHostIdApi } from "../apis/MeetingApis";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import "../styles/MeetingDashboard.css";

const MeetingPage: React.FC = (): JSX.Element => {
    const [ myVideoOn, setMyVideoOn ] = useState<boolean>(true);
    const [ myAudioOn, setMyAudioOn ] = useState<boolean>(true);
    const [ hostId, setHostId ] = useState<string>("");
    const [ loader, setLoader ] = useState(true);
    const timers: number[] = [15, 30, 45, 60]
    const [ timer, setTimer ] = useState<number>(-3)
    let interval: number = useMemo(() => 0, [])
    const ws: WebSocket = useMemo(() => new WebSocket('ws://localhost:3001'), []);
    const userVideo = useRef<HTMLVideoElement | null>(null);
    const { search } = useLocation();
    const navigate = useNavigate();
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

    function endCall(){
        navigate(-1);
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

    async function getHostId(){
        const response = await getHostIdApi(roomId);
        if(response.data.status === 200 && response.data.hostId){
            setHostId(response.data.hostId);
        }
        else{
            navigate(-1);
        }
        setLoader(false);
    }

    useEffect(() => {
        getHostId()
    }, [])

    return <>
        {
            loader ?
            <h1>Loading...</h1>
            :
            <div className="conf-container">
            <Timer timer= {timer} />
            
            <Meeting ws = {ws} roomId={roomId} userId = {userId} userVideo={userVideo} myVideoOn={myVideoOn} myAudioOn={myAudioOn} hostId={hostId} startTimer={startTimer} />
            
            <div className="meeting-buttons-container">
            <div className="meeting-buttons">
            <div className="meeting-button" onClick={toggleCamera} >
                {
                    myVideoOn ?
                    <VideocamIcon />
                    :
                    <VideocamOffIcon />
                }
                
            </div>
            <div className="meeting-button" onClick={toggleMic} >
                {
                    myAudioOn ?
                    <MicIcon />
                    :
                    <MicOffIcon />
                }
                
            </div>
            <div className="meeting-button" onClick={endCall}>
                <CallEndIcon />
            </div>
            <p>Countdown timers: </p>
            <Timers timers={timers} sendTimer={sendTimer} />
            </div>
            </div>
            </div>
        }
        
    </>
}

export default MeetingPage;