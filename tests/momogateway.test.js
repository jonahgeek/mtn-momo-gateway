const momogateway = require("../lib/momogateway");

// Mock axios to prevent actual HTTP requests in tests
jest.mock("axios");

describe("momogateway", () => {
  it("should create API user, API key, and bearer token", async () => {
    // Mock API responses
    const mockApiUserData = { apiUserId: "mockUserId" };
    const mockApiKeyResponse = { apiKey: "mockApiKey" };
    const mockBearerTokenData = { token: "mockToken" };

    // Mock axios.post to return the mock responses
    const axios = require("axios");
    axios.post.mockResolvedValueOnce({ data: mockApiUserData });
    axios.post.mockResolvedValueOnce({ data: mockApiKeyResponse });
    axios.post.mockResolvedValueOnce({ data: mockBearerTokenData });

    // Call momogateway function
    const response = await momogateway(
      "baseURL",
      "xReferenceId",
      "callbackHost",
      "apiKey",
      "xTargetEnvironment"
    );

    // Assertions
    expect(response.apiUserData).toEqual(mockApiUserData);
    expect(response.apiKey).toEqual(mockApiKeyResponse.apiKey);
    expect(response.bearerTokenData).toEqual(mockBearerTokenData);
  });
});
