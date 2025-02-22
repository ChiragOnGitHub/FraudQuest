const express = require("express");
const http = require("http"); // Added to create an HTTP server
const socketIo = require("socket.io"); // Added for Socket.IO
const app = express();
const passport = require('passport');
const session = require("express-session");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const contactUsRoute = require("./routes/Contact");
const googleRoutes = require("./routes/googleroutes");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const {cloudinaryConnect } = require("./config/cloudinary");
const { generateUploadURL,generateDownloadUrl } =require('./config/s3');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const quiz = require('./routes/quiz');
const quizRoutes = require("./routes/result");


dotenv.config();
const PORT = process.env.PORT || 4000;

require("./config/passport");
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

cloudinaryConnect();

// Passport and session setup
app.use(
    session({
      secret: process.env.SESSION_SECRET || "your_secret_key",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

//routes
app.use("/api/v1/google",googleRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);


app.use('/api/v1/quiz', quiz);
app.use("/api/v1/quiz", quizRoutes);



app.post('/api/v1/s3Url', async (req, res) => {
    try {
        const { fileName } = req.body;
      const { uploadURL, key } = await generateUploadURL(fileName);
      res.status(200).json({
        success: true,
        uploadURL,
        key,
      });
    } catch (error) {
      console.error('Error in upload URL endpoint:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate upload URL. Please try again later.',
      });
    }
  });
  
  app.get('/api/v1/s3Url/download', async (req, res) => {
    try {
      const key = req.query.fileUrl;
  
      if (!key) {
        return res.status(400).json({
          success: false,
          message: 'File URL is required.',
        });
      }
  
      const url = await generateDownloadUrl(key);
      
  
      res.status(200).json({
        success: true,
        url,
      });
    } catch (error) {
      console.error('Error in download URL endpoint:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate download URL. Please try again later.',
      });
    }
  });
  
  

//default route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

const server=app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})



