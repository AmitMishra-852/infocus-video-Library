const express = require('express');
const cors = require('cors');
const historyRouter = require('./Routers/history')
const authRouter = require('./Routers/auth')
const UserRouter = require('./Routers/user')
const postRouter = require('./Routers/post')
const WatchlaterRouter = require('./Routers/WatchLater')
const path = require('path');

const { connectToDb } = require('./Connection/DBconnection')
const app = express()
const PORT = process.env.PORT || 5000;

// dbconnection
connectToDb();

// middleware
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/user', UserRouter)
app.use('/api/post', postRouter)
app.use('/api/history', historyRouter)
app.use('/api/watchLater', WatchlaterRouter)


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client','build', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`server is active now ${PORT}`)
})