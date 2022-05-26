import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import styled from "styled-components";

export default function Header( ) {

    const { showHeader, pic } = useContext(UserContext);
    
    return ( 
            <>{ showHeader ? <HeaderDiv><span>Track It</span> <img src={pic} alt="" /></HeaderDiv>  : ""}</>
        )
    }
    
    const HeaderDiv = styled.div`
        width: 100%;
        max-width: 390px;
        height: 70px;
        position: fixed;
        z-index: 1;
        padding: 0 18px;
        top: 0px;
        background: #126BA5;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            font-family: 'Playball';
            font-style: normal;
            font-weight: 400;
            font-size: 38.982px;
            line-height: 49px;
            color: #FFFFFF;
        }

        img {
            width: 51px;
            height: 51px;
            border-radius: 98.5px;
            z-index: 2;
        }
    ` 