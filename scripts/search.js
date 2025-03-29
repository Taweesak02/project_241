const BASE_URL = 'http://localhost:8000'

let orderidDOM = document.getElementById("orderid")
let message = document.getElementById("message")

const searchingData = async()=>{

    try{
        const response = await axios.get(`${BASE_URL}/Orders/${orderidDOM.value}`)
        console.log("response",response.data);
    }catch(err){
        
    }
}