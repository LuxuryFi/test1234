import axiosClient from '../axios.config';

const articleAPI = {
  getTags() {
    const url = `/article/tag`;
    return axiosClient.get(url);
  },
  getTypes() {
    const url = `/article/type`;
    return axiosClient.get(url);
  },
  getAll(page) {
    const url = `/article?pages=${page}`;
    return axiosClient.get(url);
  },
  getOne(slug) {
    const url = `/article/s/${slug}`;
    return axiosClient.get(url);
  },
  getByTag(tag_id, page) {
    const url = `/article/list/tag/${tag_id}?pages=${page}`;
    return axiosClient.get(url);
  },
  getByType(type_id, page) {
    const url = `/article/list/type/${type_id}?pages=${page}`;
    return axiosClient.get(url);
  },
  getLastest() {
    const url = `/article/list/latest`;
    return axiosClient.get(url);
  },
};

export default articleAPI;
