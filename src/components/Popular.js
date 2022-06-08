import {useNavigate} from 'react-router-dom';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import styled from "styled-components";
import {useEffect, useState} from "react";

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

export default function Popular() {
    const [popular, setPopular] = useState([]);
    const navigate = useNavigate();

    // Run function as soon as the component gets loaded
    useEffect(() => {
        getPopular();
    }, []);

    const navigateTo = (ev) => {
        let current_info = ev.target.nextElementSibling.getAttribute('info');
        localStorage.setItem('current_info', current_info);
        navigate('/recipe');
    }

    const getPopular = async () => {
        let data = localStorage.getItem('random_recipes');
        if (data) {
            data = JSON.parse(data);
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=18`);
            data = await api.json();
            localStorage.setItem('random_recipes', JSON.stringify(data))
            console.log('From api', data)
        }

        setPopular(data.recipes);
    }
    return (
        <Wrapper>
            <h4>Popular</h4>
            <Splide options={{
                perPage: 3,
                rewind: true,
                arrows: false,
                drag: 'free',
                pagination: false,
                gap: '2rem'
            }}>
                {popular.map(recipe => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card onClick={navigateTo}>
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
