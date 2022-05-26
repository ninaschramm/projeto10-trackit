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
    const [days, setDays] = useState([
        {title: "D",
        id: 1,
        status: "notSelected",},
        {title: "S",
        id: 2,
        status: "notSelected",},
        {title: "T",
        id: 3,
        status: "notSelected",},
        {title: "Q",
        id: 4,
        status: "notSelected",},
        {title: "Q",
        id: 5,
        status: "notSelected",},
        {title: "S",
        id: 6,
        status: "notSelected",},
        {title: "S",
        id: 7,
        status: "notSelected",},
    ])

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
            <MyHabits> Meus hábitos <button onClick={() => setNewHabit(!newHabit)}>+</button></MyHabits>
            { newHabit ? <NewHabit><input placeholder="nome do hábito"></input>
            <div> <Day id="1">D</Day> <Day id="2">S</Day> <Day id="3">T</Day> <Day id="4">Q</Day> <Day id="5">Q</Day> <Day id="6">S</Day> <Day id="7">S</Day> </div>
            <div><button style={{borderColor: "#FFFFFF"}} onClick={() => setNewHabit(false)}>Cancelar</button><button style={{backgroundColor: "#33475b", color: "#FFFFFF"}}>Salvar</button></div></NewHabit> : "" }
            { showHabits ? "LISTA" : <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits> }
        </Container >
    )
    
}

const handleColor = color => {
    switch (color) {
      case "selected":
        return "#8DD7CF";
      case "not-available":
        return "#FBE192";
      default:
        return "#C3CFD9";
    }
  };

  const handleBGColor = color => {
      switch (color) {

      }
  }

const Container = styled.div` 
    display: flex;
    flex-direction: column;   
    align-items: center;
    width: 100%;
    max-width: 390px;
    height: calc(100vh - 140px);
    overflow-y: scroll;
    margin: 70px 0;
    background-color: #E5E5E5;
`

const MyHabits = styled.div` 
    width: 100%;
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
        vertical-align: middle;
        color: #FFFFFF;
        padding-bottom: 5px;
    }

    button:hover {
            filter: brightness(115%);
            cursor: pointer;
            }
`
const NoHabits = styled.div` 
        font-family: 'Lexend Deca';
        padding: 0 18px;
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
`

const NewHabit = styled.div` 
        width: 340px;
        height: 180px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 29px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 18px;

        div {
                    display: flex;
                    margin: 8px 0 15px;
                }

        button {
            height: 35px;
            width: auto;
            padding: 7px 17px;
            border-radius: 4.63636px;
        }

        input {
            width: 303px;
            height: 45px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-size: 19.976px;
            line-height: 25px;
            color: #666666;

            ::placeholder {
                color: #DBDBDB;
            }
        
}
`

const Day = styled.div`
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
            `