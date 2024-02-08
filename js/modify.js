const inputs = document.querySelectorAll("input");
const text = document.querySelector("textarea");
const btn = document.querySelector("button");
const day = new Date();
const boardList = JSON.parse(localStorage.getItem("board"));
const page = localStorage.getItem("page");

const imgBox = document.querySelector(".img-box");
const fileInput = document.querySelector(".file");

const boardImport = boardList[page];
let imgData = boardList[page].img;


load();
function load(){
    if(userCode == "null"){
        alert("로그인이 필요합니다.");
        location.href = "http://127.0.0.1:5500/html/signin.html";
        return;
    }
    
    if(boardImport.img != ""){
        const img = document.createElement('img');
        img.src = boardList[page].img;
        imgBox.appendChild(img);
    }
    inputs[0].value = boardImport.title;
    inputs[1].value = boardImport.username;
    text.value = boardImport.content;

    //로그인 사용자와 글쓴이가 같은지 체크
    if(inputs[1].value != userListHeader[userCode].username){
        alert("본인이 쓴 글만 수정할 수 있습니다.");
        return;
    }
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
            
            if(boardImport.img != ""){
                console.log("실행됨?1111111");
                const imgTag = imgBox.querySelector("img");
                imgTag.src = reader.result;
                imgData = reader.result;
            }else{
                const img = document.createElement('img');
                console.log("경로", reader.result);
                console.log(typeof reader.result);
                img.setAttribute('src',  reader.result);
                imgViewBox.appendChild(img);
                imgData = reader.result;
            }
        }
	}else{
		alert("이미지 파일만 첨부 가능합니다.");
		fileInput.value = "";
		return;
	}
}

btn.onclick = () => {
    const board = {
        title : inputs[0].value,
        content : text.value,
        username : inputs[1].value,
        today : day.getFullYear() + "." + day.getMonth() + 1 + "." + day.getDate(),
        count : 0,
        img : imgData
    };
    boardList.splice(page, 1, board);
    localStorage.setItem("board", JSON.stringify(boardList));
    console.log("수정클릭",boardList[page]);
    location.href = "http://127.0.0.1:5500/html/board.html";
}