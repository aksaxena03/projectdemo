const express =require('express')
const app=express();
const mongoose=require('mongoose')
const listing=require('./models/listing.js')
const model=require('./init/sample.js')
const path=require('path')
const methodOverride=require('method-override')
const ejsmate=require('ejs-mate')

app.set('views engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsmate);

app.use(express.static(path.join(__dirname,'/public')));
main().then(()=>{console.log('mongo connected')}).catch((e)=>{console.log(e)});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}


app.get('/',(req,res)=>{
    res.send('working')
})
//home page
app.get('/listing',async (req,res)=>{
    const data =await listing.find({});
    res.render('./listing/index.ejs',{data})
})
//new rout
app.get('/listing/new',(req,res)=>{
    // res.send("working newq")
    res.render("./listing/newfo.ejs")
})
//show route
app.get('/listing/:id',async (req,res)=>{
    const {id}=req.params
    // console.log(id)
    const listid=await listing.findById(id);
    // console.log(onedata)
    res.render('./listing/show.ejs',{listid})
})
//ADD USINGMONGO
app.post('/listing',async (req,res)=>{
    // let {description:description,
    //     title:title,
    //     image:image,
    //     location:location,
    //     price:price
    // }=req.body
    // let 
    let newlisting=new listing(req.body.listing);
   await newlisting.save();
   res.redirect('/listing')
})
//update route
app.get('/listing/:id/edit',async (req,res)=>{
    let {id}=req.params;
    const listid=await listing.findById(id);
    // console.log(listid)
    res.render('./listing/modify.ejs',{listid});
})
//update in mongo sql
app.put('/listing/:id',async(req, res)=>{
    let {id}=req.params;
    // let newlisting=listing(req.body.listing);
    // console.log(id)
    await listing.findByIdAndUpdate(id,{...req.body.listings});
    res.redirect('/listing');
})
//destroy route
app.delete('/listing/:id',async (req,res)=>{
    let {id}=req.params;console.log(id)
    const del=await listing.findByIdAndDelete(id);console.log(del)
    res.redirect('/listing');
})


// app.get ('/listing',async (req,res)=>{
//     const lis =new listing({
//         title:'mylonge',description:'near intop veiw point',price:12,location:"satpuli sain" ,location:'india'
//     })
//     await lis.save()
//     console.log(lis);
//     res.send(lis)
// })
app.listen(8080,()=>{console.log("server listening")})
