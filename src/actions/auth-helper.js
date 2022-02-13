const auth = {
  getToken() {
    return window.localStorage.getItem("auth_token");
  },
  setToken(token) {
    window.localStorage.setItem("auth_token", token);
  },
  setMerchantId(id) {
    window.localStorage.setItem("merchant_id", id);
  },
  setUserId(id) {
    window.localStorage.setItem("user_id", id);
  },
  getUserId() {
    return window.localStorage.getItem("user_id");
  },
  removeToken() {
    window.localStorage.removeItem("auth_token");
  },
  removeMerchantId() {
    window.localStorage.removeItem("merchant_id");
  },
  logout() {
    this.removeToken();
    this.removeMerchantId();
  },
  getMerchantId() {
    return window.localStorage.getItem("merchant_id");
  },
  loggedIn() {
    return window.localStorage.getItem("auth_token");
  },
  setUserInfo(data) {
    window.localStorage.setItem("userInfo", JSON.stringify(data));
  },
  getUserInfo() {
    return JSON.parse(window.localStorage.getItem("userInfo"));
  },
};

export { auth };
