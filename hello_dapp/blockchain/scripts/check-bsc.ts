import { network } from "hardhat";

const { ethers } = await network.create();

const [signer] = await ethers.getSigners();

console.log("Wallet:", await signer.getAddress());

const balance = await ethers.provider.getBalance(await signer.getAddress());

console.log("Balance:", ethers.formatEther(balance), "tBNB");