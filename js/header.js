const userListHeader = JSON.parse(localStorage.getItem("userList"));
const userCode = localStorage.getItem("user");
const headerMenus = document.querySelectorAll(".menu-1");
const menuBox = document.querySelectorAll(".menu-box-space");

headerMenus[0].onclick = () => {
    console.log("클릭");
    location.href = "http://127.0.0.1:5500/html/board.html";
}
headerMenus[1].onclick = () => {
    console.log("클릭");
    location.href = "http://127.0.0.1:5500/html/signin.html";
}
headerMenus[2].onclick = () => {
    console.log("클릭");
    location.href = "http://127.0.0.1:5500/html/signup.html";
}
if(userListHeader != null){
    //로그인 후 메뉴 처리
    const user = userListHeader[userCode];
    if(user != null){
        headerMenus[1].style.display = "none";
        headerMenus[2].style.display = "none";
        menuBox[1].innerHTML = `<span class="menu-2">로그아웃</span>`;
    }
    
    const logoutBtn = document.querySelector(".menu-2");
    if(logoutBtn != null){
        logoutBtn.onclick = () => {
            headerMenus[0].style.display = "inline";
            headerMenus[1].style.display = "inline";
            logoutBtn.style.display = "none";
            localStorage.setItem("user", null);
            location.href = "http://127.0.0.1:5500/html/board.html";
        }
    }
    
}

