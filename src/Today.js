import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import checkMark from "./img/Vector.png"


export default function Today() {


    const { setShowHeader, percent, setPercent } = useContext(UserContext);
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const d = new Date();
    let day = `${weekDays[d.getDay()]}, ${d.getDate()}/0${d.getMonth()}`;
    const token = localStorage.getItem("locToken");
    const [todayList, setTodayList] = useState([]);


    const headers = {
        Authorization: `Bearer ${token}`,
    }

    const body = { };
    

    useEffect(() => {const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, {headers});
    promise.then (response => handleList(response))
}, [])

function handleList(response) {
    setTodayList(response.data)
    console.log(response.data)
}

function reload() {
    const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, {headers});
    promise.then (response => handleList(response))
}

function checkHabit(target) {
    let id = target.id
    if (target.classList.contains("false")) {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, { }, {headers: headers});
        promise.then(setTimeout(reload, 200));
    }
    else {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, { }, {headers: headers});
        promise.then(setTimeout(reload, 200));
    }   
    
}

useEffect (() => {let den = todayList.length;
    let num = 0;
    for (let i of todayList) {
        if (i.done == true) {num += 1}
    }
    let n = num/den * 100;
    let fixed = n.toFixed(0);
    setPercent(`${fixed}`)})


    return (
        <Container>
            {setShowHeader(true)}
            <Title>
               <h1>{day}</h1> 
               {percent != "0" ? <div  style={{color: "#8FC549"}}>{percent}% dos hábitos concluídos</div> : <div style={{color: "#BABABA"}}>Nenhum hábito concluído hoje</div> }
              
            </Title>
          {todayList.map((habit, value) => <Habit key={value}>   <div><h1>{habit.name}</h1> <br></br>
                Sequência atual: <span style={{color: habit.done ? "#8FC549" : "#666666"}}>{habit.currentSequence} {habit.currentSequence === 1 ? "dia" : "dias"}</span><br></br>
                Seu recorde: <span style={{color: habit.currentSequence == habit.highestSequence ? "#8FC549" : "#666666"}} >{habit.highestSequence} {habit.highestSequence === 1 ? "dia" : "dias"}</span></div>
                <Check color={`${habit.done}`} className={`${habit.done}`} id={habit.id} onClick={(e) => {checkHabit(e.currentTarget)}} ><img src={checkMark} alt="check" /></Check>
            </Habit>)}
            
        </Container>
        
    )

}
const handleColor = color => {
    switch (color) {
        case "true":
         return "#8FC549";        
        case "false":
            return "#EBEBEB";
        case "zero":
            return "#BABABA";
    }
  };

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

const Habit = styled.div`
    width: 340px;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
    color: black;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    padding: 13px 15px;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    justify-content: space-between;

    h1 {
        font-size: 19.976px;
    }
    `

    const Check = styled.div` 
    width: 69px;
    height: 69px;
    left: 276px;
    top: 190px;
    background: ${({ color }) => handleColor(color)};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    `

    const Title = styled.div`
    width: 340px;
    height: 94px;
    padding-top: 28px;
    margin-bottom: 25px;
    font-size: 17.976px;
    line-height: 22px;
    color: ${({ color }) => handleColor(color)};
    
    h1 {
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    `