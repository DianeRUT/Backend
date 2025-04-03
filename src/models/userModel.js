// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: 8
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   },
//   cart: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Cart'
//   },
//   favorites: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product'
//   }],

//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   tokens: { 
//                accessToken: { type: String }
//             }
  
// });
// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//   });

// export default mongoose.model('User', userSchema);











































































































































// // import mongoose from "mongoose";

// // const{model,Schema}=mongoose;

// // const userschema=Schema(
// //     {
// //         userName:{
// //             type:String,
// //             required:true
// //         },
// //         userEmail:{
// //             type:String,
// //             required:true
// //         },
// //         userPassword:{
// //             type:String,
// //             required:true
// //         },
// //         userRole:{
// //             type:String,
// //             enum:["user","admin"],
// //             default:"user",
// //             required:true
            
// //         },
// //         tokens: { 
// //             accessToken: { type: String }
// //         }
        
// //     }
// // )

// // const User=model("users",userschema);
// // export default User;

import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Method to check if entered password matches the hashed password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  // Skip hashing if password hasn't been modified
  if (!this.isModified("password")) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next() // Proceed with saving the user
})

const User = mongoose.model("User", userSchema)

export default User;

