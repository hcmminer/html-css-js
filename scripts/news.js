"use strict";
// get current setting from current user (guest user or member user)
let getCurrentUser = () => {
  return getDataFromStorage("currentUserSEC") || null;
};
let currentUser = getCurrentUser(); // lau user hien tai tu local
// gia tri mac dinh khi user chua thiet lap hoac user chua login
let newsParam = {
  category: "technology",
  pagesize: 20,
  page: 1,
  country: "us",
  apiKey: "bc7febd476864410b2761c8cd16a87b3",
};
// chi khi nao setting cua cuurent user duoc thiet lap moi thay doi tham so truyen vao cua url API
// dau "?" de phong truong hop "currentUser = null"
if (
  currentUser?.pagesize !== undefined &&
  currentUser?.category !== undefined
) {
  newsParam = {
    ...newsParam,
    category: currentUser.category,
    pagesize: currentUser.pagesize,
  };
}
const VanBan = new User();
// init render data
VanBan.fetchAPI(newsParam);
// event loop: moi khi nguoi dung click vao chuyen trang
btnNext.addEventListener("click", function () {
  newsContainer.innerHTML = "";
  newsParam.page++; // tang page doi so truyen vao truoc khi goi ham
  VanBan.fetchAPI(newsParam);
});
btnPrev.addEventListener("click", function () {
  newsContainer.innerHTML = "";
  newsParam.page--; //  giam page doi so truyen vao truoc khi goi ham
  VanBan.fetchAPI(newsParam);
});
