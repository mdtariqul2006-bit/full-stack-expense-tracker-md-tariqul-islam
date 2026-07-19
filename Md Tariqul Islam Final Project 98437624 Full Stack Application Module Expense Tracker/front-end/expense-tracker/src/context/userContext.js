import React, { createContext, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //function to update user data
    const UpdateUser = (userData) => {
        setUser(userData);
    };

    //clear user data
    const clearUser = () => {
        setUser(null);
    };

    return (
        <userContext.Provider
        value = {{
            user, 
            UpdateUser,
            clearUser,
        }}
        >
        { children }
        </userContext.Provider>
    );
}

export default UserProvider;