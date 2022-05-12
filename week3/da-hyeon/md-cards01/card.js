// const closeBtn = document.querySelector('.card_aside_closeBtn');
// const card_main = document.querySelector('.card_main');
// closeBtn.addEventListener('click',function(){
//     if(closeBtn.classList.contais('closed')){
//         alert(sf)
//     }else{
        
//     }
// })

//노드준비
const  mediaEle = document.querySelector('.mediaEle');
const  supportingEle = document.querySelector('.supportingEle');
const  buttonsEle = document.querySelector('.buttonsEle');
const options = document.querySelector('.options');

// option따라 card ui변경
options.addEventListener('click', (options) => {
   
    if(options.target.tagName==='INPUT'){
       console.log(options.target.name);
        switch(options.target.name){
            case "media" :
                    if(options.target.checked == true){
                        mediaEle.style.display = "block"
                    }else{
                        mediaEle.style.display = "none"
                    }
            break;
            case "supportingText":
                    if(options.target.checked == true){
                        supportingEle.style.display = "block"
                    }else{
                        supportingEle.style.display = "none"
                    }
            break;
            case "buttons":                    
                    if(options.target.checked == true){
                        buttonsEle.style.display = "block"
                    }else{
                        buttonsEle.style.display = "none"
                    }
            break;
        }
    }
}); 


//닫기버튼 누르면 aside영역 사라짐 
const closeBtn = document.querySelector('.card_aside_closeBtn');
const card_main = document.querySelector('.card_main');
const card_aside = document.querySelector('.card_aside');
closeBtn.addEventListener('click',function(){
    card_aside.style.right = "-26.39%";
    card_aside.style.width = "0%";
    card_aside.style.display = "none";
    card_main.style.width = "100%";
})

//열기버튼 누르면 aside영역 생김
const openBtn = document.querySelector('.card_aside_openBtn');
openBtn.addEventListener('click',function(){
    card_aside.style.right = "0%";
    card_aside.style.width = "26.39%";
    card_aside.style.display = "block";
    card_main.style.width = "73.61%";
})

//탭메뉴 
// tabNav의 li를 누르면 tabNav의 모든 li는 display:none처리.
// tabNav의 li를 누르면 tabNav의 모든 li는 active 클래스명 삭제.
// tabNav 누른 li만 active라는 클래스명을 추가. 