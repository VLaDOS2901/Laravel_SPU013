import axios from "axios";
    //Створення http запиту
    const http =axios.create({
        baseURL: "http://laravel.spu013.com",
        headers:{
            "Content-type": "application/json"
        }

    });

    export default http;