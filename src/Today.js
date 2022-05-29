import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import checkMark from "./img/Vector.png"


export default function Today() {


    const { setShowHeader } = useContext(UserContext);
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const d = new Date();
    let day = `${weekDays[d.getDay()]} ${d.getDate()}/${d.getMonth()}`;
    const token = localStorage.getItem("locToken");
    const [todayList, setTodayList] = useState([]);
    const [status, setStatus] = useState(false);

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

function handleCheckList() {
    setStatus("true")
    const newList = [...todayList]
    setTodayList(newList)
}

function checkHabit(target) {
    console.log(target)
    let id = target.id
    const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, { }, {headers: headers});
    promise.then(handleCheckList());
}

function calcHabits(){
    let den = todayList.length;
    let num = 0;
    for (let i of todayList) {
        if (i.done == true) {num += 1}
    }
    return (num/den)
}

    return (
        <Container>
            {setShowHeader(true)}
            <Title>
               <h1>{day}</h1> 
               {calcHabits() ? "{calcHabits}" : "Nenhum hábito concluído hoje"}
              
            </Title>
          {todayList.map(habit => <Habit>   <div><h1>{habit.name}</h1> <br></br>
                Sequência atual: 3 dias <br></br>
                Seu recorde: 5 dias</div>
                <Check color={status ? "true" : `${habit.done}`} id={habit.id} onClick={(e) => {checkHabit(e.currentTarget)}} ><img src={checkMark} alt="check" /></Check>
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

    ion-icon {
        font-size: 50px;
        color: #FFFFFF;
    }
    `

    const Title = styled.div`
    width: 340px;
    height: 94px;
    padding-top: 28px;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
    
    h1 {
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    `