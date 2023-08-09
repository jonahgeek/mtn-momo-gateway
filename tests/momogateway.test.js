const chai = require("chai");
const expect = chai.expect;

const momogateway = require("../lib/momogateway");

describe("momogateway", () => {
  it("should create an API user and obtain a bearer token", async () => {
    const baseURL = "https://sandbox.momodeveloper.mtn.com/collection/v1_0";
    const callbackHost =
      "https://webhook.site/de55348f-c6e2-4518-bc48-1661f1efeec9";
    const apiKey = "XXxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const xTargetEnvironment = "Sandbox";

    try {
      const result = await momogateway(
        baseURL,
        callbackHost,
        apiKey,
        xTargetEnvironment
      );
      expect(result).to.have.property("apiKey");
      expect(result).to.have.property("ocp_apim_subscription_key");
      expect(result).to.have.property("x_reference_id");
      expect(result).to.have.property("token");
      expect(result).to.have.property("token_expires_in");
    } catch (error) {
      throw new Error("Test failed:", error);
    }
  });
});
