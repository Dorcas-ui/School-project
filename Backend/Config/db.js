const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const connectDB = async () => {
    try // Attempt to connect to MongoDB using the connection string from environment variables
    {
        await mongoose.connect(process.env.MONGO_URI, // hide and Connect to MongoDB using the connection string from environment variables
         {
           /* useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine to avoid deprecation warnings
            */
        }
       );
        console.log('MongoDB connected successfully'); // Log success message if connection is successful
    } 
    catch (error) // Catch any errors that occur during the connection attempt
    {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // Export the connectDB function to be used in other parts of the application