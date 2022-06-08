import {FaPizzaSlice} from "react-icons/fa";
import {GiChopsticks, GiRank3} from "react-icons/gi";
import {IoFastFood} from "react-icons/io5";
import {NavLink} from "react-router-dom";
import styled from "styled-components";


const List = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 2rem 0rem;
`

const SLink = styled(NavLink)`
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    height: 6rem;
    width: 6rem;
    background: grey;
    padding-top: 1.1rem;
    border-radius: 50%;
    color: white;
    font-size: 30px;
    transition: 0.3s ease all;
    
    h4{
        color: white;
        font-size: 14px;
    }
    &.active{
        background: black;
    }
    &:hover{
        background: dodgerblue;
    }
`

export default function Category(){
    return (
        <List>
            <SLink to={'/cuisine/Italian'}>
                <FaPizzaSlice/>
                <h4>Italian</h4>
            </SLink>
            <SLink to={'/cuisine/African'}>
                <GiRank3/>
                <h4>African</h4>
            </SLink>
            <SLink to={'/cuisine/Chinese'}>
                <GiChopsticks/>
                <h4>Chinese</h4>
            </SLink>
            <SLink to={'/cuisine/Mexican'}>
                <IoFastFood/>
                <h4>Mexican</h4>
            </SLink>
        </List>
    )
}