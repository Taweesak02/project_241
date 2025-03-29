const orderPageButton = document.getElementById("order-page")
const searchPageButton = document.getElementById("search-page")
const tablePageButton = document.getElementById("table-page")
const dashBoardPageButton = document.getElementById("dashboard-page")

const header = document.getElementById("load-header")
const footer = document.getElementById("load-footer")

window.onload = ()=>{
    header.innerHTML = `<div class="header flex">
                            <header><a href="index.html">ระบบติดตามคำสั่งซื้อ <i class="fa-solid fa-cubes"></i></a></header>
                        </div>`
    footer.innerHTML = `<div class="footer">
                            <footer class="flex">
                                <a id = 'gitlink' href="https://github.com/Taweesak02" target="_blank"><i class="fa-brands fa-github"></i></a>
                            </footer>
                        </div>`
}



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
