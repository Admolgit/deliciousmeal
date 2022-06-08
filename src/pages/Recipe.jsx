import styled from "styled-components";
import {useState} from "react";

const DetailWrapper = styled.div`
        display: flex;
        margin: 3rem auto;
        
        .active {
            background: linear-gradient(35deg, #505050, #303030);
            color: white;
        }
        li {
            font-size: 80%;
            line-height: 1.6rem;
            color: grey;
            list-style-type: none;
        }
        ul, h3 {
            margin: 2rem auto;
        }
        img {
            object-fit: cover;
        }
    `

const Button = styled.button`
        padding: 1rem 2rem;
        color: #313131;
        background-color: white;
        font-weight: 600;
        margin-right: 2rem;
        border: 2px solid black;
    `

const Info = styled.div`
        margin: 5rem;
        padding: 10px;
        
        p{
            color: #222;
            text-align: justify;
            margin: 15px auto; 
        }
        a{
            color: dodgerblue;
        }
    `

export default function Recipe() {
    const details = JSON.parse(localStorage.getItem('current_info'));
    const [activeTab, setActiveTab] = useState('instructions');


    return (
        <DetailWrapper>
            <div>
                <h3>{details.title}</h3>
                <img src={details.image} alt={details.title}/>
            </div>
            <Info>
                <Button onClick={() => setActiveTab('instructions')} className={activeTab === 'instructions' ? 'active' : ''}>Instructions</Button>
                <Button onClick={() => setActiveTab('ingredients')} className={activeTab === 'ingredients' ? 'active' : ''}>Ingredients</Button>

                {activeTab === "instructions" && (
                    <div>
                        <h3>Summary</h3>
                        <p dangerouslySetInnerHTML={{__html: details.summary}}/>
                        <h3>Instructions</h3>
                        <p dangerouslySetInnerHTML={{__html: details.instructions}}/>
                    </div>
                )}

                {activeTab === 'ingredients' && (
                  <ul>
                    {details.extendedIngredients.map((item) => (
                        <li key={item.id}>{item.original}</li>
                    ))}
                </ul>
                )}
            </Info>
        </DetailWrapper>
    )
}