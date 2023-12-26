import axios from "axios";
import apiUrl from "./Apiurl";
import { Dayjs } from "dayjs";

async function createNewMeetingApi(title: string, dateTime: Dayjs | null){
    const hostId: string | null = localStorage.getItem('userId');
    const response = axios.post(`${apiUrl}create-meeting`, {
        title,
        dateTime,
        hostId
    })
    return response;
}

async function getMeetingsListApi(){
    const hostId: string | null = localStorage.getItem('userId');
    const response = axios.get(`${apiUrl}get-meetings/${hostId}`)
    return response
}

export { createNewMeetingApi, getMeetingsListApi };