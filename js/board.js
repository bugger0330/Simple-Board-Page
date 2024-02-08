const boardBody = document.querySelector(".board-content-box");
const boardList = JSON.parse(localStorage.getItem("board"));

const btn = document.querySelector(".btn");
const numBox = document.querySelector(".num-box");
let loadPage = 0;
// 0 1 2 3 4 5 6 - index
// 1 2 3 4 5 6 7 - 글
// 5 10 15 
//( (0 * 5) + 5) = 5
//( (1 * 5) + 5) = 10
load(loadPage);

function load(loadPage){
    if(boardList != null){
        console.log(boardList);
        let innr = "";
        
        for(let i = (loadPage); i < boardList.length; i++){
        // for(let i = boardList.length - 1; i >= 0; i--){
            innr += `
            <div class="board" id="${i}">
                <div class="board-1">
                    <span>${i + 1}</span>
                </div>
                <div class="board-2">
                    <span>${boardList[i].title}</span>
                </div>
                <div class="board-3">
                    <span>${boardList[i].username}</span>
                </div>
                <div class="board-4">
                    <span>${boardList[i].today}</span>
                </div>
                <div class="board-5">
                    <span>${boardList[i].count}</span>
                </div>
            </div>
            `;
        }
        boardBody.innerHTML = innr;

        const pages = document.querySelectorAll(".board");
        pageClick(pages);
        numPage(boardList);
    }else{
        boardBody.innerHTML = `<div class="no-list"><h2>게시글이 없습니다.</h2></div>`;
    }
    
}

btn.onclick = () => {
    if(userCode == "null"){
        console.log("유저정보", userCode);
        alert("로그인이 필요합니다.");
        location.href = "http://127.0.0.1:5500/html/signin.html";
        return;
    }
    location.href = "http://127.0.0.1:5500/html/write.html";
}

function pageClick(pages){
    for(let i = 0; i < pages.length; i++){
        pages[i].onclick = () => {
            localStorage.setItem("page", pages[i].id);
            location.href = "http://127.0.0.1:5500/html/read.html";
        }
    }
}

function numPage(boardList){
    let pageCount = boardList.length;
    let num = 1;
    num = (Math.floor(pageCount / 5)) + 1;
    console.log("페이징", num);
    let innr = "";
    for(let i = 0; i < num; i++){
        innr += `
            <span class="num">${i + 1}</span>
        `;
    }
    numBox.innerHTML = innr;
    const nums = document.querySelectorAll(".num");
    nums[0].style.backgroundColor = "aqua";
    nums[0].style.fontWeight = 700;
    //numClick(nums);
}

function numClick(nums){
    for(let i = 0; i < nums.length; i++){
        nums[i].onclick = () => {
            load(i - 1);
        }
    }
}