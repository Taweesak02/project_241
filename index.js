const orderCon = document.querySelectorAll('.order-container')
const searchCon = document.querySelectorAll('.search-container')
const tableCon = document.querySelectorAll('.table-container')

const orderPageButton = document.getElementById("order-page")
const searchPageButton = document.getElementById("search-page")
const tablePageButton = document.getElementById("table-page")

window.onload = ()=>{
    searchCon.forEach(con=>{
        con.classList.add("hidden")
    })
    tableCon.forEach(con=>{
        con.classList.add("hidden")
    })
}

orderPageButton.addEventListener("click",()=>{
    orderCon.forEach(con=>{
        con.classList.remove("hidden")
    })
    searchCon.forEach(con=>{
        con.classList.add("hidden")
    })
    tableCon.forEach(con=>{
        con.classList.add("hidden")
    })
    
})

searchPageButton.addEventListener("click",()=>{
    orderCon.forEach(con=>{
        con.classList.add("hidden")
    })
    searchCon.forEach(con=>{
        con.classList.remove("hidden")
    })
    tableCon.forEach(con=>{
        con.classList.add("hidden")
    })
    
})

tablePageButton.addEventListener("click",()=>{
    orderCon.forEach(con=>{
        con.classList.add("hidden")
    })
    searchCon.forEach(con=>{
        con.classList.add("hidden")
    })
    tableCon.forEach(con=>{
        con.classList.remove("hidden")
    })
    
})

