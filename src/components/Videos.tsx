import { Container } from "@mui/material";
import React from "react";
import { VideosProps } from "../types/PropTypes";
import Video from "./Video";

const Videos: React.FC<VideosProps> = ({ userVideo, peers }: VideosProps): JSX.Element => {
    return <Container>
        <video playsInline autoPlay ref={userVideo} />
        {
            peers.map((peer, index) => {
                return (
                    peer.connected && <Video key={index} peer={peer} />
                );
            })
        }
    </Container>
}

export default Videos;