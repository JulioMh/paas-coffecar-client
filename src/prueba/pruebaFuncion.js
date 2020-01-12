import axios from 'axios';

export class CarService {
    
    getCarsSmall() {
        return axios.get('http://coffeecar.herokuapp.com/api/announces/')
                .then(res => res.data.data);
    }

    getCarsMedium() {
        return axios.get('showcase/resources/demo/data/cars-medium.json')
                .then(res => res.data.data);
    }

    getCarsLarge() {
        return axios.get('http://coffeecar.herokuapp.com/api/announces/')
                .then(res => res.data.data);
    }
}