import axiosClient from '../axios.config';

const supportAPI = {
  send(support) {
    const url = `/project/support`;
    return axiosClient.post(url, support);
  },
};

export default supportAPI;
