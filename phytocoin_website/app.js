document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            console.log('Connected account:', accounts[0]);
        } catch (error) {
            console.error('User denied account access:', error);
        }
    } else {
        alert('Please install MetaMask to use this feature!');
    }
});

// Replace with your contract's ABI
const contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "myFunction",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newValue",
                "type": "uint256"
            }
        ],
        "name": "setMyValue",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Replace with your contract's address
const contractAddress = '0xBc85A04C278dFF20e138841B4641c350a7fEBa13';
const validCID = 'QmXMMEuSdwdUaEfyweGpNVmxjX3cX7vgbfGCMfF1aQFabh'
ipfs.files.get(validCID, function(err, files) {
    files.forEach((file) => {
        console.log(file.path)
        console.log("File content >> ", file.content.toString('utf8'))
    })
})
async function interactWithContract() {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        try {
            const result = await contract.methods.myFunction().call({ from: account });
            console.log('Contract read method call result:', result);

            const txResult = await contract.methods.setMyValue(42).send({ from: account });
            console.log('Transaction result:', txResult);
        } catch (error) {
            console.error('Error interacting with contract:', error);
        }
    } else {
        alert('Please install MetaMask to use this feature!');
    }
}

document.getElementById('interactButton').addEventListener('click', interactWithContract);
