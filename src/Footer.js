import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import styled from "styled-components";

export default function Footer( ) {

    const { showHeader, pic } = useContext(UserContext);
    
    return (
        <>{ showHeader ? <Menu></Menu> : ""}</>
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
    border: 1px solid black;
`