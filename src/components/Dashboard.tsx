import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COOKIE, getCookie, setCookie } from "../cookie";
import { useIsAuthenticated } from "../helper";
import { Roles, RolesArray, StoreState } from "../store/store";

const fetchAllContent = (newAccessToken?: AxiosResponse<any, any>) => {
  let accessToken = newAccessToken ? newAccessToken as unknown as string : getCookie(COOKIE.ACCESS_TOKEN);

  return axios.get("http://localhost:8080/api/test/all", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

const fetchAdminContent = () => {
  return axios.get("http://localhost:8080/api/test/admin");
};

const isAdmin = (roles: RolesArray) => {
  return Roles.Admin in roles;
};

const isUser = (roles: RolesArray) => {
  return Roles.User in roles;
};

const isModerator = (roles: RolesArray) => {
  return Roles.Moderator in roles;
};

function Dashboard() {
  const meUser = useIsAuthenticated();
  const allContent = useSelector((state: StoreState) => {
    return state.allContent;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (meUser || getCookie(COOKIE.ACCESS_TOKEN)) {
      fetchAllContent()
        .then((response) => {
          if (response) {
            dispatch({
              type: "SET_ALL_CONTENT",
              payload: response.data,
            });
          }
        })
        .catch((err) => {
          if ((err as any).response.data.message === "Unauthorized! Access token was expired") {
            axios
              .post("http://localhost:8080/api/auth/refreshtoken", {
                refreshToken: getCookie(COOKIE.REFRESH_TOKEN),
              })
              .then((response) => {
                const { accessToken, refreshToken } = response.data as any;
                setCookie(COOKIE.ACCESS_TOKEN, accessToken, 2);
                setCookie(COOKIE.REFRESH_TOKEN, refreshToken, 2);
                window.location.reload();
              })
              .catch((err) => {
                console.log(err.response.data.message);
              });
          } else {
              console.log("Other error", err.response.data.message)
          }
        });
    }
  }, [meUser]);

  // check if user is authenticated
  if (!meUser && !getCookie(COOKIE.ACCESS_TOKEN)) {
    return (
      <div>
        You are not authenticated, please go to <a href="/signin">Login link</a>
      </div>
    );
  }

  return <div>{allContent}</div>;
}

export default Dashboard;
