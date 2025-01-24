const Web3Auth = require('@web3auth/node-sdk');
const { web3AuthClientId } = require('../config');

const web3auth = new Web3Auth({
  clientId: web3AuthClientId,
  chainConfig: {
    chainNamespace: 'eip155',
    chainId: '0x1', // Ethereum Mainnet
  },
});

const authenticateUser = async (token) => {
  try {
    const userInfo = await web3auth.authenticateUser(token);
    return userInfo;
  } catch (err) {
    console.error('Web3Auth Error:', err);
    throw err;
  }
};

module.exports = { authenticateUser };