const inputs = document.querySelectorAll(".inputs");
const btn = document.querySelectorAll("button");
const userInfo = JSON.parse(localStorage.getItem("userList"));
let checkCount = 0;
const day = new Date();

btn[0].onclick = () => {
    if(inputs[0].value == ""){
        alert("아이디를 입력하세요!");
        inputs[0].focus();
        return;
    }
    
    if(userInfo != null){
        for(let i = 0; i < userInfo.length; i++){
            if(userInfo[i].username == inputs[0].value){
                checkCount += i;
            }
        }
    }
    if(checkCount != 0){
        alert("중복된 아이디 입니다.");
        inputs[0].focus();
        return;
    }else{
        inputs[0].readOnly = true;
        inputs[0].style.backgroundColor = "yellow";    
    }
}

btn[1].onclick = () => {
    if(inputs[0].readOnly == false) {
        alert("아이디 중복확인을 해주세요!");
        inputs[0].focus();
        return;
    } else if(inputs[1].value == "") {
        alert("닉네임을 입력해주세요!");
        inputs[1].focus();
        return;
    } else if(inputs[2].value == "") {
        alert("비밀번호를 입력해주세요!");
        inputs[2].focus();
        return;
    } else if(inputs[3].value == ""){
        alert("비밀번호를 입력해주세요!");
        inputs[3].focus();
        return;
    } else if(inputs[2].value != inputs[3].value){
        alert("비밀번호를 확인해주세요!");
        inputs[2].focus();
        return;
    }
    const user = {
        username : inputs[0].value,
        nickname : inputs[1].value,
        password : inputs[2].value,
        today : day.getFullYear() + "." + day.getMonth() + 1 + "." + day.getDate()
    }
    let userList = null;
    if(userInfo == null){
        userList = new Array();
        userList.push(user);
    }else{
        userList = userInfo;
        userList.push(user);
    }
    userList.push();
    localStorage.setItem("userList", JSON.stringify(userList));
    location.href = "http://127.0.0.1:5500/html/signin.html";
}