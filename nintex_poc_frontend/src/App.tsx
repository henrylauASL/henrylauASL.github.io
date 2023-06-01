
import { useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./components/UserContext";
import { IUser } from "./models/IUser";



function App() {
  const [user , setUser] = useState<IUser>({name:'', email: ''})
  return (
    <BrowserRouter>
    <UserContext.Provider value={{user, setUser}}>
        <Main />
    </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
