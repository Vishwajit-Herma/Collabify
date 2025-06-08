import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [ 6, 'Email must be at least 6 characters long' ],
        maxLength: [ 50, 'Email must not be longer than 50 characters' ]
    },
    name: {
        type: String,
       
        minLength: [ 3, 'Name must be at least 3 characters long' ],
        maxLength: [ 50, 'Name must not be longer than 50 characters' ]
    },
    password: {
        type: String,
        select: false,
    },
      fullName: { type: String, required: true },
      profilePicture: { type: String },
      phoneNumber: { type: String, required: true },
      type: { type: String, enum: ["Student", "Employee"], required: true },
      collegeName: { type: String, required: function () { return this.type === "Student"; } },
      branch: { type: String, required: function () { return this.type === "Student"; } },
      year: { type: String, required: function () { return this.type === "Student"; } },
      companyName: { type: String, required: function () { return this.type === "Employee"; } },
      designation: { type: String, required: function () { return this.type === "Employee"; } },
      projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "project" }],
})


userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}


const User = mongoose.model('user', userSchema);

export default User;