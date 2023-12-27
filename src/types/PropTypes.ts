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
    isHostPresent: boolean,
    userIdtoNames: { [key: string]: string }
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
    userIdsToNames: {[key: string]: string},
    setUserIdsToNames: Function,
    roomFull: { (): void },
    raiseHandHandler: { (userIdRaisedHand: string): void },
    putDownHandler: { (userIdPutDown: string): void },
    startTimer: { (timer: number): void }
}