const express = require ('express')
const router = express.Router({mergeParams:true})
const methodOverride = require ('method-override')
const {reviewSchema} = require ('../schema')
const Review = require ('../models/review')
const reviews = require ('../controllers/reviews')
const ExpressError = require ('../utils/ExpressError')
const Campground = require ('../models/campground')
const catchAsync = require ('../utils/catchAsync')
const {isLoggedIn, isReviewAuthor, validateReview} = require ('../middleware')


router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete ('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
