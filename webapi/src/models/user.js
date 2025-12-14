import mongoose from 'mongoose';

// Define Schema
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName:{
    type: String,
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Won't be returned in queries by default
  },
  birth: {
    type: Date,
    required: [true, 'Birth date is required'],
    validate: {
      validator: function (value) {
        // Birth date shouldn't be in the future
        return value <= new Date();
      },
      message: 'Birth date cannot be in the future'
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileImageUrl: {
    type: String,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    language: {
      type: String,
      enum: ['en', 'zh-cn', 'zh-tw', 'es', 'fr', 'de'],
      default: 'en'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }, // direct on devices
    },
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true }, // include virtuals when data is output as JSON
  toObject: { virtuals: true } // include virtuals when data is output as Object
});

// Virtual for age
userSchema.virtual('age').get(function(){ //callback func
  if (!this.birth) return null;
  const ageDifMs = Date.now() - this.birth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
})
// Virtual for full name
userSchema.virtual('fullName').get(function(){ //callback func
  if (!this.firstName || !this.lastName) return null;
  
  return this.firstName + ' ' + this.lastName
})

const User = mongoose.model('User', userSchema);
export default User
