const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

async function momogateway(baseURL, callbackHost, apiKey, xTargetEnvironment) {
  const xReferenceId = uuidv4();

  const headers = {
    "X-Reference-Id": xReferenceId,
    "Ocp-Apim-Subscription-Key": apiKey,
  };

  const body = {
    providerCallbackHost: callbackHost,
  };

  try {
    // Step 1: Create API User
    await axios.post(`${baseURL}/v1_0/apiuser`, body, {
      headers,
    });

    const apiHeaders = {
      "Ocp-Apim-Subscription-Key": apiKey,
    };

    // Step 2: Create API Key
    const apiKeyResponse = await axios.post(
      `${baseURL}/v1_0/apiuser/${xReferenceId}/apikey`,
      {},
      { headers: apiHeaders }
    );
    const apiKeyValue = apiKeyResponse.data.apiKey;

    // Step 3: Create Bearer Token
    const authConfig = {
      username: xReferenceId,
      password: apiKeyValue,
    };

    const tokenHeaders = {
      "Ocp-Apim-Subscription-Key": apiKey,
      "X-Target-Environment": xTargetEnvironment,
    };

    const tokenResponse = await axios.post(
      `${baseURL}/collection/token/`,
      {},
      { auth: authConfig, headers: tokenHeaders }
    );

    return {
      apiKey: apiKeyValue,
      ocp_apim_subscription_key: apiKey,
      x_reference_id: xReferenceId,
      token: tokenResponse.data.access_token,
      token_expires_in: tokenResponse.data.expires_in,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = momogateway;
