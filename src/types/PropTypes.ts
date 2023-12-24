import React from "react"
import { Meeting } from "./MeetingTypes"

export type MeetingOptionProps = {
    icon: React.ElementType,
    iconText: string,
}

export type MeetingCardProps = {
    meeting: Meeting
}