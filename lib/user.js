import { API_ENDPOINT, requestHeaders } from "./config";

const getSingleUser = async (idUser) => {
  const url = API_ENDPOINT + "/users/" + idUser;

  const response = await fetch(url, { headers: requestHeaders });
  if (response.ok) {
    const data = await response.json();
    return { data };
  } else {
    throw new Error("Something went wrong");
  }
};

export { getSingleUser };
