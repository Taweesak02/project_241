const express = require('express');
const bodyparset = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const jwt =  require('jsonwebtoken')

const port = 8000; 

const Orders = []

app.use(bodyparset.json())
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

app.get('/Orders', async (req, res) => {
  const results = await conn.query('SELECT * FROM Orders')
  res.json(results[0])
})

app.get('/Orders/:orderID',async(req,res)=>{
  try{

    let orderID = req.params.orderID
    const results = await conn.query('SELECT * FROM Orders WHERE orderID = ?', orderID)
    if (results[0].length == 0) {
      throw {statusCode: 404, message: "User not found"}

    }
    res.json(results[0][0])

  }catch (err) {
    console.log('error', err.message)
    let statusCode = err.statusCode || 500
    res.status(500).json({
      error: "something went wrong",
      errorMessage: err.message
    })
  }
})

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
    const errorMessage = err.message || "Something Went Wrong"
    const errors = err.errors || []
    res.status(500).json({
      message: errorMessage,
      error: errors
    })
  }
    
})

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
  await initMySQL()
  console.log(`Http Server is running on port ${port}`)
})


app.post('/Login', async (req, res) => {
  
  try{
    const {user,password} = req.body
  
    const [userDatas] = await conn.query('SELECT userName,password FROM Users WHERE userName = ?',[user])

    if(userDatas.length === 0){
      res.clearCookie("authToken");
      return res.status(404).json({ message: "Not found user" });
    }
    
    if(userDatas[0].password != password){
      res.clearCookie("authToken");
      return res.status(404).json({ message: "password incorrect" });
      
    }
    
    const token = jwt.sign({userName:user,password:password}, 'tea', { expiresIn: '1h' })
    res.cookie('authToken', token,{httpOnly: true})
    res.json({ message: 'Login successful'})
    
    
    
  }catch(err){
    res.clearCookie("authToken");
    res.json({
      message:"failed to login",
      error:err.message,

    })
  }
})






