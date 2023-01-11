const {
  mintTokens,
  ApproveBeforeTransfer,
  ApproveBeforeBurn,
  transferToken,
  burnTokens,
} = require("../controllers/ChainstackDollars.controller");

const router = require("express").Router();

router.post("/mintTokens", mintTokens);

router.post("/ApproveBeforeTransfer", ApproveBeforeTransfer);

router.post("/transferToken", transferToken);

router.post("/ApproveBeforeBurn", ApproveBeforeBurn);

router.post("/burnTokens", burnTokens);

module.exports = router;
