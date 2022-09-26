import axios from "axios";
export const getData = async (city) =>{
    const apikey = "6142662d6a4e21b12306a62fe4b7848c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    return await axios.get(url)
        .then((response) =>{
            const data = response.data
            return data
        })
}
