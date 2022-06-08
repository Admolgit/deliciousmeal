import { motion } from "framer-motion";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

const Grid = styled(motion.div)`
        display: Grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        grid-gap: 3rem;
    `;

const Card = styled.div`
        img{
            width: 100%;
            border-radius: 2rem;
        }
        a {
            text-decoration: none;
        }
        h4{
            text-align: center;
            padding: 1rem;
        }
    `;

export default function Cuisine() {
    // Use params allow us to fetch parameter from the url

    const [cuisine, setCuisine] = useState([]);
    const navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        getCuisine(params.type);
    }, [params.type]); // Use effect would mount when there's a change in Params

    const navigateTo = (ev) => {
        let idd = ev.target.nextElementSibling.getAttribute('info');
        // localStorage.setItem('current_info', current_info);
        getSingle(idd);
        console.log(idd);
        navigate('/recipe');
    }

    const getSingle = async (idd) => {
        let data = localStorage.getItem(`${idd}_cuisines`);
        if (data) {
            data = JSON.parse(data);
            localStorage.setItem('current_info', JSON.stringify(data));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/${idd}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
            data = await api.json();
            localStorage.setItem('current_info', JSON.stringify(data));
            localStorage.setItem(`${idd}_cuisines`, JSON.stringify(data))
            console.log(`From api ${idd}`, data)
        }
    }

    const getCuisine = async (name) => {
        let data = localStorage.getItem(`${name}_cuisines`);
        if (data) {
            data = JSON.parse(data);
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=30&cuisine=${name}`);
            data = await api.json();
            localStorage.setItem(`${name}_cuisines`, JSON.stringify(data))
            console.log(`From api ${name}`, data)
        }

        setCuisine(data.results);
    }

    return (
        <Grid
            animate = {{opacity: 1}}
            initial = {{opacity: 0}}
            exit = {{opacity: 0}}
            transition = {{durtion: 0.5}}
        >
            {cuisine.map((recipe) => {
                return (
                    <Card key={recipe.id} onClick={navigateTo}>
                        <img src={recipe.image} alt={recipe.title} />
                        <h4 info={recipe.id}>{recipe.title}</h4>
                    </Card>
                )
            })}
        </Grid>
    )
}