const {
  mintTokens,
  ApproveBeforeTransfer,
  ApproveBeforeBurn,
  transferToken,
  burnTokens,
  ApproveOrigin,
  transferTokenOnOrigin,
} = require("../controllers/ChainstackDollars.controller");

const router = require("express").Router();

router.post("/mintTokens", mintTokens);

router.post("/ApproveBeforeTransfer", ApproveBeforeTransfer);

router.post("/transferToken", transferToken);

router.post("/ApproveBeforeBurn", ApproveBeforeBurn);

router.post("/burnTokens", burnTokens);

router.post("/ApproveOrigin", ApproveOrigin);

router.post("/transferTokenOnOrigin", transferTokenOnOrigin);

module.exports = router;
