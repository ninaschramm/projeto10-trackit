import { useState, useContext, useEffect } from "react";
import logo from "./img/logo-grande.png"
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export default function Habits() {

    const [habitsList, setHabitsList] = useState([])
    const [showHabits, setShowHabits] = useState(false)
    const [newHabit, setNewHabit] = useState(false)
    const { token, setShowHeader } = useContext(UserContext);

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    useEffect(() => {const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, {headers});
    promise.then (response => setHabitsList(response.data))

    console.log(habitsList)
    if (habitsList.length !== 0) {setShowHabits(true)}
}, [])

    return (
        <Container >
            {setShowHeader(true)}
            <MyHabits> Meus hábitos <button onClick={() => setNewHabit(true)}>+</button></MyHabits>
            { newHabit ? "Adicionar novo hábito" : "" }
            { showHabits ? "LISTA" : <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits> }
        </Container >
    )
    
}

const Container = styled.div` 
    display: flex;
    flex-direction: column;   
    align-items: center;
    width: 100%;
    max-width: 390px;
    height: 100vh;
    overflow-y: scroll;
    margin: 70px 0;
`

const MyHabits = styled.div` 
    width: 100%;
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    color: #126BA5;

    button {
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: 1px solid #52B6FF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        text-align: center;
        vertical-align: middle;
        color: #FFFFFF;
    }
`
const NoHabits = styled.div` 

`