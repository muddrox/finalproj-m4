var reviewModel = require('../models/reviewModel.js');

function handleCreateReview(req, res) {
	console.log('Creating new review...');

    var title = req.body.title;
    var content = req.body.content;
    var score = req.body.score;

    var review = {title: title, content: content, score:score};

	console.log(`Creating review for ${title}`);

	reviewModel.createReview(review, function(err, result) {
        if ( err ) {
            console.log(err)
        } else {
            console.log(result.status);
            res.json(result);
        }
	});
}

function handleReviewList(req, res) {
    let sortType = req.params.sort;

    console.log('Getting all reviews');

	reviewModel.getReviewList(sortType, function(err, result) {
        if ( err ) {
            console.log(err)
        } else {
            console.log("Retrieved reviews");
            res.json(result);
        }
	});
}

module.exports = {
    handleCreateReview: handleCreateReview,
    handleReviewList: handleReviewList
};