import { createContext, useContext, useState } from "react";

const SelectedDocContext = createContext()

function useSelectedDoc(){
    return useContext(SelectedDocContext)
}

function SelectedDocProvider({value,children}){
    return <SelectedDocContext.Provider value={value}>{children}</SelectedDocContext.Provider>
}

export { useSelectedDoc, SelectedDocProvider}