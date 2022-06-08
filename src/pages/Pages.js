import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import Category from "../components/Category";
import Cuisine from "./Cuisine";
import Fetched from "./Fetched";
import { GiKnifeFork } from "react-icons/gi";
import Home from "./Home";
import Recipe from "./Recipe";
import Search from "../components/Search";
import styled from "styled-components";

export default function Pages() {
    // const location = useLocation();

    return (
        <BrowserRouter>
            <NavDiv>
                <GiKnifeFork />
                <Logo to={'.'}>Deliciouss</Logo>
            </NavDiv>
            <Category />
            <Search />
            <AnimatePresence exitBeforeEnter>
                {/* <Routes location={location} key={location.path}> */}
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/cuisine/:type'} element={<Cuisine />} />
                    <Route path={'/searched/:search'} element={<Fetched />} />
                    <Route path={'/recipe'} element={<Recipe />} />
                </Routes>
            </AnimatePresence>
        </BrowserRouter>
    )
}

const Logo = styled(Link)`
    text-decoration: none;
    font-size: 1.5rem;
    font-family: 'poppins';
    font-weight: 500;
    color: dodgerblue;
`

const NavDiv = styled.div`
    padding: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg{
        font-size: 2rem;
    }

`