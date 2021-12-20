import { createContext } from "react";
import { useContext, Provider } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../store/store";

const AuthenticationContext = createContext(false)

const AuthProvider: React.FC<{}> = (value, children) => {

    return(
        <AuthenticationContext.Provider value={false}>
            {children}
        </AuthenticationContext.Provider>
    )
}


