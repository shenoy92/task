import mongoose from 'mongoose';

const userSchema= mongoose.Schema({
    userName:{ type:String, required:true },
    selectedFile:{ type:String },
    email:{ type:String, required:true },
    age:{ type:Number, required:true },
    place:{ type:String, required:true },
    password:{ type:String, required:true },
    id:{ type:String},
});

const UserMessage= mongoose.model("User",userSchema);

export default UserMessage