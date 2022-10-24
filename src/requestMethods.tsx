import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzE0MTZkOGRlM2VlZjUxNDEzOWMyOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MjAyMzA3NiwiZXhwIjoxNjUyMjgyMjc2fQ.7fRe6PDmcEFvoI6J47ZKBklBbnZmxmMfq8zu9o4yRqw";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
