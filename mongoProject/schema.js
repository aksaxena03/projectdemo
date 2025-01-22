const joi =require('joi');
module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        price:joi.number().required().min(1),
        location:joi.string().required(),
        image:joi.string().allow("",null)
    }).required()

})


