require('dotenv').config()

let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');
    //socker io

//streamchat
// const { StreamChat } = require('stream-chat');

//  const serverSideClient = new StreamChat(
//      process.env.STREAM_API_KEY,
//      process.env.STREAM_APP_SECRET
//    );
   //connect database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL_HEROKU, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(()=>{
    console.log('Connecting to databasse successfully')
}, err => {
    console.log('Could not connected to database: '+ err)
})
const ratingRoute = require('./routes/rating.route')
const userRoute = require('./routes/user.route')
const verifyRoute = require('./routes/verify.route')
const productRoute = require('./routes/product.route')
const orderRoute = require('./routes/order.route')
const uploadRoute = require('./routes/upload.route')
const categoryRoute = require('./routes/category.route')
const paymentRoute = require('./routes/payment.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());
app.use('/user',userRoute)
app.use('/verify',verifyRoute)
app.use('/product',productRoute)
app.use('/order',orderRoute)
// app.use('/upload', uploadRoute)
app.use('/category',categoryRoute)
app.use('/rating',ratingRoute)
app.use('/payment',paymentRoute)


const port = process.env.PORT || 5500;
const server = app.listen(port, ()=>{
    console.log('Connected to port '+port)
})

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://pokeshop98.herokuapp.com');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
var http = require('https').createServer(app);
//http.listen(serve);
var io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
       });
  });
// app.post('/join', async (req, res) => {
//     const { username } = req.body;
//     try {
//     const token = serverSideClient.createToken(username);
//       await serverSideClient.updateUser(
//         {
//           id: username,
//           name: username,
//         },
//         token
//       );
//     } catch (err) {
//       console.log(err);
//     }

//     const admin = { id: 'pokeshop' };
//     const channel = serverSideClient.channel('team', 'talkshop', {
//       name: 'Talk Shop',
//       created_by: admin,
//     });
  
//     try {
//       await channel.create();
//       await channel.addMembers([username, 'admin']);
//     } catch (err) {
//       console.log(err);
//     }
  
//     return res
//       .status(200)
//       .json({ user: { username }, token, api_key: process.env.STREAM_API_KEY });
//   });
// app.use((req,res,next)=>{
//     next(createError(404));
// })

// app.use((err,req,res,next)=>{
//     console.log(err.message);
//     if(!err.statusCode) err.statusCode = 500
//     res.status(err.statusCode).send(err.message);
// })
