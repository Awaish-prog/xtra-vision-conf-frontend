import React, { useEffect, useRef } from "react";
import { VideoProps } from "../types/PropTypes";
import "../styles/MeetingDashboard.css";

const Video: React.FC<VideoProps> = ({ peer, hostId, isHostPresent }: VideoProps): JSX.Element => {
    const ref = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        peer.peer.on("stream", stream => {
            if(ref.current){
                ref.current.srcObject = stream;
            }
        })
    }, []);

    return (
        <>
        <video playsInline autoPlay ref={ref} muted = {!peer.audioOn} width = {peer.videoOn ? isHostPresent ? '70%' : '35%' : '0px'} style={hostId === peer.peerID ? {
            position: 'absolute',
            width: '47vw',
            top: '30px',
            left: '27vw'
        } : {}} />
        <p className="participant-name" style={hostId === peer.peerID ? {
            position: 'absolute',
            textAlign: 'center',
            top: '34vw',
            left: '28vw',
            fontSize: 'medium',
            padding: '5px'
        } : {}}>Name</p>
        </>
    );
}

export default Video