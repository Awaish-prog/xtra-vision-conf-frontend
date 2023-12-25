import Peer, { Instance as SimplePeerInstance } from 'simple-peer';

export type Meeting = {
    id: number,
    title: string,
    host: string,
    dateTime: string
}

export type Peers = {
    peerID: string,
    peer: SimplePeerInstance,
    connected: boolean,
    videoOn: boolean,
    audioOn: boolean
}

export type SignalData = {
    userToConnect: string,
    userId: string,
    signal: Peer.SignalData
}