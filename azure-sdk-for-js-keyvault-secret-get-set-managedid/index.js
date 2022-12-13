var http = require('http');
const {DefaultAzureCredential, ManagedIdentityCredential} = require('@azure/identity');
const {SecretClient} = require('@azure/keyvault-secrets');
// // DefaultAzureCredential expects the following three environment variables:
// // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
// // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
// // - AZURE_CLIENT_SECRET: The client secret for the registered application
// const credential = new DefaultAzureCredential();

// ManagedIdentityCredential created by "identity assign" command
const credential = new ManagedIdentityCredential();

// Replace value with your Key Vault name here
const vaultName = "beckie-vault";
const url = `https://${vaultName}.vault.azure.net`;
  
const client = new SecretClient(url, credential);

// Replace value with your secret name here
const secretName = "beckie-secret";

var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    async function main(){
        // Get the secret we created
        const secret = await client.getSecret(secretName);
        response.write(`node env is ${process.env.NODE_ENV} \nsecret value is: ${secret.value} \ntime is: ${new Date()}`);
        response.end();
    }
    main().catch((err) => {
        response.write(`error code: ${err.code}`);
        response.write(`error message: ${err.message}`);
        response.write(`error stack: ${err.stack}`);
        response.end();
    });
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
