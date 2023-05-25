import { useEffect, useState } from "react";
import { UserService } from "../services/LoginService";
import {IUser} from '../models/IUser';

export function Login() {
    const userService = new UserService();

    const [user,setUser] = useState<IUser>();

    useEffect(()=>{
    
        userService.Login()!.then(user=>{
            setUser(user);
        })  
    },[]);

    return (
        <div>
            <h1>My Web Page</h1>
            {/* <iframe
                src="https://aslbdemo.workflowcloud.com"
                title="Example Website"
                width="100%"
                height="768px"
            /> */}
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