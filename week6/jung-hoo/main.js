// 필요한 요소들을 가져온다.
const buttonEl = document.querySelector(".search-button");
const resBoxEl = document.querySelector(".result-box");
const filterEl = document.querySelector(".search-filter");

fetch(
  "https://newsapi.org/v2/everything?q=Apple&from=2022-05-16&sortBy=popularity&apiKey=2c157850e4c64fd99aaf77d60228d630"
)
  .then((response) => response.json())
  .then((data) => {
    buttonEl.addEventListener("click", doSearch); // 버튼에 이벤트 추가한다.

    function doSearch() {
      const inputEl = document.querySelector(".search-input");
      resBoxEl.innerHTML = "";

      for (let i = 0; i < data.articles.length; ++i) {
        // 기사의 갯수만큼 반복문으로 비교를 실행한다.
        if (filterEl.value === "제목") {
          // 검색 조건이 제목이라면...
          if (
            // 입력한 값이 기사의 제목에 포함되어 있다면...
            data.articles[i].title
              .toUpperCase() // 대소문자를 구분하지 않기 위해서 잠시 대문자로 바꾼다.
              .includes(inputEl.value.toUpperCase()) // 대소문자를 구분하지 않기 위해서 잠시 대문자로 바꾼다.
          ) {
            // true 값을 반환한 i번째 기사의 제목과 내용, url를 표시한다.
            resBoxEl.innerHTML += `<h3>${data.articles[i].title}</h3>
                <div>${data.articles[i].content}<br/>
                <a href="${data.articles[i].url}">See more</a></div>`;
          }
        } else if (filterEl.value === "내용") {
          // 검색 조건이 내용이라면...
          if (
            // 입력한 값이 기사의 내용에 포함되어 있다면...
            data.articles[i].content
              .toUpperCase() // 대소문자를 구분하지 않기 위해서 잠시 대문자로 바꾼다.
              .includes(inputEl.value.toUpperCase()) // 대소문자를 구분하지 않기 위해서 잠시 대문자로 바꾼다.
          ) {
            // true 값을 반환한 i번째 기사의 제목과 내용, url를 표시한다.
            resBoxEl.innerHTML += `<h3>${data.articles[i].title}</h3>
                <div>${data.articles[i].content}<br/>
                <a href="${data.articles[i].url}">See more</a></div>`;
          }
        }
      }
    }
  });
