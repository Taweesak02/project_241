const BASE_URL = 'http://localhost:8000'

const userNameDOM = document.querySelector("input[name=user]")
const passwordDOM = document.querySelector("input[name=password]") 

const loginsubmit = async()=>{
    let data = {
        user:userNameDOM.value,
        password:passwordDOM.value
    }
    
    const response = await axios.post(`${BASE_URL}/Login`,data)

    console.log(response)
}