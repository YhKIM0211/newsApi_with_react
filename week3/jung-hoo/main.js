labelEls = document.querySelectorAll(".user_box__buttons label");
imgDivEl = document.querySelector(".media-box__media");
textDivEl = document.querySelector(".media-box__supporting-text");
btnDivEl = document.querySelector(".media-box__buttons");

console.dir(labelEls);
console.dir(imgDivEl);
console.dir(textDivEl);
console.dir(btnDivEl);

for (let i = 0; i < labelEls.length; ++i) {
  labelEls[i].addEventListener("click", ShowContent);
}

function ShowContent() {
  if (this.children[0].checked === true) {
    if (this.textContent === "Media") {
      imgDivEl.style.display = "block";
    } else if (this.textContent === "Supporting text") {
      textDivEl.style.display = "block";
    } else if (this.textContent === "Buttons") {
      btnDivEl.style.display = "block";
    }
  } else {
    if (this.textContent === "Media" && imgDivEl.style.display === "block") {
      imgDivEl.style.display = "none";
    } else if (this.textContent === "Supporting text") {
      textDivEl.style.display = "none";
    } else if (this.textContent === "Buttons") {
      btnDivEl.style.display = "none";
    }
  }
}
