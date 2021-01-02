import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burger-builder-d066e-default-rtdb.firebaseio.com'
})

export default instance;