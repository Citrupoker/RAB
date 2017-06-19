var router = express.Router()

router.post('/', function (req, res, next) {
    res.json(req.params);
})

module.exports = router;