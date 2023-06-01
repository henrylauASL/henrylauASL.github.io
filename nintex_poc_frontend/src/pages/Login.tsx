import { useContext, useEffect, useState } from "react";
import { UserService } from "../services/LoginService";
import {IUser} from '../models/IUser';
import UserContext from "../components/UserContext";

export function Login() {
    const userService = new UserService();
    const { user, setUser} = useContext(UserContext);

    useEffect(()=>{
    
        userService.Login()!.then(user=>{
            setUser(user);
        })  
    },[]);

    return (
        <div>
            <h1>My Web Page</h1>
            {
                user? (
                    <div>
                        <h2>Welcome {user.name}</h2>
                    </div>
                ) : (
                    <div>
                        Loading...
                    </div>
                )
            }
        </div>
    );
}

export default Login;