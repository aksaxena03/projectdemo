const express=require('express')
const router=express.Router()
const listing = require('../models/listing.js')
const asyncwrap = require('../utils/asyncwrap.js')
const { listingSchema } = require('../schema.js')
const expressError = require('../utils/expressError.js')

//middleware=>{validate all data or entries of required block 
// to prevent server crash}
const validatedetail = (req, res, next) => {
    let { error } = listingSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map((element) => element.message).join(", ");
        // console.log(error)
        // console.log(errMsg)
        throw new expressError(errMsg, 401)
    } else {
        next();
    }
}

//home page
router.get('/', asyncwrap(async (req, res) => {
    const data = await listing.find({});
    res.render('./listing/index.ejs', { data })
}))
//new rout
router.get('/new', (req, res) => {
    // res.send("working newq")
    res.render("./listing/newfo.ejs")
})
//show route
router.get('/:id', asyncwrap(async (req, res) => {
    // if (!req.body.listing) {
    //     throw new expressError(401, "page not found")
    // } 
    const { id } = req.params
    // console.log(id)
    const listid = await listing.findById(id).populate("reviews")
    // console.log(listid)
    res.render('./listing/show.ejs', { listid })

}))


//update route
router.get('/:id/edit', asyncwrap(async (req, res) => {
    let { id } = req.params;
    const listid = await listing.findById(id);
    // console.log(listid)
    res.render('./listing/modify.ejs', { listid });
}))
//update in mongo sql
router.put('/:id',validatedetail,asyncwrap(async (req, res) => {
    let { id } = req.params;
    // console.log(id,req.body ,req.body.listings)
    // // let newlisting={...req.body.listings};
    // console.log(newlisting)
    const am=await listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });
    // console.log(am)
    res.redirect(`/listing/${req.params.id}`);
}))




//ADD USINGMONGO create
router.post('/', validatedetail, asyncwrap(async (req, res) => {
    // let {description:description,title:title,image:image,location:location,price:price}=req.body
    //mine
    // let am =["title","location","price"];
    // for (const item of am) {
    //     if(!req.body.item){throw new expressError(401,"data missing")}
    //      {let newlisting = new listing(req.body.listing);
    //         await newlisting.save();
    //         res.redirect('/listing')} 


    let newlisting = new listing(req.body.listing);
    await newlisting.save();
    res.redirect('/listing')



}))

//destroy route
router.delete('/:id', asyncwrap(async (req, res) => {
    let { id } = req.params; // console.log(id)
    const delListing = await listing.findByIdAndDelete(id); //console.log(delListing.reviews.length)
    
    //    delete reviews with listing by me
    // for (const item of delListing.reviews){
    //     console.log(item)
    //     const reviewDel = await review.deleteMany(item)
        
    // }
    res.redirect("/listing");
}))

module.exports=router;