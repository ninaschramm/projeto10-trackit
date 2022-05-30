import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer( ) {

    const { showHeader, pic, percent } = useContext(UserContext);
    
    return (
        <>{ showHeader ? <Menu>
            <Link to="/hoje"><Hoje> 
                <CircularProgressbar 
                value={percent} text={"Hoje"} 
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#52B6FF",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent"
                })}
                /></Hoje></Link>
            <ContDiv><Link to="/habitos">Hábitos</Link> <Link to="/historico">Histórico</Link></ContDiv>
            
        </Menu> : ""}</>
    )
}

const Menu = styled.div` 
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100%;
    max-width: 390px;
    height: 70px;
    background: #FFFFFF;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52B6FF;

    a {
        text-decoration: none;
        color: #52B6FF;
    }
`

const Hoje = styled.div` 
width: 90px;
height: 90px;
position: absolute;
background: #52B6FF;
border-radius: 90px;
bottom: 10px;
left: 40%;
display: flex;
align-items: center;
justify-content: center;
color: #FFFFFF;
`

const ContDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 35px;
    `