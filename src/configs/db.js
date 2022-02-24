const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://saketh:saketh@cluster0.1n7av.mongodb.net/homedepot_login_test?retryWrites=true&w=majority"
  );
};
