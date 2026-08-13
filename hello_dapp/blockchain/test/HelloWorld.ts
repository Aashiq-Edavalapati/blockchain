import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("HelloWorld", function () {
    it("Should return the initial message", async function () {
        const helloWorld = await ethers.deployContract("HelloWorld");
        const message = await helloWorld.getMessage();

        expect(message).to.equal("Hello from BSC!");
    });

    it("Should update the message", async function () {
        const helloWorld = await ethers.deployContract("HelloWorld");

        const tx = await helloWorld.setMessage("Hello GameVault!");

        console.log("Transaction hash:", tx.hash);

        const receipt = await tx.wait();

        console.log("Block number:", receipt?.blockNumber);
        console.log("Gas used:", receipt?.gasUsed);

        const message = await helloWorld.getMessage();

        expect(message).to.equal("Hello GameVault!");
    });
});