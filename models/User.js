"use strict";
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
class User {
  constructor(firstname, lastname, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
  }
  async fetchAPI(args) {
    try {
      await fetch(
        `https://newsapi.org/v2/top-headlines?category=${args.category}&pageSize=${args.pagesize}&page=${args.page}&country=${args.country}&apiKey=${args.apiKey}`
      )
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
    return this;
  }
}
