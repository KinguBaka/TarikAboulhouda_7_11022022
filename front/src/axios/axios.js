import axios from 'axios'


//axios.defaults.baseURL = 'http://localhost:3000/api/' ;

axios.defaults.baseURL = 'https://groupomania-tarikaboulhouda.herokuapp.com/api/' ;

console.log(localStorage.getItem('token'));

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
