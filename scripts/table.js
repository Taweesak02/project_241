const BASE_URL = 'http://localhost:8000'

const tableDOM = document.getElementById('data')
const bodyDOM = document.getElementsByTagName('body')
const optionconDOM = document.getElementById("option-container")
const messageDOM = document.getElementById("message")
const editmodeDOM = document.getElementById("edit-mode")

const submitBtn = document.getElementById("submitBtn")
const editBtn = document.getElementById('editBtn')
const delBtn = document.getElementById('delBtn')

const customerNameDOM = document.querySelector("input[name=customer-name]")
const shopNameDOM = document.querySelector("input[name=shop-name]")
const orderDateDOM = document.querySelector("input[name=order-date]")
const priceDOM = document.querySelector("input[name=price]")
const paymentDOM = document.querySelector("select[name=payment-status]")
const deliveryDOM = document.querySelector("select[name=delivery-status]")
const detailDOM = document.getElementById("detail")

let orderID = ''

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
            let orders = response.data[i]
            const formattedDate = new Date(orders.orderDate).toLocaleDateString('en-GB')

            let paymentStatusShow,deliveryStatusShow

            switch(orders.paymentStatus){ 
                case 'ชำระเงินเสร็จสิ้น': paymentStatusShow = 'paidstatus'
                    break
                default : paymentStatusShow = 'unpaidstatus'
            }
            switch(orders.deliveryStatus){ 
                case 'จัดส่งสินค้าแล้ว': deliveryStatusShow = 'deliveredstatus'
                    break
                case 'กำลังส่งสินค้า': deliveryStatusShow = 'sendingstatus'
                    break
                default : deliveryStatusShow = 'preparestatus'
            }

            htmldata += `<tr>
                            <td>${orders.orderID}</td>
                            <td>${orders.customerName}</td>
                            <td>${orders.shopName}</td>
                            <td>${formattedDate}</td>
                            <td><div id = ${paymentStatusShow}>${orders.paymentStatus}</div></td>
                            <td><div id = ${deliveryStatusShow}>${orders.deliveryStatus}</div></td>
                            <td>${orders.price}</td>
                            <td>${orders.productDetail}</td>
                         </tr>   
                        `
        }
        tableDOM.innerHTML = htmldata

    }catch(err){
        tableDOM.innerHTML = "ไม่สามารถโหลดตารางข้อมูลได้"
    }

    const rowDOM = document.querySelectorAll("tr:not(#table-head)")

    rowDOM.forEach((i)=>{
        i.addEventListener("click",()=>{
            orderID = i.cells[0].textContent
            optionMode()
    
        })
    
    })
} 

const optionMode = ()=>{
    bodyDOM[0].classList.add("filterdark")
    optionconDOM.classList.remove('hidden')

}

delBtn.addEventListener("click",async()=>{
    const response = await axios.delete(`${BASE_URL}/Orders/${orderID}`)
    refresh()
    exitMode()
    updatemessage(orderID)

})

editBtn.addEventListener("click",async()=>{
    editMode()
})

const editMode = async()=>{
    editmodeDOM.classList.remove("hidden")
    optionconDOM.classList.add("hidden")
    console.log("i am editmode",orderID)
    const response = await axios.get(`${BASE_URL}/Orders/${orderID}`)
    let order = response.data
    const formattedDate = new Date(order.orderDate).toISOString().split('T')[0]

    customerNameDOM.value = order.customerName
    shopNameDOM.value = order.shopName
    orderDateDOM.value = formattedDate
    priceDOM.value = order.price
    paymentDOM.value = order.paymentStatus
    deliveryDOM.value = order.deliveryStatus
    detailDOM.value = order.productDetail

    
}

submitBtn.addEventListener("click",async()=>{
    
    

    let newdata = {
        customerName: customerNameDOM.value,
        shopName: shopNameDOM.value,
        orderDate: orderDateDOM.value,
        paymentStatus: paymentDOM.value,
        deliveryStatus: deliveryDOM.value,
        price: priceDOM.value,
        productDetail: detailDOM.value,      
    }
    
    console.log(newdata)

    const response = await axios.put(`${BASE_URL}/Orders/${orderID}`,newdata)

    refresh()

    editmodeDOM.classList.add("hidden")
    bodyDOM[0].classList.remove("filterdark")

    messageDOM.classList.remove("hidden")
    messageDOM.classList.add('succes')
    messageDOM.innerHTML = `แก้ไขรายการคำสั่งหมายเลข ${orderID} เรียบร้อย`
})

const updatemessage = (orderID)=>{
    messageDOM.classList.remove("hidden")
    messageDOM.classList.add('succes')
    messageDOM.innerHTML = `ลบรายการคำสั่งหมายเลข ${orderID} เรียบร้อย`

}

const exitMode = ()=>{
    bodyDOM[0].classList.remove("filterdark")
    optionconDOM.classList.add('hidden')
}

const returnMode = ()=>{
    editmodeDOM.classList.add("hidden")
    optionconDOM.classList.remove("hidden")
}






