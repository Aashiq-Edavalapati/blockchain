// import { network } from "hardhat";

// const { ethers } = await network.create();

// const contractAddress =
//   "0x8C6CA47DfCdFa9fff74FEe8F5EC495ea23b061C5";

// const helloWorld = await ethers.getContractAt(
//   "HelloWorld",
//   contractAddress
// );

// console.log("Contract:", contractAddress);

// const currentMessage = await helloWorld.getMessage();

// console.log("Current message:", currentMessage);

import { network } from "hardhat";

const { ethers } = await network.create();

const contractAddress =
  "0x8C6CA47DfCdFa9fff74FEe8F5EC495ea23b061C5";

const helloWorld = await ethers.getContractAt(
  "HelloWorld",
  contractAddress
);

console.log("Contract:", contractAddress);

const currentMessage = await helloWorld.getMessage();

console.log("Before:", currentMessage);

console.log("Sending transaction...");

const tx = await helloWorld.setMessage("Hello from my first BSC DApp!");

console.log("Transaction hash:", tx.hash);

const receipt = await tx.wait();

console.log("Confirmed in block:", receipt?.blockNumber);
console.log("Gas used:", receipt?.gasUsed.toString());

const updatedMessage = await helloWorld.getMessage();

console.log("After:", updatedMessage);