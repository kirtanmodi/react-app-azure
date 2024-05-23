import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_APP_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_APP_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_APP_REDIRECT_URI ?? "http://localhost:3000",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
