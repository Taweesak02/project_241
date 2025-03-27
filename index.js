const orderPageButton = document.getElementById("order-page")
const searchPageButton = document.getElementById("search-page")
const tablePageButton = document.getElementById("table-page")



orderPageButton.addEventListener("click",()=>{

    window.location.href = "pages/order.html"
})

searchPageButton.addEventListener("click",()=>{

    window.location.href = "pages/search.html"
})

tablePageButton.addEventListener("click",()=>{

    window.location.href = "pages/table.html" 
})

