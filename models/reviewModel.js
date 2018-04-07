const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://gh_user:gh_pass@localhost:5432/gh_db';

const pool = new Pool({
	connectionString: connectionString
});

function createReview(review, callback) {
    let title = review.title;
    let content = review.content;
    let score = Number(review.score);

    console.log(`${title} || ${content} || ${score}`);

	pool.query('INSERT INTO reviews (title, content, score) VALUES ($1, $2, $3)', [title, content, score], function(err, res) {
        if (err) {
			callback(err, null);
		} else {
            var result = {
                status: 'success',
                title: title,
                content: content,
                score: score
			};

            callback(null, result);
        }
	})
}

function getReviewList(callback) {

    console.log("attempting to connect to database.");

	pool.query('SELECT *  FROM reviews ORDER BY id DESC', function(err, res) {
        if (err) {
			callback(err, null);
		} else {
            var result = {
                status: 'success',
                list: res.rows
			};

            callback(null, result);
        }
	})
}



module.exports = {
    createReview: createReview,
    getReviewList: getReviewList
};
