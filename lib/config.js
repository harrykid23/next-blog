const API_ENDPOINT = "https://gorest.co.in/public/v2";

const requestHeaders = {
  Authorization: "Bearer " + process.env.NEXT_PUBLIC_GOREST_API,
  Accept: "application/json",
  "Content-Type": "application/json",
};

export { API_ENDPOINT, requestHeaders };
