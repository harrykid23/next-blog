import { createContext, useState } from "react";
import { API_ENDPOINT, requestHeaders } from "../lib/config";

const GlobalContext = createContext("");

const GlobalState = ({ children }) => {
  const [state, setState] = useState({
    userList: [],
    paginationUser: [],
  });

  const getUserList = async (page = 1, query = null, volume = 10) => {
    const url =
      API_ENDPOINT +
      "/users?" +
      new URLSearchParams({
        page: page,
        per_page: volume,
      }) +
      (query ? (query !== "" ? `&name=${query}` : "") : "");

    const response = await fetch(url, { headers: requestHeaders });
    if (response.ok) {
      const paginationInfo = {
        currentPage: parseInt(response.headers.get("x-pagination-page")),
        totalPage: parseInt(response.headers.get("x-pagination-pages")),
      };
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        userList: data,
        paginationUser: paginationInfo,
      }));
      return { success: true, data: data };
    } else {
      return {
        success: false,
        displayError: "Something went wrong",
      };
    }
  };

  const deleteUser = async (userData) => {
    const url = API_ENDPOINT + "/users/" + userData.id;

    const response = await fetch(url, {
      method: "DELETE",
      headers: requestHeaders,
    });
    if (response.ok) {
      const newUserList = state.userList.filter(
        (item) => item.id !== userData.id
      );

      setState((prevState) => ({
        ...prevState,
        userList: newUserList,
      }));
      return { success: true, data: newUserList };
    } else {
      return {
        success: false,
        displayError: "Something went wrong",
      };
    }
  };

  const editUser = async (userData) => {
    const url = API_ENDPOINT + "/users/" + userData.id;

    const response = await fetch(url, {
      method: "PATCH",
      headers: requestHeaders,
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const indexUpdated = state.userList.findIndex(
        (item) => item.id === userData.id
      );
      const newUserList = [...state.userList];
      if (indexUpdated !== -1) {
        newUserList[indexUpdated] = {
          ...newUserList[indexUpdated],
          ...userData,
        };
      }

      setState((prevState) => ({
        ...prevState,
        userList: newUserList,
      }));
      return { success: true, data: newUserList };
    } else {
      return {
        success: false,
        displayError: "Something went wrong",
      };
    }
  };

  const addUser = async (userData, currentPage) => {
    const url = API_ENDPOINT + "/users";

    const response = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      if (currentPage === 1) {
        getUserList(1);
      }
      return { success: true, data: userData };
    } else {
      return {
        success: false,
        displayError: "Something went wrong",
      };
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        userList: state.userList,
        paginationUser: state.paginationUser,
        getUserList,
        deleteUser,
        editUser,
        addUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalState };
