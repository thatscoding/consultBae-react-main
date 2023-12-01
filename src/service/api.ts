import axios from 'axios'
import { EventTypeProps } from '../types/EventTypes'


export const CreateEvent = async (data: EventTypeProps) => {
    try {
        return await axios.post("http://localhost:3000/event", data)
    } catch (error) {
        console.log(error)
    }
}

export const AllEvents = async () => {
    try {
        return await axios.get("http://localhost:3000/event");
    } catch (error) {
        console.log(error)
    }
}