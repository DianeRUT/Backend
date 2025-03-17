import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  },
  tokens: { 
               accessToken: { type: String }
            }
  
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  });

export default mongoose.model('User', userSchema);











































































































































// import mongoose from "mongoose";

// const{model,Schema}=mongoose;

// const userschema=Schema(
//     {
//         userName:{
//             type:String,
//             required:true
//         },
//         userEmail:{
//             type:String,
//             required:true
//         },
//         userPassword:{
//             type:String,
//             required:true
//         },
//         userRole:{
//             type:String,
//             enum:["user","admin"],
//             default:"user",
//             required:true
            
//         },
//         tokens: { 
//             accessToken: { type: String }
//         }
        
//     }
// )

// const User=model("users",userschema);
// export default User;