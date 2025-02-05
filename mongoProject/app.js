const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const ejsmate = require('ejs-mate')
const expressError = require('./utils/expressError.js')
// const joi=require('joi')
const Listing=require('./routes/listing.js');
const reviews=require('./routes/review.js');

app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);

app.use(express.static(path.join(__dirname, 'public')));
main().then(() => { console.log('mongo connected') }).catch((e) => { console.log(e) });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}


app.get('/root', (req, res) => {
    res.send('working')
})

app.get('/', (req, res) => {
    res.send('working')
})

app.use('/listing',Listing)
app.use('/listing/:id/reviews',reviews)




// app.get ('/listing',async (req,res)=>{
//     const lis =new listing({
//         title:'mylonge',description:'near intop veiw point',price:12,location:"satpuli sain" ,location:'india'
//     })
//     await lis.save()
//     console.log(lis
//     res.send(lis)
// })
app.all("*", (req, res, next) => {
    next(new expressError(500, "page not found"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "something went wrong" } = err;
    res.status(status).render("./listing/error.ejs", { err })
    // res.status(status).send(message);
    // res.send("<marquee><h2>somthing went wrong!</h2></marquee>")
})
app.listen(8080, () => { console.log("server listening") })
