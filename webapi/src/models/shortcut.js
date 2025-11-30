import mongoose from 'mongoose';

 const shorcutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  colorId:{
    type: Number,
    required: [true, 'Color ID is required'],
  },
  iconId:{
    type: Number,
    required: [true, 'Icon ID is required'],
  }
 
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const User = mongoose.model('User', userSchema); 
export default User
