const Web3 = require("web3")
const Web3 = new Web3("http://localhost:8545")
const web3 = new Web3("https://cloudflare-eth.com")
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
async function getBlockNumber() {
    const latestBlockNumber = await web3.eth.getBlockNumber()
    console.log(latestBlockNumber)
    return latestBlockNumber
  }
  
  getBlockNumber()
  async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()

if (window.ethereum != null) {
    state.web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      await window.ethereum.enable()
      // Accounts now exposed
    } catch (error) {
      // User denied account access...
    }
  }