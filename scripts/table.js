const BASE_URL = 'http://localhost:8000'

const tableDOM = document.getElementById('data')

document.addEventListener("DOMContentLoaded",async()=>{
    try{
        const response = await axios.get(`${BASE_URL}/Orders`)
        console.log("response",response.data);

        let htmldata = `<tr id ="table-head">
                            <th>orderID</th>
                            <th>customerName</th>
                            <th>shopName</th>
                            <th>orderDate</th>
                            <th>paymentStatus</th>
                            <th>deliveryStatus</th>
                            <th>price</th>
                            <th>productDetail</th>
                        </tr>`

        for(let i = 0;i < response.data.length;i++){
            htmldata += `<tr>
                            <td>${response.data[i].orderID}</td>
                            <td>${response.data[i].customerName}</td>
                            <td>${response.data[i].shopName}</td>
                            <td>${response.data[i].orderDate}</td>
                            <td>${response.data[i].paymentStatus}</td>
                            <td>${response.data[i].deliveryStatus}</td>
                            <td>${response.data[i].price}</td>
                            <td>${response.data[i].productDetail}</td>
                         </tr>   
                        `
        }
        tableDOM.innerHTML = htmldata

    }catch(err){
        tableDOM.innerHTML = "ไม่สามารถโหลดตารางข้อมูลได้"
    }
    
})