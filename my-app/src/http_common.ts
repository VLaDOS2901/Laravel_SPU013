import axios from "axios";

    const http =axios.create({
        baseURL: "http://laravel.spu013.com",
        headers:{
            "Content-type": "application/json"
        }

    });

    export default http;