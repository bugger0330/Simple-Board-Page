const inputs = document.querySelectorAll(".inputs");
const btn = document.querySelector("button");
const userList = JSON.parse(localStorage.getItem("userList"));

btn.onclick = () => {
    if(inputs[0].value == ""){
        alert("아이디를 입력하세요!");
        inputs[0].focus();
        return;
    }else if(inputs[1].value == ""){
        alert("비밀번호를 입력하세요!");
        inputs[1].focus();
        return;
    }
    
    if(userList != null) {
        for(let i = 0; i < userList.length; i++){
            if(userList[i].username == inputs[0].value){
                if(userList[i].password != inputs[1].value){
                    alert("비밀번호가 틀립니다.");
                    inputs[1].focus();
                    return;
                }
                localStorage.setItem("user", i);
                location.href = "http://127.0.0.1:5500/html/board.html";
            }
        }
    }else{
        alert("사용자 정보가 없습니다.2");
    }
}