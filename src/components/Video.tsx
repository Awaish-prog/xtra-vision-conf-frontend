import React, { useEffect, useRef } from "react";
import { VideoProps } from "../types/PropTypes";

const Video: React.FC<VideoProps> = ({ peer, hostId }: VideoProps): JSX.Element => {
    const ref = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        peer.peer.on("stream", stream => {
            if(ref.current){
                ref.current.srcObject = stream;
            }
        })
    }, []);

    return (
        <video playsInline autoPlay ref={ref} muted = {!peer.audioOn} width = {peer.videoOn ? '35%' : '0px'} />
    );
}

export default Video