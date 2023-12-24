import React, { useEffect, useMemo, useRef, useState } from "react";
import Peer, { Instance as SimplePeerInstance } from 'simple-peer';
import { Paper } from "@mui/material";
import { Peers, SignalData } from "../types/MeetingTypes";
import Video from "../components/Video";

const Meeting: React.FC = (): JSX.Element => {
    const [peers, setPeers] = useState<SimplePeerInstance[]>([]);
    const userVideo = useRef<HTMLVideoElement | null>(null);
    const peersRef = useRef<Peers[]>([]);
    const ws: WebSocket = useMemo(() => new WebSocket('ws://localhost:3001'), []);
    const roomID = "1234";
    const userId: string = window.location.href;

    function getMyStreamAndJoinRoom(ws: WebSocket){
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            if(userVideo.current){
                userVideo.current.srcObject = stream;
            }
            ws.send(JSON.stringify({ event: "join-room", data: { roomId: roomID, userId: userId } }));
        })
    }

    function createPeerConnections(users: string[]){
        const peers: SimplePeerInstance[] = [];
        users.forEach(userToConnect => {
            const peer = createPeer(userToConnect, userId, userVideo.current?.srcObject);
            peersRef.current.push({
                peerID: userToConnect,
                peer,
            })
            peers.push(peer);
        })
        setPeers(peers);
    }

    function createPeerForNewUser(signalData: SignalData){
        const peer = addPeer(signalData.signal, signalData.userId, userVideo.current?.srcObject);
        peersRef.current.push({
            peerID: signalData.userId,
            peer,
        })
        setPeers(users => [...users, peer]);
    }

    function createPeerWithUserInMeeting(signalData: SignalData){
        const item: Peers | undefined = peersRef.current.find(p => p.peerID === signalData.userId);
        item?.peer.signal(signalData.signal);
    }

    function addPeer(incomingSignal: Peer.SignalData, userToConnect: string, stream: any) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            ws.send(JSON.stringify({ event: "send-signal-to-new-user", data: {userToConnect, userId, signal} }));
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function createPeer(userToConnect: string, userId: string, stream: any) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            ws.send(JSON.stringify({ event: "send-signal", data: {userToConnect, userId, signal} }));
        })

        return peer;
    }
    function wsEventHandler(eventData: MessageEvent){
        const eventName: string = JSON.parse(eventData.data).event
        switch(eventName){
            case "get-all-users":
                const users: string[] = JSON.parse(eventData.data).usersInRoom
                createPeerConnections(users);
                break;
            case "new-user-joined":
                const signalData: SignalData = JSON.parse(eventData.data).signalData
                createPeerForNewUser(signalData);
                break;
            case "get-signal-from-users-in-meeting":
                const signalDataFromUserInMeeting: SignalData = JSON.parse(eventData.data).signalData
                createPeerWithUserInMeeting(signalDataFromUserInMeeting);
        }
    }

    useEffect(() => {
        ws.addEventListener('message', wsEventHandler)
        getMyStreamAndJoinRoom(ws)

        return () => {
            ws.removeEventListener("message", wsEventHandler);
        }
    }, []);

    return <>
        <Paper>
            <video playsInline autoPlay ref={userVideo} />
            {
                peers.map((peer, index) => {
                    return (
                        <Video key={index} peer={peer} />
                    );
                })
            }
        </Paper>
    </>
}

export default Meeting;