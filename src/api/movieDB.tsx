import axios from 'axios';

const movieDB = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key:'8d52822d7382bf63421215cfbb4acad7',
        language: 'es-ES',
    },
});

export default movieDB;
