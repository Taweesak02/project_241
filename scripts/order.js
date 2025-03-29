
const BASE_URL = 'http://localhost:8000'

let customerNameDOM = document.querySelector("input[name=customer-name]")
let shopNameDOM = document.querySelector("input[name=shop-name]")
let orderDateDOM = document.querySelector("input[name=order-date]")
let priceDOM = document.querySelector("input[name=price]")

let paymentDOM = document.querySelector("select[name=payment-status]")
let deliveryDOM = document.querySelector("select[name=delivery-status]")

let detailDOM = document.getElementById("detail")

let message = document.getElementById("message")

const submitData = async()=>{
   
        let orderData = {
            customerName: customerNameDOM.value,
            shopName: shopNameDOM.value,
            orderDate: orderDateDOM.value,
            paymentStatus: paymentDOM.value,
            deliveryStatus: deliveryDOM.value,
            price: priceDOM.value,
            productDetail: detailDOM.value,
        }
        
    try{
        const response = await axios.post(`${BASE_URL}/Orders`,orderData)
        console.log("response",response.data);

        message.classList.add('succes')
        message.classList.remove('danger')
        message.innerHTML = `ข้อมูลถูกบันทึกเรียบร้อย`
        
    }catch(err){
        message.classList.add('danger')
        message.classList.remove('succes')
        
        
        err.message = err.response.data.message
        errors = err.response.data.error

        let htmldata = `<div>${err.message}</div><ul>`

        for(let i = 0;i < errors.length;i++){
            htmldata += `<li>${errors[i]}</li>`
        }

        htmldata += `</ul>`
        console.log(htmldata)
        message.innerHTML = htmldata
        
    }
}




