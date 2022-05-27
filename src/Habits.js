import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export default function Habits() {

    const [habitsList, setHabitsList] = useState([]);
    const [showHabits, setShowHabits] = useState(false);
    const [newHabit, setNewHabit] = useState(false);
    const [habitName, setHabitName] = useState("");
    const { setShowHeader } = useContext(UserContext);
    const token = localStorage.getItem("locToken")
    const navigate = useNavigate();
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
    promise.then (response => handleHabitList(response.data))
}, [])

    function handleHabitList(data) {
        setHabitsList(data)
        console.log(habitsList)
        if (habitsList) {setShowHabits(true)}
    }

    function handleSelection(target) {
        let index = target.id - 1;
        let newDays = [...days]
        if (newDays[index].status === "notSelected") {newDays[index].status = "selected"}
        else (newDays[index].status = "notSelected")
        setDays(newDays);
    }

    function addHabit() {
        if (!habitName) {return (alert("Coloque um nome pro seu hábito"))}
        
        let habitsArray = [];
        for (let i of days) {
            if (i.status === "selected") {
                habitsArray.push(i.id)
            }
        }
        
        if (habitsArray.length === 0) {return alert("Selecione algum dia para o seu hábito")}

        const habitToPost = {
            name: habitName,
	        days: habitsArray // segunda, quarta e sexta
        }
        
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habitToPost, { headers: headers })
        promise.then(response => posted(response))
        promise.catch(err => console.log(err.response.data.message))
    }

    function posted(response    ) {
        console.log(response)
        setHabitName("")
        setNewHabit(false)
        const newDays = [...days]
        for (let i of newDays) {
            i.status = "notSelected"
        }
        setDays(newDays)
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, {headers});
        promise.then (response => handleHabitList(response.data))
    }

    function deleteHabit(id) {
        console.log(id)
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {headers});
        promise.then(() => {const inPromise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, {headers});
        inPromise.then (response => handleHabitList(response.data))});
        promise.catch(err => console.log(err))
    }

    return (
        <Container >
            {setShowHeader(true)}
            <MyHabits> Meus hábitos <button onClick={() => setNewHabit(!newHabit)}>+</button></MyHabits>
            { newHabit ? <NewHabit><input placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}></input>
            <Days> 
                {days.map(day => <Day id={day.id} color={`${day.status}`} onClick={(it) => handleSelection(it.target)}>{day.title}</Day> )}
            </Days>
            <Checkout><span onClick={() => setNewHabit(false)}>Cancelar</span>
            <button onClick={() => addHabit()}>Salvar</button></Checkout></NewHabit> : "" }
            { showHabits ? 
            <div>{habitsList.map(habit => <Habit><span>{habit.name}</span> <ion-icon name="trash-outline" id={habit.id} onClick={(e) => {deleteHabit(e.target.id)}} ></ion-icon>
            <Days> 
                {days.map(day => <DayTrack color={`${habit.days.includes(day.id)}`} >{day.title}</DayTrack> )}
            </Days>
            </Habit>)}</div>
            : <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits> }
        </Container >
    )
    
}

const handleColor = color => {
    switch (color) {
        case "selected":
         return "#FFFFFF";
        case "true":
            return "#FFFFFF";
        case "notSelected":
         return "#DBDBDB";
        case "false":
            return "#DBDBDB";
    }
  };

  const handleBGColor = color => {
      switch (color) {
        case "selected":
            return "#CFCFCF";
        case "notSelected":
            return "#FFFFFF";
        case "true":
            return "#CFCFCF";
        case "false":
            return "#FFFFFF";
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
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
`

const MyHabits = styled.div` 
    width: 340px;
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
        width: 340px;
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

        button {
            height: 35px;
            width: auto;
            padding: 7px 17px;
            border-radius: 4.63636px;
            display: flex;
            background: #52B6FF;
            color: #FFFFFF;
            border: 1px solid #52B6FF;
            font-size: 15.976px;
            margin-left: 23px;
        }

        button:hover {
            filter: brightness(115%);
            cursor: pointer;
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
            padding-left: 10px;

            ::placeholder {
                color: #DBDBDB;
            }
        
}
`

const Days = styled.div`
    display: flex;
    margin: 8px 0 15px;
    width: 303px;
    gap: 4px;
    `

const Day = styled.div`
    width: 30px !important;
    height: 30px;
    background: ${({ color }) => handleBGColor(color)};
    color: ${({ color }) => handleColor(color)};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center !important;
    align-items: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;

    :hover {
            filter: brightness(90%);
            cursor: pointer;
            }

    `

const DayTrack = styled.div`
    width: 30px !important;
    height: 30px;
    background: ${({ color }) => handleBGColor(color)};
    color: ${({ color }) => handleColor(color)};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center !important;
    align-items: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px; `

const Checkout = styled.div`
    width: 303px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
        font-size: 15.976px;
        line-height: 20px;
        color: #52B6FF;
        cursor: pointer;
    }
    `

const Habit = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    color: black;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    padding: 13px 15px;
    margin-bottom: 10px;
    position: relative;

        ion-icon {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    `