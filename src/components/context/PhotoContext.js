import React,{ createContext } from "react";

const PhotoContext = createContext();

export const PhotoProvider = ({children}) => {

    const photoList = [
        {
            id: 1,
            Title: "photo1",
            description: "first photo"
        }
    ]
    return (<PhotoContext.Provider value={photoList}>{children}</PhotoContext.Provider>)
}

export default PhotoContext;