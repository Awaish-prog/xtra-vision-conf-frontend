import React, { useEffect, useRef } from "react";
import { VideoProps } from "../types/PropTypes";

const Video: React.FC<VideoProps> = ({ peer }: VideoProps): JSX.Element => {
    const ref = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        peer.on("stream", stream => {
            if(ref.current)
                ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video playsInline autoPlay ref={ref} />
    );
}

export default Video