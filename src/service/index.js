const baseUrl = 'http://localhost:8090/rest-api/';
const defaultToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQURNSU4iLCJleHAiOjE1OTU5NjM0NTZ9.yEgBRjblpfmdjyRPTbz4_78ZR3KfAWuiNIDGN8gTSlg';

const setHeader = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + defaultToken,
    },
  };
};

const setStorage = ({ key, val }) => {
  window.localStorage.setItem(key, val);
};

const getStorage = (key) => window.localStorage.getItem(key) || '';

export { baseUrl, setHeader, setStorage, getStorage };
