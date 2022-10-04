import axios from "axios";

export default axios.create({
    baseURL: 'https://my-json-server.typicode.com/proactivehealth/work-test-sample/users'
    /* baseURL: 'http://localhost:3500' */
})