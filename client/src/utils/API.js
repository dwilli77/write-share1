import axios from "axios";

export default {

  login: function(userData) {
    return axios.post("/api/user", userData);
  },
  register: function(userData) {
      return axios.post("/api/user/new", userData)
  },
  createPod: function(podData) {
    return axios.post("api/pod", podData)
  },
  getMyPods: function(userId) {
    return axios.post("api/pod/mypods", userId)
  },
  getOnePod: function(podId) {
    return axios.post("../api/pod/currentpod", podId)
  },
  newContent: function(content) {
    return axios.post("../api/content", content)
  },
  nextUser: function(data) {
    return axios.post("../api/pod/nextuser", data)
  },
  findAll: function() {
    return axios.get("api/pod")
  },
  joinPod: function(data) {
    return axios.post("../api/pod/join", data)
  },
  findYourTurn: function(data) {
    return axios.post('api/pod/yourturn', data)
  }
};
