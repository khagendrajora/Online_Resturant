require('dotenv').config()
const express = require('express')
const app = express()
require('./db/connection')
const cors = require('cors');
// app.use(cors());  
const path = require('path')
const bodyParser = require('body-parser')



const port = process.env.PORT || 5000

const _dirname = path.resolve()

const allowedOrigins = ['http://localhost:3000', 'https://online-resturant-nraq.onrender.com','https://online-resturant-ruddy.vercel.app']
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))



const createUser = require('./routes/UserRoute')
const item = require('./routes/ItemRoute')
const orderRoute = require('./routes/OrderRoute')
const paymentRoute = require('./routes/PaymentRoute')




app.use(bodyParser.json())
app.use('/public/uploads', express.static('public/uploads'))
app.use('/api', createUser)
app.use('/api', item)
app.use('/api', orderRoute)
app.use('/api', paymentRoute)

app.use(express.static(path.join(_dirname, '/fooddelivery/build')))
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, 'fooddelivery', 'build', 'index.html'))
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})