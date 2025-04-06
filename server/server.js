const express = require('express');
const bodyparset = require('body-parser');
const mysql = require('mysql2/promise');
const app = express()
const cors = require('cors')
const jwt =  require('jsonwebtoken')
const cookieParser = require('cookie-parser')



const port = 8000; 
const SECRET = "ohuton"
const Orders = []

app.use(bodyparset.json())
app.use(cookieParser())
app.use(cors())

let conn = null
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'serverdb',
    port: 8820
  })
}

//ตรวจสอบความถูกต้อง
const validateData = (orderData)=>{
  let errors = [];

  if(!orderData.customerName){
      errors.push('กรุณากรอกชื่อนามสกุลลูกค้า')
  }
  if(!orderData.shopName){
      errors.push('กรุณากรอกชื่อร้านค้า')
  }
  if(!orderData.orderDate){
    errors.push('กรุณากรอกวันที่สั่งสินค้า')
  }
  if(!orderData.paymentStatus){
    errors.push('กรุณากรอกสถานะการชำระเงิน')
  }
  if(!orderData.deliveryStatus){
    errors.push('กรุณากรอกสถานะการส่งสินค้า')
  }
  if(!orderData.price){
    errors.push('กรุณากรอกราคาสินค้า')
  }
  if(!orderData.productDetail){
    errors.push('กรุณากรอกรายละเอียดสินค้า')
  }  
    
  return errors
}

//เรียกข้อมูลทุกรายการ
app.get('/Orders', async (req, res) => {
  try{ 
    const results = await conn.query('SELECT * FROM Orders')
    res.json(results[0])
  }catch(err){
    res.json({
      message:"ไม่สามารถ get ได้",
      error:err.message
    })
  }
})

//เรียกข้อมูลบาง id
app.get('/Orders/:orderID',async(req,res)=>{
  try{

    let orderID = req.params.orderID
    const results = await conn.query('SELECT * FROM Orders WHERE orderID = ?', orderID)
    if (results[0].length == 0) {
      throw {statusCode: 404, message: "User not found"}

    }
    res.json(results[0][0])

  }catch (err) {
    let statusCode = err.statusCode || 500
    res.status(500).json({
      error: "ไม่สามารถ get id ได้",
      errorMessage: err.message
    })
  }
})


//เพิ่มข้อมูล
app.post('/Orders',async(req,res)=>{
  try{
    let order = req.body
    
    const errors = validateData(order)

    if(errors.length > 0){
      throw{
        message:'กรุณากรอกข้อมูลให้ครบถ้วน',
        errors: errors
      }
    }

    const results = await conn.query('INSERT INTO Orders SET ?',order)
    res.json({
      message: "เพิ่มข้อมูลเสร็จสิ้น",
      data: order,
    })


  }catch(err){
    const errorMessage = err.message || "ไม่สามารถเพิ่มข้อมูลได้"
    const errors = err.errors || []
    res.status(500).json({
      message: errorMessage,
      error: errors
    })
  }
    
})


//แก้ไขข้อมูล
app.put('/Orders/:orderID',async(req,res)=>{
  try{
    let orderid = req.params.orderID
    let updateorder = req.body

    const results = await conn.query('UPDATE Orders SET ? WHERE orderID = ?',[updateorder,orderid])

    res.json({
      message: "แก้ไขข้อมูลเรียบร้อย",
      data:updateorder
    })
  }catch(err){
    res.status(500).json({
      message: "ผิดพลาดในการแก้ไข",
      data:err.message
    })
  }
})

//ลบข้อมูล
app.delete('/Orders/:orderID',async(req,res) =>{
  try{
    let orderid = req.params.orderID

    const results = await conn.query('DELETE FROM Orders WHERE orderID = ?',orderid)
    res.json({
      message:"ลบข้อมูลสำเร็จ",
      orderid:orderid

    })
  }
  catch(err){
    res.json({
      message: "ผิดพลาดส่วนของ delete",
      error:err.message
    })
  }
})

app.listen(port, async (req, res) => {

  try{  
    await initMySQL()
    console.log(`Http Server is running on port ${port}`)
  }catch(err){
    res.json({
      message:"เชื่อมต่อไม่สำเร็จ",
      error:err.message
    })
  }
})









