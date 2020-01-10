import axios from 'axios';

const instance = axios.create({
    baseURL: "https://coffeecar.herokuapp.com/api"
});

export default instance;