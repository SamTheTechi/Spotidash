const mongoose = require(`mongoose`);

const ConnectDB = (URl) => {
  return (
    mongoose.connect(URl),
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );
};
module.exports = ConnectDB;
