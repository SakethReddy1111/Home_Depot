const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://saketh:saketh@cluster0.jtm69.mongodb.net/UserData?retryWrites=true&w=majority"
  );
};
