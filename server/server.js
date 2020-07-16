require('dotenv').config()

let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL_LOCAL, {
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

// app.use('/api',userRoute)

const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{
    console.log('Connected to port '+port)
})

// app.use((req,res,next)=>{
//     next(createError(404));
// })

// app.use((err,req,res,next)=>{
//     console.log(err.message);
//     if(!err.statusCode) err.statusCode = 500
//     res.status(err.statusCode).send(err.message);
// })