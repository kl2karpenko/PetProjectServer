import express from 'express';

const router = express.Router();

/* GET users listing. */
router.post('/', function(req: any, res: any, next: any) {
  const { name, pass, email } = req.body;

  res.send({
    token: "someTokenSend"
  });
});

module.exports = router;
