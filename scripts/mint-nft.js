require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/.......NFT.sol/MyNFT.json");

console.log(JSON.stringify(contract.abi));
const contractAddress = "0x031ac728C205DAbCF3a2b0E53cDD12E625451eAb";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// Create transaction to mint NFT
async function mintNFT(tokenURI) {
  try {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
    const gasLimit = 500000;

    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce,
      gas: gasLimit,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(
      "The hash of your transaction is:",
      receipt.transactionHash,
      "\nCheck Alchemy's Mempool to view the status of your transaction!"
    );
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err);
  }
}

mintNFT("https://gateway.pinata.cloud/ipfs/bafybeif4gtjpyzp26i5kyqkt3quxve4ppk4z3fu3pvtik2mmtkyhso7cey");
