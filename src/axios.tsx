import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost/taskmanager/',
    timeout: 60000,
})