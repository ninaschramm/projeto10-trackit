import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export default function History() {

    const { setShowHeader } = useContext(UserContext);

    return (
        <Container>
            {setShowHeader(true)}
            <Title>
                <h1>Histórico</h1>
                Em breve você poderá ver o histórico dos seus hábitos aqui!
            </Title>
        </Container>
    )

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


const Title = styled.div`
    width: 340px;
    height: 94px;
    padding-top: 28px;
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;

    h1 {
        margin-bottom: 18px;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`