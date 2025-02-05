const express=require('express')
const router=express.Router({mergeParams:true}) 
//{mergeParams:true} is for merge data(:id) from app.js file  to review.js
const listing = require('../models/listing.js')
const review = require('../models/review.js')
const asyncwrap = require('../utils/asyncwrap.js')
const { reviewSchema } = require('../schema.js')
const expressError = require('../utils/expressError.js')

//middelware for backend to validate reviews
const validateReviews = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map((element) => element.message).join(", ");
        // console.log(error)
        // console.log(errMsg)
        throw new expressError(401, errMsg)
    } else {
        next();
    }
}


//Review fetching
router.post("/",  asyncwrap(async (req, res) => {
    const listingsreview = await listing.findById(req.params.id);
    console.log(req.params,listingsreview)
    let newReview = new review(req.body.review);
    listingsreview.reviews.push(newReview);
    await newReview.save();
    await listingsreview.save();
    console.log(newReview)
    res.redirect(`/listing/${req.params.id}`);
}))

//Delete rout for review
router.delete("/:reviewId", asyncwrap(async (req, res) => {
    let { id, reviewId } = req.params;
    const listRvDel = await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    //using new concept of pull which help to remove item from array
    const reviewDel = await review.findByIdAndDelete(reviewId);
    console.log(listRvDel, reviewDel)
    res.redirect(`/listing/${req.params.id}`)
}))

module.exports=router;

