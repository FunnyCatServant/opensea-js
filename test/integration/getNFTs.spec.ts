import { assert, expect } from "chai";
import { suite, test } from "mocha";
import { sdk } from "./setup";
import { Chain } from "../../src/types";

suite("SDK: NFTs", () => {
  test("Get Asset", async () => {
    const tokenAddress = "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a"; // Chromie Squiggles
    const assetToGet = {
      tokenAddress,
      tokenId: "1",
    };
    const asset = await sdk.api.getAsset(assetToGet);
    assert(asset, "Asset should not be null");
    assert.equal(
      asset.assetContract.address,
      tokenAddress,
      "Contract address should match.",
    );
    assert(asset.animationUrl, "Animation URL should not be null");
  });

  test("Get NFTs By Collection", async () => {
    const response = await sdk.api.getNFTsByCollection("proof-moonbirds");
    assert(response, "Response should exist.");
    assert.equal(response.nfts.length, 50, "Response should include 50 NFTs");
    assert(response.next, "Response should have a next cursor");
  });

  test("Get NFTs By Contract", async () => {
    const tokenAddress = "0x4768cbf202f365fbf704b9b9d397551a0443909b"; // Roo Troop
    const response = await sdk.api.getNFTsByContract(
      Chain.Polygon,
      tokenAddress,
    );
    assert(response, "Response should exist.");
    assert.equal(response.nfts.length, 50, "Response should include 50 NFTs");
    assert(response.next, "Response should have a next cursor");
  });

  test("Get NFTs By Account", async () => {
    const address = "0xfBa662e1a8e91a350702cF3b87D0C2d2Fb4BA57F";
    const response = await sdk.api.getNFTsByAccount(address);
    assert(response, "Response should exist.");
    assert.equal(response.nfts.length, 50, "Response should include 50 NFTs");
    assert(response.next, "Response should have a next cursor");
  });

  test("Get NFT", async () => {
    const tokenAddress = "0x4768cbf202f365fbf704b9b9d397551a0443909b"; // Roo Troop
    const identifier = "2";
    const response = await sdk.api.getNFT(
      Chain.Polygon,
      tokenAddress,
      identifier,
    );
    assert(response.nft, "Response should contain nft.");
    assert.equal(
      response.nft.contract,
      tokenAddress,
      "NFT address should match token address",
    );
    assert.equal(
      response.nft.identifier,
      identifier,
      "NFT address should match token address",
    );
  });

  test("Refresh NFT", async () => {
    const tokenAddress = "0x4768cbf202f365fbf704b9b9d397551a0443909b"; // Roo Troop
    const identifier = "3";
    const response = await sdk.api.refreshNFTMetadata(
      Chain.Polygon,
      tokenAddress,
      identifier,
    );
    assert(response, "Response should exist.");
    expect(response).to.contain(`contract ${tokenAddress}`);
    expect(response).to.contain(`token_id ${identifier}`);
  });
});
