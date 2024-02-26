import axiosClient from "../axios.config";

const cartAPI = {
  fetchCart() {
    const url = `/project/cart`;
    return axiosClient.get(url);
  },
  addItem(newItem) {
    const url = `/project/cart`;
    return axiosClient.post(url, newItem);
  },
  removeItem(cart_id) {
    const url = `/project/cart/${cart_id}`;
    return axiosClient.delete(url);
  },
  updateItem(data) {
    const url = `/project/cart`;
    return axiosClient.put(url, data);
  },
  deleteItem(cart_id) {
    const url = `/project/cart/${cart_id}`;
    return axiosClient.delete(url);
  },
};

export default cartAPI;
