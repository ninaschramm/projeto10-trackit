import axios from "axios";
import { useState } from "react";

export default function Habits() {

    const [habitsList, setHabitsList] = useState([])

    const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`);
    promise.then (response => setHabitsList(response.data))

    console.log(habitsList)

}