const BASE_URL = 'http://localhost:8000'

let orderidDOM = document.getElementById("orderid")
let message = document.getElementById("message")
let infoDetailDOM = document.getElementById("information")
let htmlpdf

const searchingData = async()=>{
    
    try{
        
        if(orderidDOM.value == ''){
            throw{
                message:"ไม่ได้ใส่ข้อมูล"
            }
        }
        
        const response = await axios.get(`${BASE_URL}/Orders/${orderidDOM.value}`)
        console.log("response",response.data);

        message.classList.add('succes')
        message.classList.remove('danger')
        message.classList.remove('hidden')

        infoDetailDOM.classList.remove("hidden")

        const formattedDate = new Date(response.data.orderDate).toLocaleDateString('en-GB');

        let htmldata = `<div id = 'searching-result'>
                            <label id="message-header">รายละเอียดรายการสั่งสินค้า</label>
                            <div class='flex'>
                                <label>ชื่อลูกค้า</label>
                                <label>${response.data.customerName}</label>
                            </div>
                            <div class = 'flex'>
                                <label>ชื่อร้านค้า</label>
                                <label>${response.data.shopName}</label>
                            </div>
                            <div class='flex'>
                                <label>วันที่สั่งซื้อ</label>
                                <label>${formattedDate}</label>
                            </div>
                            <div class='flex'>
                                <label>สถานะการชำระเงิน</label>
                                <label>${response.data.paymentStatus}</label>
                            </div>
                            <div class='flex'>
                                <label>สถานะการจัดส่งสินค้า</label>
                                <label>${response.data.deliveryStatus}</label>
                            </div>
                            <div class='flex'>
                                <label>ราคาสินค้า</label>
                                <label>${response.data.price}</label>
                            </div>
                            <div class='flex'>
                                <label>รายละเอียดสินค้า</label>
                                <label>${response.data.productDetail}</label>
                            </div>
                            
                       </div>
                        
                        <button id="dowloadfile" onclick='downloadPDF()'>ดาวน์โหลดไฟล์ pdf</button>
                        `
        htmlpdf = `<div id = 'searching-pdf'>
                            <label id="message-header">รายละเอียดรายการสั่งสินค้า</label>
                            <div class='flex'>
                                <label>ชื่อลูกค้า</label>
                                <label>${response.data.customerName}</label>
                            </div>
                            <div class = 'flex'>
                                <label>ชื่อร้านค้า</label>
                                <label>${response.data.shopName}</label>
                            </div>
                            <div class='flex'>
                                <label>วันที่สั่งซื้อ</label>
                                <label>${formattedDate}</label>
                            </div>
                            <div class='flex'>
                                <label>สถานะการชำระเงิน</label>
                                <label>${response.data.paymentStatus}</label>
                            </div>
                            <div class='flex'>
                                <label>สถานะการจัดส่งสินค้า</label>
                                <label>${response.data.deliveryStatus}</label>
                            </div>
                            <div class='flex'>
                                <label>ราคาสินค้า</label>
                                <label>${response.data.price}</label>
                            </div>
                            <div class='flex'>
                                <label>รายละเอียดสินค้า</label>
                                <label>${response.data.productDetail}</label>
                            </div>
                            <div class='flex'>
                                <label>วันที่พิมพ์รายการสั่งซื้อ</label>
                                <label>${new Date().toLocaleDateString('en-GB')}</label>
                            </div>
                            
                       </div>
                        `
        message.innerHTML = "ค้นหารายการสั่งสินค้าเสร็จสิ้น"
        infoDetailDOM.innerHTML = htmldata

    }catch(err){
        message.classList.add('danger')
        message.classList.remove('succes')
        message.classList.remove('hidden')

        infoDetailDOM.classList.add('hidden')

        message.innerHTML = 'ไม่พบหมายเลขสินค้า กรุณากรอกข้อมูลให้ถูกต้อง'
        
    }


    
}



const downloadPDF = () => {
            

    const options = {
        margin: 1, // Margin around the content
        filename: 'order-details.pdf', // Name of the PDF file
        image: { type: 'jpeg', quality: 1 }, // High-quality images
        html2canvas: { scale: 2, useCORS: true }, // Improve rendering quality
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // Set to landscape
    }

    html2pdf().set(options).from(htmlpdf).toPdf()
    .get('pdf')
    .then((pdf) => {
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
    })

    


}



