import React from 'react'
import { IUser } from '../models/IUser';

const UserContext = React.createContext<User>({
    // email: "",
    // setEmail: (value: string) => {}
    user : {
        name: '',
        email: ''
    },
    setUser:(value:IUser) => {}
});
//{user,setUser}
interface User {
    // email: string;
    // setEmail: (value: string) => void;
    user : IUser
    setUser:(value:IUser) => void;
}

export default UserContext
