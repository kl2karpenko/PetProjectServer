import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req: any, res: any, next: any) {
  console.log('users');
  res.send({
    users: [
      { name: "Lily" },
      { name: "Lily2" }
    ]
  });
});

module.exports = router;
