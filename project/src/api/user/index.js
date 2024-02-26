import axiosClient from "../axios.config";

const userAPI = {
  signIn(email, password) {
    const url = `/project/customer/login`;
    return axiosClient.post(url, {
      email,
      password,
    });
  },
  signUp(newPatient) {
    const url = `/project/customer`;
    return axiosClient.post(url, newPatient);
  },
  getOne(email) {
    const url = `/project/customer/${email}`;
    return axiosClient.get(url);
  },
  verify(code) {
    const url = `/patient/verify`;
    return axiosClient.post(url, code);
  },
  resendCode() {
    const url = `/patient/resend`;
    return axiosClient.get(url);
  },
  update(newInformation) {
    const url = `/project/customer`;
    return axiosClient.put(url, newInformation, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  changePassword(password) {
    const url = `/project/customer/password`;
    return axiosClient.put(url, password);
  },
};

export default userAPI;
