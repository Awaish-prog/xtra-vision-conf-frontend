export type User = {
    name: string,
    password: string,
    email: string
}
export type UsersToStreamStatus = { 
    [key: string]: { 
        videoOn: boolean, 
        audioOn: boolean
    }
 }