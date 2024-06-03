const express = require('express')
const router = express.Router();
const userRouter = require('./userRouter')
const electionRouter = require('./electionRouter')
const electorRouter = require('./electorRouter')
const candidateRouter = require('./candidateRouter')
const positionRouter = require('./positionRouter')
const voteRouter = require('./voteRouter')
const path = require("path");

router.use("/users", userRouter);
router.use("/elections", electionRouter)
router.use("/electors", electorRouter)
router.use("/candidates", candidateRouter)
router.use("/positions", positionRouter)
router.use("/votes", voteRouter)

module.exports = router;