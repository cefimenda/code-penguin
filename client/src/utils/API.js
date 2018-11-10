import axios from "axios";

export default {
  getUser: function() {
    return axios.post("http://localhost:4141/fn/tasks/getUser");
  },
  getTasks: function() {
    return axios.post("http://localhost:4141/fn/tasks/readAllTasks");
  }
};
