const media = document.querySelector("span.button-media")
const support = document.querySelector("span.button-supporting")
const buttons = document.querySelector("span.button-buttons")
const flag = document.querySelector(".wrap .main > .main-right > .opt");
let a = 3;
flag.addEventListener('click', () => a * 2);
console.log(a);