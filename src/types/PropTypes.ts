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
    peer: Peers
}