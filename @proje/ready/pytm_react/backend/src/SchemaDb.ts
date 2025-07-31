import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true ,
        min:10,
        max:25
    },
    phone_number:{
        type:Number,
        required:true ,
        validate: {
            validator: function(v: string) {
                return /^\d{10}$/.test(v);
            },
            message: 'Phone number must be exactly 10 digits'
        }
    },
    password:{
        type:String,
        required: true
    }
})
const User= mongoose.model('User',userSchema)




const accountSchema=new mongoose.Schema({
    balance:Number,
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",required:true
    }

})
const Account =mongoose.model('Account',accountSchema)


export{
    User,
    Account,
}
