const mongoose = require(`mongoose`);

const ConnectDB = async (URl) => {
  try {
    await mongoose.connect(URl),
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      };
    console.log(`connected to DB sucessfully`);
  } catch (e) {
    console.log(`error connecting to server`);
  }
};
module.exports = ConnectDB;
