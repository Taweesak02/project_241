const orderPageButton = document.getElementById("order-page")
const searchPageButton = document.getElementById("search-page")
const tablePageButton = document.getElementById("table-page")
const dashBoardPageButton = document.getElementById("dashboard-page")

const header = document.getElementById("load-header")
const footer = document.getElementById("load-footer")

window.onload = ()=>{
    if(window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("project-241")){
        header.innerHTML = `<div class="header flex">
                                <header><a href="index.html"><i class="fa-solid fa-cubes"></i>  ระบบติดตามคำสั่งซื้อ</a></header>
                            </div>`
    }else{
        header.innerHTML = `<div class="header flex">
                                <header><a href="../index.html"><i class="fa-solid fa-cubes"></i>  ระบบติดตามคำสั่งซื้อ</a></header>
                            </div>`
    }
    footer.innerHTML = `<div class="footer">
                            <footer class="flex">
                                <a id = 'gitlink' href="https://github.com/Taweesak02" target="_blank"><i class="fa-brands fa-github"></i></a>
                            </footer>
                        </div>`
}



orderPageButton.addEventListener("click",()=>{
    if(window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("project-241")){
        window.location.href = "pages/order.html"
    }else
        window.location.href = "order.html"
})

searchPageButton.addEventListener("click",()=>{
    if(window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("project-241")){
        window.location.href = "pages/search.html"
    }else
        window.location.href = "search.html"
})

tablePageButton.addEventListener("click",()=>{
    if(window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("project-241")){
        window.location.href = "pages/table.html"
    }else
        window.location.href = "table.html" 
})

dashBoardPageButton.addEventListener("click",()=>{
    if(window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("project-241")){
        window.location.href = "pages/dashboard.html"
    }else
        window.location.href = "dashboard.html"
})
