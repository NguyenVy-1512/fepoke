require('dotenv').config()

let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');
    
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
const port = process.env.PORT || 5500;
const ratingRoute = require('./routes/rating.route')
const userRoute = require('./routes/user.route')
const verifyRoute = require('./routes/verify.route')
const productRoute = require('./routes/product.route')
const orderRoute = require('./routes/order.route')
const uploadRoute = require('./routes/upload.route')
const categoryRoute = require('./routes/category.route')
const paymentRoute = require('./routes/payment.route')
const chatRoute = require('./routes/chat.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
const whitelist = ['http://localhost:4200', 'https://pokeshop.cf'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS, PATCH");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });


app.use('/user',userRoute)
app.use('/verify',verifyRoute)
app.use('/product',productRoute)
app.use('/order',orderRoute)
app.use('/noty', chatRoute)
app.use('/category',categoryRoute)
app.use('/rating',ratingRoute)
app.use('/payment',paymentRoute)
//app.use(express.static(__dirname + '/public'));
app.use(cors(corsOptions));
const server = app.listen(port, ()=>{
    console.log('Connected to port '+port)
})
var http = require('https').Server(app) 

//http.listen(0)
var io = require('socket.io').listen(server)//,  {
//     log: false,
//     agent: false,
//     origins: '*:*',
// });
//io.set('origins', 'https://pokeshop.cf');
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
