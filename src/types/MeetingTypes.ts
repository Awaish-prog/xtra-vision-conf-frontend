import Peer, { Instance as SimplePeerInstance } from 'simple-peer';

export type Meeting = {
    id: number,
    title: string,
    hostId: string,
    dateTime: string,
    _id?: any
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