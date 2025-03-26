const orderCon = document.getElementById('order-container')
const searchCon = document.getElementById('search-container')
const tableCon = document.getElementById('table-container')

const orderPageButton = document.getElementById("order-page")
const searchPageButton = document.getElementById("search-page")
const tablePageButton = document.getElementById("table-page")

let mode = 'ORDERPAGE'

window.onload = ()=>{

    selectedpage()
    
}

const selectedpage =() =>{
    if(mode == 'ORDERPAGE'){
        orderCon.classList.remove("hidden")
        searchCon.classList.add("hidden")
        tableCon.classList.add("hidden")

        orderPageButton.classList.add("page-selected")
        searchPageButton.classList.remove("page-selected")
        tablePageButton.classList.remove("page-selected")
        
    }
    if(mode == 'SEARCHPAGE'){
        orderCon.classList.add("hidden")
        searchCon.classList.remove("hidden")
        tableCon.classList.add("hidden")

        orderPageButton.classList.remove("page-selected")
        searchPageButton.classList.add("page-selected")
        tablePageButton.classList.remove("page-selected")
    }
    if(mode == 'TABLEPAGE'){
        orderCon.classList.add("hidden")
        searchCon.classList.add("hidden")
        tableCon.classList.remove("hidden")

        orderPageButton.classList.remove("page-selected")
        searchPageButton.classList.remove("page-selected")
        tablePageButton.classList.add("page-selected")
    
    }

}

orderPageButton.addEventListener("click",()=>{
    mode = 'ORDERPAGE'
    selectedpage()
})

searchPageButton.addEventListener("click",()=>{
    mode = 'SEARCHPAGE'
    selectedpage()
    
})

tablePageButton.addEventListener("click",()=>{
    mode = 'TABLEPAGE'
    selectedpage()
    
})

