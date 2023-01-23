export default function authHeader() {
    const token = localStorage.getItem('token');
    // console.log(user);
  
    if (token) {
      return { 'x-access-token': token };
    } else {
      return {};
    }
  }