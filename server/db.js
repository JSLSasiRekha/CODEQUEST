const mongoose=require("mongoose");

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB, {
        // Remove deprecated options
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
      });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit process with failure
    }
  };
  module.exports = connectDB;  