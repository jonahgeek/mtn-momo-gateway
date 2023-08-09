# mtn-momo-gateway

A Node.js library that simplifies the process of interacting with the MTN Mobile Money (MoMo) API, making it easy to create API users, generate API keys, and obtain bearer tokens for secure transactions.

## Installation

Install the package using npm:

```bash
npm install mtn-momo-gateway
```

## Usage

```javascript
const momoGateway = require("mtn-momo-gateway");

const baseURL = "https://sandbox.momodeveloper.mtn.com/collection/v1_0";
const callbackHost =
  "https://webhook.site/de55348f-c6e2-4518-bc48-1661f1efeec9";
const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const xTargetEnvironment = "Sandbox";

async function main() {
  try {
    const result = await momoGateway(
      baseURL,
      callbackHost,
      apiKey,
      xTargetEnvironment
    );
    console.log("API Key:", result.apiKey);
    console.log("X Reference ID:", result.x_reference_id);
    console.log("Bearer Token:", result.token);
    console.log("Token Expires In:", result.token_expires_in);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```

## API

### `momoGateway(baseURL, callbackHost, apiKey, xTargetEnvironment)`

Creates an API user, generates an API key, and obtains a bearer token for secure transactions.

#### Parameters

- `baseURL` (string): The base URL of the MoMo API.
- `callbackHost` (string): The provider callback host URL.
- `apiKey` (string): The Ocp-Apim-Subscription-Key for authorization.
- `xTargetEnvironment` (string): The target environment (e.g., 'Sandbox').

#### Returns

An object with the following properties:

- `apiKey` (string): The generated API key.
- `x_reference_id` (string): The X Reference ID used for the transaction.
- `token` (string): The bearer token for secure communication.
- `token_expires_in` (number): The expiration time of the token in seconds.

## Generating X Reference ID and Ocp-Apim-Subscription-Key

To create an API User, you need the following things in place:

1. **X-Reference-Id**

   This is used as User ID since the Sandbox is a Mock Environment so we create our own IDs and send them to the sandbox to uniquely identify the user. Get the value for this from [UUID Generator](https://www.uuidgenerator.net/api/version4). Remember to keep this safely as we will use it when configuring our POST request. For example, you might have an X-Reference-Id like: `9f92971b-cd2e-4feb-9053-0b14d53ac4f5`.

2. **Ocp-Apim-Subscription-Key**

   Get this from the Primary or Secondary Key of your "Collections | Enable remote collection of bills, fees, or taxes" subscription. You can find this on your profile page [here](https://momodeveloper.mtn.com/developer). For instance, if your Primary or Secondary Key for your subscription is: `b44728c249c24d8bb11d8b8592f4f5a7`.

Remember to replace the placeholders with your actual values.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
