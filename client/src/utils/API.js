import axios from "axios";

export default {
  getTasks: function() {
    return axios.post("http://localhost:4141/fn/tasks/readAllTasks");
  }
};
