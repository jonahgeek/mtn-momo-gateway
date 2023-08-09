const axios = require("axios");

async function momogateway(
  baseURL,
  xReferenceId,
  callbackHost,
  apiKey,
  xTargetEnvironment
) {
  const headers = {
    "X-Reference-Id": xReferenceId,
    "Ocp-Apim-Subscription-Key": apiKey,
  };

  const body = {
    providerCallbackHost: callbackHost,
  };

  try {
    // Step 1: Create API User
    const apiUserDataResponse = await axios.post(`${baseURL}/apiuser`, body, {
      headers,
    });
    const apiUserId = apiUserDataResponse.data.apiUserId;

    // Step 2: Create API Key
    const apiKeyResponse = await axios.post(
      `${baseURL}/apiuser/${apiUserId}/apikey`,
      {},
      { headers }
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
      apiUserData: apiUserDataResponse.data,
      apiKey: apiKeyValue,
      bearerTokenData: tokenResponse.data,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = momogateway;
