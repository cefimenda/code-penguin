import axios from "axios";

export default {
  //USER

  /* Get current user object, has hash and pebbles */
  getUser: function (hash) {
    if(hash){
      return axios.post("/fn/users/getUser", "\"" + hash + "\"");
    }
    return axios.post("/fn/users/getUser");
  },
  
  setUserData: function (data) {
    data.email = "";
    data.password = "";
    return axios.post("/fn/users/setUserData", data);
  },

  getGithub: function (username) {
    return axios.get(`https://api.github.com/users/${username}`);
  },

  getUsernames: function() {
    return axios.post("/fn/users/getLoggablesFromKey");
  },

  logout: function() {
    return axios.post("/fn/users/logout");
  },

  /*
  credentials: {
      email
      password
  }
  */
  login: function(credentials) {
    return axios.post("/fn/users/login", credentials);
  },

  idLogin: function(idHash) {
    return axios.post("/fn/users/idLogin", JSON.stringify(idHash));
  },

  autoLogin: function() {
    return axios.post("/fn/users/autoLogin");
  },

  /*
  * data: {
            username
            login: {
              email
              password
            }
          }
  */
  createAccount: function(data) {
    console.log(data);
    return axios.post("/fn/users/createAccount", data);
  },

  // TRANSACTIONS
  /* Get pebble count given a user or task hash*/
  getPebbles: function (hash) {
    return axios.post("/fn/transactions/tabulate", "\"" + hash + "\"");
  },

  getTransactionHistory: function (hash) {
    if(hash){
      return axios.post("/fn/transactions/readUserTransactions", "\"" + hash + "\"");
    }
    return axios.post("/fn/transactions/readUserTransactions");
  }, 

  getTransactionTitle: function (hash) {
    return axios.post("/fn/transactions/readTransaction", "\"" + hash + "\"");
  },

  distribute: function() {
    return axios.post("/fn/transactions/distribute");
  },

  canDistribute: function() {
    return axios.post("/fn/transactions/canDistribute");
  },


  //TASKS

  /* Get all tasks on the chain */
  getTasks: function () {
    return axios.post("/fn/tasks/readAllTasks");
  },

  /* Get all tasks associated with user on the chain */
  getMyTasks: function (hash) {
    if(hash){
      return axios.post("/fn/tasks/readMyTasks", "\"" + hash + "\"");
    }
    return axios.post("/fn/tasks/readMyTasks");
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

  getTestimonials: function() {
    return axios.post("/fn/comments/testimonials");
  },

  createTestimonial: function(testimonial) {
    return axios.post("/fn/comments/createTestimonial", "\"" + testimonial + "\"");
  },

  /* comment: {
      page: (hash of the page to comment on -- task or agent or maybe even DNA for like a testimonials page??)
      text: (text of the comment)
     } */
  createComment: function (comment) {
    return axios.post("/fn/comments/createComment", comment);
  }

};
