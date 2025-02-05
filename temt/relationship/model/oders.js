const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() => console.log('connected')).catch((e) => { console.log(e) })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/demotest")
}

//schema
const OrderSchema = new Schema(
    [
        {
            item: String,
            price: Number
        }
    ]
)
//customers Schema
const customerSchema = new Schema(
    {
        name: String,
        
        orders: [{
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }]
    }
)
customerSchema.post("findOneAndDelete",async(customer)=>{
    // console.log(customer12);
    if(customer.orders.length){
        const res = await Order.deleteMany({_id: {$in: customer.orders }});
        console.log(res);
    }
});
customerSchema.pre("findOneAndDelete", async()=>{
    console.log("pre middilware is on");
});

const Order = mongoose.model("Order", OrderSchema)
const Customer = mongoose.model("Customer", customerSchema)


const addCustomers = async () => {
    const cust1=new Customer({
        name:"akhsy"
    })
    // const cust1 = await Customer.findOne({name:'abhimanu'})
    let ord1 = await Order.findOne({ item: "popcon" })
    console.log(ord1)
    cust1.orders.push(ord1);

    const res = await cust1.save();
    console.log(res)

}
// addCustomers();


//to find by using populate
// const findCustomers=async ()=>{
//     let res=await Customer.find({}).populate("orders")
//     console.log(res[0]);
// }
// findCustomers();

// const addOrders = async () => {
//     let res = await Order.insertMany([
//         { item: "chips", price: 10 },
//         { item: "chocolate", price: 40 },
//         { item: 'popcon', price: 10 },
//         { item: 'namkin', price: 40 }
//     ]
//     )
//     console.log(res)
// }


const delt=async()=>{
    let delData=await Customer.findOneAndDelete({name:'akhsy'})
    // .populate("orders")
    // console.log(delData)

}

// addOrders();
delt();