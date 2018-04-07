const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000

var controller = require('./controllers/reviewController.js')

express()
  .use(express.json())       // to support JSON-encoded bodies
  .use(express.urlencoded({extended:true})) // to support URL-encoded bodies
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getReviews', controller.handleReviewList)
  .post('/createReview', controller.handleCreateReview)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));