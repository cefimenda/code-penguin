import axios from "axios";

export default {
  //USER

  /* Get current user object, has hash and pebbles */
  getUser: function () {
    return axios.post("/fn/users/getUser");
  },
  
  setUserData: function (data) {
    return axios.post("/fn/users/setUserData", data);
  },

  getGithub: function (username) {
    return axios.get(`https://api.github.com/users/${username}`);
  },

  // TRANSACTIONS
  /* Get pebble count given a user or task hash*/
  getPebbles: function (hash) {
    return axios.post("/fn/transactions/tabulate", "\"" + hash + "\"");
  },

  getTransactionHistory: function () {
    return axios.post("/fn/transactions/readUserTransactions");
  },


  //TASKS

  /* Get all tasks on the chain */
  getTasks: function () {
    return axios.post("/fn/tasks/readAllTasks");
  },

  /* Get the task at one specific hash */
  getTask: function (hash) {
    return axios.post("/fn/tasks/readTask", "\"" + hash + "\"");
  },

  /* task: {
      title: (title of the task)
      details: (description of the task)
      tags: (array of tags)
      pebbles (how many pebbles the creator throws down initially)
     } */
  createTask: function (task) {
    task.pebbles = parseInt(task.pebbles) || 0;
    return axios.post("/fn/tasks/createTask", task);
  },
  /* {
      task: (hash of task to back)
      pebbles: (amount of pebbles to be transfered)
     } */
  backTask: function (back) {
    return axios.post("/fn/tasks/backTask", back);
  },

  //SOLUTIONS

  /* Get all solutions linked with one hash (either task or user) */
  getSolutions: function (hash) {
    return axios.post("/fn/solutions/readSolutions", "\"" + hash + "\"");
  },

  /* Get the solution at one specific hash */
  getSolution: function (hash) {
    return axios.post("/fn/solutions/readSolution", "\"" + hash + "\"");
  },

  /* solution: {
      task: (hash of the task it is a solution for)
      link: (github link or similar)
      text: (text to include if code is short or as a N.B. about the link)
     } */
  createSolution: function (solution) {
    return axios.post("/fn/solutions/createSolution", solution);
  },

  /* Get the rewarded solution via the task hash */
  rewardedSolution: function (hash) {
    return axios.post("/fn/solutions/rewardedSolution", "\"" + hash + "\"");
  },

  /* Reward the solution at one specific hash */
  reward: function (hash) {
    return axios.post("/fn/solutions/reward", "\"" + hash + "\"");
  },

  //COMMENTS

  /* Get all the comments linekd with one hash (any entry can theoretically be commented on.)*/
  getComments: function (hash) {
    return axios.post("/fn/comments/readComments", "\"" + hash + "\"");
  },

  /* Get all the comments made by a specific user (given in hash)*/
  getMyComments: function (hash) {
    return axios.post("/fn/comments/readMyComments", "\"" + hash + "\"");
  },

  /* Get the comment at one specific hash */
  getComment: function (hash) {
    return axios.post("/fn/comments/readComment", "\"" + hash + "\"");
  },

  /* comment: {
      page: (hash of the page to comment on -- task or agent or maybe even DNA for like a testimonials page??)
      text: (text of the comment)
     } */
  createComment: function (comment) {
    return axios.post("/fn/comments/createComment", comment);
  }

};
