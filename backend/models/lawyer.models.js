const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    document: { type: String, required: true }, // Path to uploaded verification document
    isVerified: { type: Boolean, default: false }, // AI will update this if verified
    role: { type: String, enum: ["LAWYER"], default: "LAWYER" }, // Role field for authentication

    // New fields for scheduling & fees
    consultationFee: { type: Number, required: false, default: 0 }, // Fees per session
    availableSlots: [
      {
        day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
        startTime: { type: String }, // Example: "10:00 AM"
        endTime: { type: String }, // Example: "1:00 PM"
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save",function(next){       
    const user = this;   
 
    if(!user.isModified("password")) return;
 
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");
 
    this.salt = salt;
    this.password = hashedPassword;
    next();
 });
 
 userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
    const user = await this.findOne({email });
    if(!user) throw new Error("User not Found!");
    const salt = user.salt
    const hashedPassword = user.password;
    const userProvidedHash =createHmac("sha256",salt)
    .update(password)
    .digest("hex");
 
    if(hashedPassword !== userProvidedHash) throw new Error("Incorrect Password");
     const token = createTokenForUser(user);
     return token;
 });   

 
const Lawyer = mongoose.model("Lawyer", lawyerSchema);

module.exports = Lawyer