const User = require('../models/User');
const { authenticateUser } = require('../utils/web3Auth');

const login = async (req, res) => {
  const { token } = req.body;
  try {
    const userInfo = await authenticateUser(token);
    let user = await User.findOne({ walletAddress: userInfo.walletAddress });
    if (!user) {
      user = new User({ walletAddress: userInfo.walletAddress });
      await user.save();
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login };