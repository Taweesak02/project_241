const orderPageButton = document.getElementById("order-page")
const searchPageButton = document.getElementById("search-page")
const tablePageButton = document.getElementById("table-page")
const dashBoardPageButton = document.getElementById("dashboard-page")


orderPageButton.addEventListener("click",()=>{

    window.location.href = "order.html"
})

searchPageButton.addEventListener("click",()=>{

    window.location.href = "search.html"
})

tablePageButton.addEventListener("click",()=>{

    window.location.href = "table.html" 
})

dashBoardPageButton.addEventListener("click",()=>{
    window.location.href = "dashboard.html"
})
