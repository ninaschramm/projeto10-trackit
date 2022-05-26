import { useState, useContext } from "react";
import logo from "./img/logo-grande.png"
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();
    const { pic, setPic } = useContext(UserContext);

    function registerUser (event) {
        event.preventDefault();
        setIsDisabled(true)

        const user = {
            email: `${email}`,
            name: `${name}`,
            image: `${pic}`,
            password: `${password}`
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", user)
        promise.then(() => navigate('/'), {email: `${email}`,
        name: `${name}`,})
        promise.catch(err => treatError(err))
    }

    function treatError(err) {
        alert(`${err.response.data.message} Tente novamente!`)
        setIsDisabled(false)
    }


    return (
        <Container>
            <img src={logo} alt="TrackIt" />
            <Form>
                <form action="#" onSubmit={registerUser}>            
                    <input disabled={isDisabled} type="email" id="emailInput" placeholder='email' value={email} required onChange={(e) => setEmail(e.target.value)} />              
                    <input disabled={isDisabled} type="password" id="passInput" placeholder='senha' value={password} required onChange={(e) => setPassword(e.target.value)} />  
                    <input disabled={isDisabled} type="text" id="nameInput" placeholder='nome' value={name} required onChange={(e) => setName(e.target.value)} />  
                    <input disabled={isDisabled} type="text" id="CPF" placeholder='foto' value={pic} required onChange={(e) => setPic(e.target.value)} />  
                    <button disabled={isDisabled} type="submit">Cadastrar</button>
                </form>
            </Form>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </Container>
    )
}

const Container = styled.div` 
    display: flex;
    flex-direction: column;   
    align-items: center;
    width: 100%;
    max-width: 390px;
    height: 100vh;

    img {
        margin-top: 70px;
    }

    a {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
    
`

const Form = styled.div` 

    margin: 30px 0 25px;

    form {
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;

        input {

            box-sizing: border-box;
            padding: 0 10px;
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

        

        button {
            width: 303px;
            height: 45px;
            background: #52B6FF;
            border-radius: 4.63636px;
            border: solid 1px #52B6FF;            
            font-size: 20.976px;
            line-height: 26px;  
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: center;
            color: #FFFFFF;
        }

        button:hover:enabled {
            filter: brightness(115%);
            cursor: pointer;
            }
    }
`