import React from "react"
import { Meeting } from "./MeetingTypes"
import { Instance as SimplePeerInstance } from 'simple-peer';

export type MeetingOptionProps = {
    icon: React.ElementType,
    iconText: string,
}

export type MeetingCardProps = {
    meeting: Meeting
}

export type VideoProps = {
    peer: SimplePeerInstance
}