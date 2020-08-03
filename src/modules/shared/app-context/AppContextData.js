class AppContextData {
  user;
  onLogin;
  constructor() {
    this.user = { email: null, firstName: null, lastName: null, id: null };
    this.onLogin = () => {};
  }
}

export default AppContextData;
