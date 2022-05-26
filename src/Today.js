import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";


export default function Today() {


    const { token, setShowHeader } = useContext(UserContext);

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    useEffect(() => {const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, {headers});
    promise.then (response => console.log(response.data))

    // console.log(habitsList)
    // if (habitsList.length !== 0) {setShowHabits(true)}
}, [])


}