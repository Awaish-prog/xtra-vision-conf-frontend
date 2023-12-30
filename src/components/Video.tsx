import React, { useEffect, useRef } from "react";
import { VideoProps } from "../types/PropTypes";
import "../styles/MeetingDashboard.css";
import avatar from "../assets/avatar.png"

const Video: React.FC<VideoProps> = ({ peer, hostId, isHostPresent, userIdtoNames }: VideoProps): JSX.Element => {
    const ref = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        peer.peer.on("stream", stream => {
            if(ref.current){
                ref.current.srcObject = stream;
            }
        })
    }, []);

    return (
        <div>
        <video playsInline autoPlay ref={ref} muted = {!peer.audioOn} width = {peer.videoOn ? isHostPresent ? '230vw' : '321vw' : '0px'} style={hostId === peer.peerID ? {
            position: 'absolute',
            width: peer.videoOn ? '47vw' : '0px',
            bottom: '13vh',
            left: '27vw'
        } : {}} />
        <img src={avatar} alt="avatar" style={{
            width: peer.videoOn ? '0px' : hostId === peer.peerID ? '47vw' : isHostPresent ? '18vw' : '25vw',
            border: '1px solid gray',
            position: hostId === peer.peerID ? 'absolute' : 'inherit',
            bottom: hostId === peer.peerID ? '13vh' : 'auto',
            left: hostId === peer.peerID ? '27vw' : 'auto',
            height: hostId === peer.peerID ? '35vw' : isHostPresent ? '13.5vw' : '18.5vw',
        }} />
        <p className="participant-name" style={hostId === peer.peerID ? {
            position: 'absolute',
            textAlign: 'center',
            bottom: '13vh',
            left: '27vw',
            fontSize: 'medium',
            padding: '5px',
        } : {}}>{hostId === peer.peerID ? "Host" : userIdtoNames[peer.peerID]}</p>
        </div>
    );
}

export default Video