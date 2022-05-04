import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmE0ZGE3NzZmNzhiOWMyMGQ0YmJmNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTE1MDk5OSwiZXhwIjoxNjUxNDEwMTk5fQ.yL2rMhJQiErmLN24oOJpkYA3jaaNxK5al1HElm4p2sM";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: `Bearer ${TOKEN}`,
    }
});