
import { useContext, createContext, useState } from 'react'
const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ 
        email: null, 
    }) 
    return (
        <UserContext.Provider value={[user, setUser]} >
            {children}
        </UserContext.Provider>
    )
}

//custom hooks
const useUser = () => useContext(UserContext);
export { useUser, UserProvider }
