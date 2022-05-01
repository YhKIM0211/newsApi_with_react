const media = document.querySelector("span.button-media")
const support = document.querySelector("span.button-supporting")
const buttons = document.querySelector("span.button-buttons")
const flag = document.querySelector("section")
const mediaDisplay = document.querySelector(".section-media")
const supportingDisplay = document.querySelector(".section-supporing")
const buttonsDisplay = document.querySelector(".section-buttons")
const closeRight = document.querySelector(".material-icons")

const switchMenu = document.querySelector(".header-left")
const firstTab = switchMenu.querySelector("div:nth-child(1)")
const secondTab = switchMenu.querySelector("div:nth-child(2)")
const smallHead = document.querySelector(".header-right")
const smallMain = document.querySelector(".main-right")
const largeHead = document.querySelector(".header-left")
const largeMain = document.querySelector(".main-left")
const wrap = document.querySelector(".wrap")
const menuButt = largeHead.querySelector(".material-symbols-outlined")


flag.addEventListener('click', changingCard);
switchMenu.addEventListener('click',changingMenu);
closeRight.addEventListener('click',smaller);
menuButt.addEventListener('click',larger);

function changingCard(event){
    if (event.target.className === 'button-media') {
        mediaDisplay.style.display === 'block' ?  mediaDisplay.style.display = 'none' : mediaDisplay.style.display = 'block'
    } else if (event.target.className === 'button-supporting'){
        supportingDisplay.style.display === 'block' ?  supportingDisplay.style.display = 'none' : supportingDisplay.style.display = 'block'
    } else if (event.target.className === 'button-buttons'){
        buttonsDisplay.style.display === 'block' ?  buttonsDisplay.style.display = 'none' : buttonsDisplay.style.display = 'block'
    }
}

function changingMenu(event){
    if (event.target.innerText === 'OUTLINED') {
        firstTab.style.border = 'none';
        secondTab.style.borderBottom = '2px solid black';
    } else if (event.target.innerText === 'ELEVATED') {
        secondTab.style.border = 'none';
        firstTab.style.borderBottom = '2px solid black';
    }
}

function smaller(){
    smallHead.style.display = 'none';
    smallMain.style.display = 'none';
    largeHead.style.width = '758px';
    largeMain.style.width = '758px';
    wrap.style.borderRight = 'none'
    menuButt.style.display = 'block';
}

function larger(){
    smallHead.style.display = '';
    smallMain.style.display = '';
    largeHead.style.width = '';
    largeMain.style.width = '';
    wrap.style.borderRight = ''
    menuButt.style.display = '';
}