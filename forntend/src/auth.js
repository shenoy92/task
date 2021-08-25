class Auth {
    login = (cb, token) => {
      localStorage.setItem('auth', token);
      cb();
    }
  
    logout = (cb) => {
      localStorage.removeItem('auth');
      cb();
    }
  
    isAuthenticated = () => {
      return localStorage.getItem('auth') ? true : false;
    }

    getAuthToken = () => {
      return localStorage.getItem('auth');
    }
}
  
export default new Auth();
  