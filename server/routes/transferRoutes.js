const express = require("express");
const User = require("../models/User");
const router = express.Router();

// POST /transfer - transfer money between users
router.post("/transfer", async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;

  try {
    const sender = await User.findById(fromUserId);
    const receiver = await User.findById(toUserId);

    // Check both users exist
    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check sufficient balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Perform logical updates
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.status(200).json({
      message: `Transferred $${amount} from ${sender.name} to ${receiver.name}`,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance,
    });
  } catch (error) {
    console.error("Transfer failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
