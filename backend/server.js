const express = require('express');
// use to enable to send data through HTTP request body
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
// Make "public" Folder Publicly Available
app.use('/public', express.static('public'))

mongoose.connect("mongodb://127.0.0.1:27017/cheetchat",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbCon = mongoose.connection;
// dbCon.on('error', console.error.bind(console, 'connection error:'));

dbCon.once('open',() => {console.log("Mongodb database connection created successfully.")}
);

const userRouter = require('./routes/user.route');

app.use('/users', userRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})
