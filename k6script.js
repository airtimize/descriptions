import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  // 1200 virtual users (aka 1200 concurrent users / threads running your defined load test function over and over again)
  vus: 1200,
  // amount of time VUs will be repeating function
  duration: "30s"
};

export default function() {
  let randomGetNum = Math.floor(Math.random() * (10000001 - 1) + 1);
  let randomPostNum = Math.floor(Math.random() * (2000000 - 1000001) + 1000001);
  
  let res = http.get(`http://localhost:3000/listing/desc/${randomGetNum}/`);
  let res = http.get(`http://localhost:3000/listing/amenity/${randomGetNum}/`);
  
  let res = http.post(`http://localhost:3000/listing/desc/${randomPostNum}/`);
  let res = http.post(`http://localhost:3000/listing/amenity/${randomPostNum}/`);

  check(res, {
    "status was 200": (r) => r.status == 200
  });
  
  sleep(1);
};