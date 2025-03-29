import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface userContextType {
    updateProfile : (profile) =>void;
    user: profile;
}

interface profile {
    userName : string;
    phone : string;
    dob : string;
    gender : string ;
    email :string;
 }

export const UserContext = createContext<userContextType | undefined>(undefined);
export const UserProvider = ({children}:{children : React.ReactNode}) =>{
    const token = localStorage.getItem("accessToken");
    const [user , setUser] = useState<profile | undefined>(undefined);
    
    const updateProfile = async (props)=>{

    try {
        const {userName , phone , dob , gender , email} = props;
       const user =  await axios.post("http://localhost:8080/api/users/updateProfile" , {userName , phone , dob , gender , email} ,
       {
        headers : {Authorization :`Bearer ${token}`}
       });
       await users();
        return user;
    } catch (error) {
        throw new Error ("Error " + error.message);
    }        
    }
    const users = async ()=>{
       const response=  await axios.get("http://localhost:8080/api/users", {
            headers : {Authorization :`Bearer ${token}`}
           });
           setUser(response.data);
    }
    useEffect(()=>{
        users();
    },[])
    return (
        <UserContext.Provider value={{ user, updateProfile }}>
                {children}
        </UserContext.Provider>
    )
   
}