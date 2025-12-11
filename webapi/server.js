import express from 'express'
import userRouter from './src/api/routes/user.js'
import indexRouter from './src/api/routes/index.js'
import connectDB from './src/config/database.js'
import dotenv from 'dotenv'
import {seedUsers, createSeedUsers} from './scripts/seed.js'
dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/user', userRouter)
app.use('/', indexRouter)

app.get('/error', (req, res) => {
  throw new Error('Simulated server error')
})


connectDB(); //connect to database

createSeedUsers(); //seed

// start server
app.listen(3000, () => {
  console.log('Server is running on port 3000') 
}) 
export default app