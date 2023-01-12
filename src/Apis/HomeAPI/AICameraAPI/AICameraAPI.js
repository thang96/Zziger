import axios from 'axios';

const CutImageAPI = img => {
  let formData = new FormData();
  const imageJSON = {
    uri: img?.uri,
    type: `image/jpeg`,
    name: 'get_namecard_info.jpeg',
  };

  formData.append('img', imageJSON);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return new Promise((resole, reject) => {
    axios
      .post('http://192.168.1.12:8005/get_card_region', formData, config)
      .then(res => {
        resole(res);
      })
      .catch(function (er) {
        reject(er);
      });
  });
};
const DetailImageAPI = img => {
  let formData = new FormData();
  formData.append('filedata', img);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // timeout: 15000,
  };
  return new Promise((resole, reject) => {
    axios
      .post('http://192.168.1.12:8006/get_namecard_info', formData, config)
      .then(res => {
        resole(res);
      })
      .catch(function (er) {
        reject(er);
      });
  });
};

const AICameraAPI = {CutImageAPI, DetailImageAPI};

export default AICameraAPI;
