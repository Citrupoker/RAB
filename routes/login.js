var router = express.Router()

router.get('/', function (req, res, next) {
    console.log(req.params.id)
    res.send('hello')
})

module.exports = router;