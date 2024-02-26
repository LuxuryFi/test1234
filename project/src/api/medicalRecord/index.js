import axiosClient from '../axios.config';

const medicalRecordAPI = {
  getAll(patient_id) {
    const url = `/patient/record/patient/${patient_id}`;
    return axiosClient.get(url);
  },
  getOne(record_id) {
    const url = `/patient/record/medical/${record_id}`;
    return axiosClient.get(url);
  },
};

export default medicalRecordAPI;
