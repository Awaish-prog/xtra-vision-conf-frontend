import React, { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
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
import notification from "../assets/notification.wav"
import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import BackHandIcon from '@mui/icons-material/BackHand';
import { checkEmptyInput } from "../utils/InputValidation";

const MeetingPage: React.FC = (): JSX.Element => {
    const [ myVideoOn, setMyVideoOn ] = useState<boolean>(true);
    const [ myAudioOn, setMyAudioOn ] = useState<boolean>(true);
    const [ userNameEntered, setUserNameEntered ] = useState<boolean>(false);
    const [ userName, setUserName ] = useState<string>("");
    const [ hostId, setHostId ] = useState<string>("");
    const [ userErrorMessage, setUserErrorMessage ] = useState<string>("");
    const [ userError, setUserError ] = useState<boolean>(false);
    const [ loader, setLoader ] = useState(true);
    const [ loaderForm, setLoaderForm ] = useState(false);
    const [ isRoomFull, setIsRoomFull ] = useState<boolean>(false);
    const [ handRaised, setHandRaised ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ raisedHands, setRaisedHands ] = useState<string[]>([]);
    const [ userIdsToNames, setUserIdsToNames ] = useState<{ [key: string]: string }>({});
    const [ timer, setTimer ] = useState<number>(-3)
    const [ wsMeeting, setWsMeeting ] = useState<WebSocket>();
    const timers: number[] = [15, 30, 45, 60]
    const ws: WebSocket = useMemo(() => new WebSocket('wss://awaish-khan-dev.mooo.com/web-socket/'), []);
    const userVideo = useRef<HTMLVideoElement | null>(null);
    const { search } = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(search);
    const roomId: string | null = queryParams.get('roomId');
    const userId: string | null = useMemo(() => localStorage.getItem('userId') ? localStorage.getItem('userId') : uuidv4(), []);
    let interval: number = useMemo(() => 0, []);
    

    function sendTimer(timer: number){
        wsMeeting?.send(JSON.stringify({event: "send-timer", data: { timer, roomId}}));
    }

    function toggleCamera(){
        wsMeeting?.send(JSON.stringify({event: "turn-camera-off", data: { userId, roomId, turnOn: !myVideoOn}}))
        setMyVideoOn(prev => !prev)
    }

    function toggleMic(){
        wsMeeting?.send(JSON.stringify({event: "turn-mic-off", data: { userId, roomId, turnOn: !myAudioOn}}))
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

    function checkUserName(): boolean {
        return checkEmptyInput(userName, setUserError, setUserErrorMessage, "User Name");
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

    function getUserNameStatus(userIdFromServer: string){
        if(userIdFromServer === userId){
            setUserNameEntered(true);
        }
        else{
            setErrorMessage("Error occured while joining meeting")
        }
        setLoaderForm(false);
    }

    function handleMessage(eventData: MessageEvent){
        const eventName: string = JSON.parse(eventData.data).event
        if(eventName === "get-user-name"){
            getUserNameStatus(JSON.parse(eventData.data).userId)
        }
    }

    function sendUsername(e: SyntheticEvent){
        e.preventDefault();
        setLoaderForm(true);
        if(checkUserName()){
            ws.send(JSON.stringify({event: "enter-name", data: {userName, userId}}));
        }
    }

    function roomFull(){
        setIsRoomFull(true);
    }

    function raiseHandHandler(userIdRaisedHand: string){
        if(!raisedHands.find(userInList => userIdRaisedHand === userInList)){
            setRaisedHands(prev => [...prev, userIdRaisedHand]);
        }
    }

    function putDownHandler(userIdPutDown: string){
        setRaisedHands(prev => prev.filter(user => user !== userIdPutDown));
    }

    function raiseHand(){
        if(handRaised){
            wsMeeting?.send(JSON.stringify({event: "put-down", data: { userId, hostId }}));
        }
        else{
            wsMeeting?.send(JSON.stringify({event: "raise-hand", data: { userId, hostId }}));
        }
        setHandRaised(prev => !prev)
    }

    useEffect(() => {
        if(timer === 0){
            new Audio(notification).play();
        }
    }, [timer])

    useEffect(() => {
        ws.addEventListener('message', handleMessage);
        getHostId();
        return () => {
            localStorage.setItem('refresh', 'true');
            ws.removeEventListener("message", handleMessage);
        }
    }, [])

    return <>
        {   
            isRoomFull?
            <h1>This room is full</h1>
            :
            loader ?
            <div className="loader">
                <CircularProgress size={90} color='info' />
            </div>
            :
            (hostId !== userId && !userNameEntered)
            ?
            <Paper className="form-container" component="form" elevation={5} onSubmit={sendUsername} >
            <h1 className="heading">Enter Name</h1>
            <TextField className="inputs" id="userName" label="Name" variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} error={userError} helperText={userErrorMessage} onBlur={checkUserName} />

            {errorMessage && <p className="error-message error-message-margin">{errorMessage}</p>}
            
            <Button variant="contained" size="large" type="submit">{loaderForm ? <CircularProgress size={30} color='secondary' /> : "Join Meeting"}</Button>
            </Paper>
            :
            <div className="conf-container">
            <Timer timer= {timer} />
            
            <Meeting roomId={roomId} userId = {userId} userVideo={userVideo} myVideoOn={myVideoOn} myAudioOn={myAudioOn} hostId={hostId} startTimer={startTimer} roomFull={roomFull} raiseHandHandler={raiseHandHandler} putDownHandler={putDownHandler} userIdsToNames={userIdsToNames} setUserIdsToNames={setUserIdsToNames} setWsMeeting={setWsMeeting} />

            {hostId === userId && <div className="actions-container">
                <h3>Notifications</h3>
                <div className="actions">
                {
                    raisedHands && raisedHands.length ?
                    raisedHands.map((raisedHand) => {
                        return userIdsToNames[raisedHand] && <p key={raisedHand}>{userIdsToNames[raisedHand]} has raised hand</p>
                    })
                    :
                    <p>No notifications yet</p>
                }
                </div>
            </div>}
            
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
            <div className="meeting-button margin-right" onClick={endCall}>
                <CallEndIcon />
            </div>
            {hostId === userId && <p style={{margin: '0px'}}>Countdown timers: </p>}
            {hostId === userId && <Timers timers={timers} sendTimer={sendTimer} />}
            {hostId !== userId && <div className={handRaised ? "meeting-button" : "raise-hand"} onClick={raiseHand}><BackHandIcon /></div>}
            </div>
            </div>
            </div>
        }
        
    </>
}

export default MeetingPage;