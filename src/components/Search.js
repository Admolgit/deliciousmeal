import {CgSearch} from "react-icons/cg";
import styled from "styled-components";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Search() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const inputHandler = (e) => {
        setInput(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/searched/${input}`);
    }

    return (
        <Formstyle onSubmit={submitHandler}>
            <CgSearch/>
            <input type={'text'} placeholder={'Enter anything!'} value={input} onChange={inputHandler}/>
        </Formstyle>
    )
}

const Formstyle = styled.form`
        margin: 3rem auto;
        position: relative;
        width: 90%;
        
        input{
            border: none;
            background: linear-gradient(35deg, silver, lightgrey);
            outline: none;
            border-radius: 1rem;
            width: 100%;
            padding: 2rem;
            color: black;
            font-size: 1.2em;
            
        }
        
        svg{
            position: absolute;
            top: 30%;
            right: 20px;
            color: black;
            font-size: 2em;
        }
    `