const title = document.querySelector(".title");
const content = document.querySelector(".content");
const username = document.querySelector(".username");
const btn = document.querySelector("button");
const day = new Date();
const fileInput = document.querySelector(".file");
let imgData = null;
const imgViewBox = document.querySelector(".img-box");

load();
function load(){
    if(userCode == "null"){
        alert("로그인이 필요합니다.");
        location.href = "http://127.0.0.1:5500/html/signin.html";
        return;
    }
    username.value = userListHeader[userCode].username;
}

fileInput.onchange = (event) => {
	
	if(event.target.files[0].size > 5242880){ // 5 mb 까지만 가능
		alert("첨부파일은 5mb 이하만 가능합니다.");
		fileInput.value = "";
		return;
	}
	
	console.log("테스트 : " + fileInput.value);
	let fileCut = fileInput.value.split("\\");
	let fileLastName = (fileCut[fileCut.length - 1]).split(".")[1];
	console.log("test1 : " + fileLastName);
	
	if(fileLastName == "gif" || fileLastName == "jpeg" || fileLastName == "jpg" || fileLastName == "png" ||
        fileLastName == "GIF" || fileLastName == "JPEG" || fileLastName == "JPG" || fileLastName == "PNG"){
		const reader = new FileReader();
        
        console.log("실행됨? ");
        console.log("파일 사이즈 : " + (event.target.files[0].size / 1024) + " kb");
        reader.readAsDataURL(event.target.files[0]);
        
        reader.onload = () => {
            const img = document.createElement('img');
            console.log("경로", reader.result);
            console.log(typeof reader.result);
            img.setAttribute('src',  reader.result);
            imgViewBox.appendChild(img);
            imgData = reader.result;
        }
	}else{
		alert("이미지 파일만 첨부 가능합니다.");
		fileInput.value = "";
		return;
	}
}


btn.onclick = () => {
    if(title.value == ""){
        alert("제목을 입력해주세요!");
        title.focus();
        return;
    }else if(username.value == ""){
        alert("이름을 작성해주세요!");
        username.focus();
        return;
    }else if(content.value == ""){
        alert("내용을 작성해주세요!");
        content.focus();
        return;
    }



    const board = {
        title : title.value,
        content : content.value,
        username : username.value,
        today : day.getFullYear() + "." + day.getMonth() + 1 + "." + day.getDate(),
        count : 0,
        img : imgData
    };

    if(JSON.parse(localStorage.getItem("board")) == null){
        const boardArray = new Array();
        boardArray.push(board);
        console.log("1",boardArray);
        localStorage.setItem("board", JSON.stringify(boardArray));
    }else{
        let arrays = JSON.parse(localStorage.getItem("board"));
        arrays.push(board);
        localStorage.setItem("board", JSON.stringify(arrays));
    }

    

    console.log("2",JSON.parse(localStorage.getItem("board")));
    
    if(localStorage.getItem("board").length != 0){
        location.href = "http://127.0.0.1:5500/html/board.html";
    }
}