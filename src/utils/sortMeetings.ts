import { Meeting } from "../types/MeetingTypes";

export function sortMeetingAsc(meetings: Meeting[]){
    meetings.sort((a, b) => {
        const dateA = new Date(a.dateTime).getTime();
        const dateB = new Date(b.dateTime).getTime();
      
        return dateA - dateB;
    });
    return meetings;
}

export function sortMeetingDsc(meetings: Meeting[]){
    meetings.sort((a, b) => {
        const dateA = new Date(a.dateTime).getTime();
        const dateB = new Date(b.dateTime).getTime();
      
        return dateB - dateA;
    });
    return meetings;
}