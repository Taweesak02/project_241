const BASE_URL = 'http://localhost:8000'

const tableDOM = document.getElementById('data')
const bodyDOM = document.getElementsByTagName('body')
const optionconDOM = document.getElementById("option-container")
const messageDOM = document.getElementById("message")

document.addEventListener("DOMContentLoaded",async()=>{
    await refresh()
})

const refresh = async()=>{
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

            const formattedDate = new Date(response.data[i].orderDate).toLocaleDateString('en-GB');
            htmldata += `<tr>
                            <td>${response.data[i].orderID}</td>
                            <td>${response.data[i].customerName}</td>
                            <td>${response.data[i].shopName}</td>
                            <td>${formattedDate}</td>
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

    const rowDOM = document.querySelectorAll("tr:not(#table-head)");

    
    rowDOM.forEach((i)=>{
        i.addEventListener("click",()=>{
            const orderID = i.cells[0].textContent
            optionMode(orderID)
    
        })
    
    })
} 

const optionMode = (orderID)=>{
    bodyDOM[0].classList.add("filterdark")
    optionconDOM.classList.remove('hidden')

    const editBtn = document.getElementById('editBtn')
    const delBtn = document.getElementById('delBtn')

    editBtn.addEventListener("click",async()=>{
        editMode(orderID)
    })

    
    delBtn.addEventListener("click",async()=>{
        const response = await axios.delete(`${BASE_URL}/Orders/${orderID}`)
        refresh()
        exitMode()
        updatemessage(orderID)

    })
}

const editMode = (orderID)=>{
    
}

const updatemessage = (orderID)=>{
    messageDOM.classList.remove("hidden")
    messageDOM.classList.add('succes')
    messageDOM.innerHTML = `ลบรายการคำสั่งหมายเลข ${orderID} เรียบร้อย`

}

const exitMode = ()=>{
    bodyDOM[0].classList.remove("filterdark")
    optionconDOM.classList.add('hidden')
}





