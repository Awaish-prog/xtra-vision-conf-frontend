import axios from "axios";
import apiUrl from "./Apiurl";
import { Dayjs } from "dayjs";

async function createNewMeetingApi(title: string, dateTime: Dayjs | null){
    const hostId: string | null = localStorage.getItem('userId');
    const token: string | null = localStorage.getItem('token');
    const email: string | null = localStorage.getItem('email');
    const response = axios.post(`${apiUrl}create-meeting`, {
        title,
        dateTime,
        hostId
    },
    {
        headers: {
          Authentication: token,
          email: email
        }
    })
    return response;
}

async function getMeetingsListApi(){
    const hostId: string | null = localStorage.getItem('userId');
    const token: string | null = localStorage.getItem('token');
    const email: string | null = localStorage.getItem('email');
    const response = axios.get(`${apiUrl}get-meetings/${hostId}`, {
        headers: {
            Authentication: token,
            email: email
        }
    })
    return response
}

async function getHostIdApi(roomId: string | null){
    const response = axios.post(`${apiUrl}get-host-id`, {
        roomId
    })
    return response; 
}

export { createNewMeetingApi, getMeetingsListApi, getHostIdApi };