import React from "react"
import { Meeting, Peers } from "./MeetingTypes"

export type MeetingOptionProps = {
    icon: React.ElementType,
    iconText: string,
}

export type MeetingCardProps = {
    meeting: Meeting
}

export type VideoProps = {
    peer: Peers,
    hostId: string,
    isHostPresent: boolean
}

export type VideosProps = {
    userVideo: any,
    peers: Peers[]
}

export type TimerProps = {
    timers: number[],
    sendTimer: { (timer: number): void }
}

export type MeeetingProps = {
    ws: WebSocket,
    roomId: string | null,
    userId: string | null,
    userVideo: any,
    myVideoOn: boolean,
    myAudioOn: boolean,
    hostId: string,
    startTimer: { (timer: number): void }
}