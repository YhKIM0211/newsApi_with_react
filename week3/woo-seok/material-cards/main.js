const media = document.querySelector("div.card-media");
const descript = document.querySelector("div.card-descript");
const btns = document.querySelector("div.card-btn");
const options = document.querySelector("div.options");

options.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target.tagName === "INPUT") {
    console.log(event.target.name);
    switch (event.target.name) {
      case "media":
        event.target.checked
          ? (media.style.display = "block")
          : (media.style.display = "none");
        break;
      case "supporting-text":
        event.target.checked
          ? (descript.style.display = "block")
          : (descript.style.display = "none");
        break;
      case "buttons":
        event.target.checked
          ? (btns.style.display = "block")
          : (btns.style.display = "none");
        break;
    }
  }
});
