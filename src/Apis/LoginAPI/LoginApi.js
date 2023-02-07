import axios from 'axios';
const BASEURL = 'http://210.245.51.29:8088';

export const Post_GetUserToken = data => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/auth/login`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const Get_VerifyTokenFromClient = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/auth/verify-token`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
export const Get_LoginSocial = (token, provider) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/auth/login-social/${provider}/redirect`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
export const Post_Logout = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/auth/logout`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
export const Post_Register = parameters => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/auth/register`, parameters, {
        headers: {
          Accept: 'application/json',
          params: parameters,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
export const Post_RegisterByLink = parameters => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/auth/register-by-link`, parameters, {
        headers: {
          Accept: 'application/json',
          params: parameters,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
