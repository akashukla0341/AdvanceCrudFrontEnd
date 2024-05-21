import { commonApiFunction } from "./ApiCall";
import { API_URL } from "./Helper";

export const registertionFunction = async(data,header) => {
    return commonApiFunction("POST",`${API_URL}/`,data,header)
}
export const gettingAllDatas = async(search,gender,status,short,page) => {
    return commonApiFunction("GET",`${API_URL}/?search=${search}&gender=${gender}&status=${status}&sort=${short}&page=${page}`)
}
export const gettingOneData = async(id) => {
    return commonApiFunction("GET",`${API_URL}/edit/${id}`)
}
export const EditOneData = async(id,data,header) => {
    return commonApiFunction("POST",`${API_URL}/update/${id}`,data,header)
}
export const deleteData = async(id) => {
    return commonApiFunction("POST",`${API_URL}/delete/${id}`)
}
export const statusChange = async(id,data) => {
    return commonApiFunction("PUT",`${API_URL}/status/${id}`,{data})
}
export const exportToCsv = async() => {
    return commonApiFunction("GET",`${API_URL}/userexport`)
}