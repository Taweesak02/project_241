const BASE_URL = 'http://localhost:8000'

document.addEventListener("DOMContentLoaded",async()=>{
  await loadData()
})



const loadData = async()=>{
  try{
    const response = await axios.get(`${BASE_URL}/Orders`)

    let datas = response.data

    paymentStatusGraph(datas)
    deliveryStatusGraph(datas)
    orderPerMonthGraph(datas)
    
    document.getElementById('ordersum').innerHTML = `${datas.length} รายการ`
    document.getElementById('priceavg').innerHTML = `${(priceSum(datas)/datas.length).toFixed(2)} <i class="fa-solid fa-baht-sign"></i>`
    document.getElementById('customersum').innerHTML = `${unqiueName(datas)} คน`
    
  }catch(err){
    console.log(err.error)
  }
}
const unqiueName = (datas)=> {

  const unqiuename = [...new Set(datas.map((item) => item.customerName))].sort()
  return unqiuename.length

}

const priceSum = (datas) =>{
  let sum = 0
  for(let i = 0; i < datas.length; i++){

    sum += datas[i].price
    

  }
  console.log(sum)
  return  sum
} 


const paymentStatusGraph = (datas)=>{
  let dataPaid = 0
  let dataUnpaid = 0
  
  const colors = ['rgb(239, 106, 106)','rgb(119, 247, 94)']


  for(let i = 0; i < datas.length; i++){

    switch(datas[i].paymentStatus){
      case 'ชำระเงินเสร็จสิ้น': dataPaid += 1
        break;
      default: dataUnpaid += 1
    }

  }

  const data = {
    labels: [
      'รอชำระเงิน',
      'ชำระเงินเสร็จสิ้น',
    ],
    datasets: [{
      label: 'สถานะการชำระเงิน',
      data: [dataUnpaid, dataPaid,],
      backgroundColor: colors
    }]
  } 

  new Chart("payment-status", {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  })
  
}

const deliveryStatusGraph = (datas) =>{

  let dataprepare = 0
  let datasending = 0
  let datadelivered = 0
  
  const colors = ['rgb(239, 106, 106)','rgb(224, 226, 92)','rgb(119, 247, 94)']
  
  for(let i = 0; i < datas.length; i++){

    switch(datas[i].deliveryStatus){
      case 'จัดเตรียมส่งสินค้า':dataprepare += 1 
        break;
      case 'กำลังส่งสินค้า': datasending += 1
        break;
      default: datadelivered +=1
    }
    
  }

  const data = {
    labels: [
      'จัดเตรียมส่งสินค้า',
      'กำลังส่งสินค้า',
      'จัดส่งสินค้าแล้ว'
    ],
    datasets: [{
      label: 'สถานะการส่งสินค้า',
      data: [dataprepare, datasending, datadelivered],
      backgroundColor: colors
    }]
  } 
  new Chart("delivery-status", {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  })
}

const orderPerMonthGraph = (datas)=>{

  const xValues = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  let dataOrder = [0,0,0,0,0,0,0,0,0,0,0,0]
  const colors = [
    'rgb(250, 142, 223)',
    'rgb(247, 94, 122)',
    'rgb(243, 146, 101)',
    'rgb(247, 239, 94)',
    'rgb(119, 247, 94)',
    'rgb(94, 245, 247)',
    'rgb(94, 115, 247)',
    'rgb(191, 94, 247)',
    'rgb(178, 138, 246)',
    'rgb(136, 236, 184)',
    'rgb(247, 117, 94)',
    'rgb(229, 247, 94)',
  ]


  for(let i = 0; i < datas.length; i++){
    const date = new Date(datas[i].orderDate)
    const monthNumber = date.getMonth() + 1
    switch(monthNumber){
      case 1:dataOrder[0] += 1
        break;
      case 2: dataOrder[1] += 1
        break;
      case 3: dataOrder[2] += 1
        break;
      case 4: dataOrder[3] += 1
        break;
      case 5: dataOrder[4] += 1
        break;
      case 6: dataOrder[5] += 1
        break;
      case 7: dataOrder[6] += 1
        break;
      case 8: dataOrder[7] += 1
        break;
      case 9: dataOrder[8] += 1
        break;
      case 10: dataOrder[9] += 1
        break;
      case 11: dataOrder[10] += 1
        break;
      case 12: dataOrder[11] += 1
        break;
    }
    
  }

  new Chart("chart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: colors,
        data: dataOrder
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "จำนวนคำสั่งซื้อตลอดปี " + new Date().getFullYear()
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  })
}




  