import React,{ createContext, useState} from 'react'

export const context = createContext()

const ContentApi = ({child}) => {
    const [value,setValue] = useState("hii")
  return (
    <>
      <context.Provider value={{value,setValue}}>
            {child}
      </context.Provider>
    </>
  )
}

export default ContentApi
