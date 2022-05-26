import axios from "axios";
import { useEffect, useState } from "react";

export default function Habits( {token} ) {

    const [habitsList, setHabitsList] = useState([])
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    useEffect(() => {const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, {headers});
    promise.then (response => setHabitsList(response.data))

    console.log(habitsList)
}, [])
    
}