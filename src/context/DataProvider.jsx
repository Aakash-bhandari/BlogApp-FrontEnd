import { useState } from "react";
import { createContext } from "react"

export const DataContext= createContext(null);

const DataProvider=({children})=>{

    const [account,setaccount] = useState({
        username:'',
        email:''
    })
    return (
        <DataContext.Provider value={{
            account,
            setaccount
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;