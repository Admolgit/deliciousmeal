import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import styled from "styled-components";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// Create styled wrapper

const Wrapper = styled.div`
    margin:2rem;
`;

const Card = styled.div`
    min-height: 25rem;
    overflow: hidden;
    border-radius: 2rem;
    position: relative;
    margin: 1rem auto;
    
    img{
        border-radius: 2rem;
        width: 100%;
        position: absolute;
        height: 100%;
        object-fit: cover;
    }
    
    p{
        position: absolute;
        bottom: 0;
        z-index: 2;
        background-color: #00000088;
        color: white;
        padding: 1rem;
        width: 80%;
        border-radius: 2rem;
        margin: auto;
        font-weight: bold;
        text-align: center;
        transform: translate(2rem, -3rem)
    }
`

const Gradient = styled.div`
    z-index: 1;
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(#00000015, #00000040);
`

export default function Veggie() {
    const [veggies, setVeggies] = useState([]);
    const navigate = useNavigate();


    // Run function as soon as the component gets loaded
    useEffect(() => {
        getVeggies();
    }, []);

    const navigateTo = (ev) => {
        let current_info = ev.target.nextElementSibling.getAttribute('info');
        localStorage.setItem('current_info', current_info);
        navigate('/recipe');
    }

    const getVeggies = async () => {
        let data = localStorage.getItem('veggie_recipes');
        if (data) {
            data = JSON.parse(data);
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=30&tags=vegetarian`);
            data = await api.json();
            localStorage.setItem('veggie_recipes', JSON.stringify(data))
            console.log('From api', data)
        }

        setVeggies(data.recipes);
    }
    return (
        <Wrapper>
            <h4>Our Veggies</h4>
            <Splide options={{
                perPage: 2,
                rewind: true,
                arrows: false,
                drag: 'free',
                pagination: false,
                gap: '3rem'
            }}>
                {veggies.map(recipe => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card onClick={navigateTo} info={'hellooo'} >
                                <Gradient/>
                                <p info={JSON.stringify(recipe)}>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title}/>
                            </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
    )
}
