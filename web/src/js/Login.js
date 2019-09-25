
import StoreUtil from './Util.js';


export default class Login {

  constructor(){
    this.getDomObjects();
    this.init();
  }

  async init(){
    this.topLoginInfoEl.addEventListener("click", function () {
      this.loginModalEl.style.display = "block";
      setTimeout(function () {
        this.loginModalEl.style.opacity = "1";
      }, 100);
    });
    const inputInfo = await this.getInputInfo();
    const password = this.sendLoginInfo(inputInfo);
    const userId = await this.checkValidity(password);
    await this.succeedLogin(userId).catch(this.failLogin);
  }

  getDomObjects(){
    this.topLoginInfoEl = document.querySelector("#topLoggedinInfo");
    this.loginModalEl = document.querySelector("#loginModal");
    this.loginBtnEl = document.querySelector(".loginButton");
    this.loginIdInputEl = document.querySelector(".loginIDInput");
    this.loginPwInputEl = document.querySelector(".loginPWInput");
    this.reviewUserEl = document.querySelector(".review-user");
    this.loginMsgEl = document.querySelector("#loginMsg");
  }

  sendLoginInfo(userId){
    return new Promise(function (resolve) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          resolve(res[0])}
      };
      xhttp.open("GET", SERVER_BASE_URL + "/users/cf/" + userId["userId"]);
      xhttp.send();
    });
  }

  getInputInfo(){
    return new Promise(function (resolve) {
      this.loginBtnEl.addEventListener("click", function () {
        const idInfo = this.loginIdInputEl.value;
        const packet = {"userId" : idInfo};
        resolve(packet);
      });
    });
  }

  checkValidity(pwd){
    return new Promise(function (resolve, reject) {
      const pwInfo = this.loginPwInputEl.value;
      if (pwd["_id"] === pwInfo){
        resolve(pwd["userId"]);
      }
      else {
        reject('아이디나 비밀번호를 확인해 주세요');
      }
    });
  }

  succeedLogin(userId){
    StoreUtil.makeAfterLoginModal();
    this.loginModalEl.style.display = "none";
    this.topLoginInfoEl.innerText = userId;
    session = userId;
    this.reviewUserEl.innerText = session;
  }

  failLogin(msg){
    this.loginMsgEl = document.querySelector("#loginMsg");
    this.loginMsgEl.innerText = msg;
    const newLogin = new Login();
  }
}
