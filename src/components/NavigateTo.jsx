import {useNavigate} from "react-router-dom";

const NavigateTo = (ev) => {
    const navigate = useNavigate();

    let current_info = ev.target.nextElementSibling.getAttribute('info');
    localStorage.setItem('current_info', current_info);
    navigate('/recipe/1');
}

export default NavigateTo;