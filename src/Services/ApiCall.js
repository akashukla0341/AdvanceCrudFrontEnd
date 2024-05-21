import axios from 'axios'

export const commonApiFunction = (method,url,body,header) => {
    let config = {
        method,
        url,
        headers:header?header:{
            'Content-Type':'application/json'
        },
        data:body
    }

    return axios(config).then((data)=>{
        return data
    }).catch((err)=>{
        return err
    })
}
