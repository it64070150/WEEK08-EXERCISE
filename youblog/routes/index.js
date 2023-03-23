const express = require('express')
const router = express.Router()

const article = require('../public/json/article-db.json')

router.get('/', function (req, res, next) {
    var searchtext = req.query.search;
    var resultsearch = article;
    if(searchtext){
        resultsearch = article.filter(item => {
            return item.title.toLowerCase().includes(searchtext.toLowerCase()) || item.author.toLowerCase().includes(searchtext.toLocaleLowerCase())
        })
    }
    var data = { article: resultsearch , title: 'Express' }
    res.render('index', data)
})

// router.get('/blogapi/:id', (req, res) => {
//     res.json(article.find(article => article.id === req.params.id))
// })

router.get('/blog/:id', function (req, res, next) {
    var id = req.params.id
    var result = article.find(item => {
        return item.id === id
    })
    var data = { article: result, title: 'Express' }
    res.render('detail', data)
})
module.exports = router