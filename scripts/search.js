"use strict";
const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");

// fetch API
async function fetchAPI(args) {
  let API = `https://newsapi.org/v2/everything?from=${args.from}&qInTitle=${args.qInTitle}&sortBy=${args.sortBy}&q=${inputQuery.value}&pageSize=${args.pagesize}&page=${args.page}&domain=${args.domain}&apiKey=${args.apiKey}`;
  try {
    await fetch(API)
      .then((res) => res.json())
      .then((data) => {
        // neu API tra ve loi lap tuc dung code
        if (data.status === "error") {
          // stop code if API limited
          throw new Error(`${data.message}`);
        }
        pageNum.innerHTML = args.page;
        if (args.page === 1) {
          btnPrev.style.display = "none";
        } else {
          btnPrev.style.display = "inherit";
          btnNext.style.display = "inherit";
        }
        // neu vuot qua bai viet API co the tra ve thi hide nut next
        if (args.pagesize * args.page >= data.totalResults) {
          btnNext.style.display = "none";
        }
        let totals = document.createElement("div");
        totals.innerHTML = `${data.totalResults} kết quả (${
          Math.trunc(Math.random() * 100) / 100
        } giây)`;
        newsContainer.appendChild(totals);
        // render data from api
        for (let index = 0; index < data.articles.length; index++) {
          const element = data.articles[index];
          let card = document.createElement("div");
          card.classList.add(["card", "flex-row", "flex-wrap"]);
          card.innerHTML = `<div class="card mb-3" style="">
              <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${element.urlToImage}" class="card-img"
                alt="${element.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.description}</p>
                <a href="${element.url}" class="btn btn-primary">View</a>
                </div>
              </div>
              </div>
            </div>`;
          newsContainer.appendChild(card);
        }
      });
  } catch (error) {
    newsContainer.innerHTML = error.message; // neu vuot qua so lan reqest thi thong bao cho user tin nhan tu API, de nang cap len tra phi
    console.error(error);
  }
}
let args = {
  qInTitle: "bitcoin",
  sortBy: "popularity",
  from: "2022-06-01",
  q: "bitcoin",
  domain: "24h.com.vn",
  pagesize: 5,
  page: 1,
  apiKey: "7d1638bc8d0f4590832c9d5f6ca72f40",
};
// loop search data
btnSubmit.addEventListener("click", function () {
  newsContainer.innerHTML = "";
  let search = inputQuery.value;
  // validate input
  if (search === "") {
    alert("keyword is required");
  } else {
    // resset page to default : 1
    args.page = 1;
    args.q = search;
    args.qInTitle = search;
    console.log(args);
    fetchAPI(args);
  }
});
// event loop: moi khi nguoi dung click vao chuyen trang
btnNext.addEventListener("click", function () {
  newsContainer.innerHTML = "";
  args.page++; // tang page doi so truyen vao truoc khi goi ham
  fetchAPI(args);
});
btnPrev.addEventListener("click", function () {
  newsContainer.innerHTML = "";
  args.page--; //  giam page doi so truyen vao truoc khi goi ham
  fetchAPI(args);
});
