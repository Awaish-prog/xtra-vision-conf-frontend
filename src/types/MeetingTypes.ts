import Peer, { Instance as SimplePeerInstance } from 'simple-peer';

export type Meeting = {
    id: number,
    title: string,
    host: string,
    dateTime: string
}

export type Peers = {
    peerID: string,
    peer: SimplePeerInstance
}

export type SignalData = {
    userToConnect: string,
    userId: string,
    signal: Peer.SignalData
}