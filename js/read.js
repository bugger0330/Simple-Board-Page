const inputs = document.querySelectorAll("input");
const text = document.querySelector(".content");
const btn = document.querySelector("button");
const imgBox = document.querySelector(".img-box");

const boardList = JSON.parse(localStorage.getItem("board"));
const page = localStorage.getItem("page");

load();
function load(){
    
    const board = boardList[page];
    if(board.img != null){
        const img = document.createElement('img');
        img.src = boardList[page].img;
        imgBox.appendChild(img);
    }

    inputs[0].value = board.title;
    inputs[1].value = board.username;
    text.textContent = board.content;


    board.count = board.count + 1;
    
    boardList.splice(page, 1, board);
    localStorage.setItem("board", JSON.stringify(boardList));


}

btn.onclick = () => {
    if(userCode == "null"){
        alert("로그인이 필요합니다.");
        location.href = "http://127.0.0.1:5500/html/signin.html";
        return;
    }
    //로그인 사용자와 글쓴이가 같은지 체크
    
    if(inputs[1].value != userListHeader[userCode].username){
        alert("본인이 쓴 글만 수정할 수 있습니다.");
        return;
    }
    location.href = "http://127.0.0.1:5500/html/modify.html";
}