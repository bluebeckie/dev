![key-app](https://user-images.githubusercontent.com/233941/207288958-0e1aa7db-f7c3-497f-9fa8-9dad33012d92.png)

# Dev Notes

## structure
- app service plan
- app service
  - local git

## app configuration
![app-config](https://user-images.githubusercontent.com/233941/207288949-64c59448-cf02-4454-bf65-6bf4cf4c6ac5.png)

## troubleshooting
```
AKV10000: Request is missing a Bearer or PoP token
```
-> dependecy version should be:
<pre>
├── @azure/identity@3.0.1
└── @azure/keyvault-secrets@4.6.0
</pre>

```
Error: Couldn't detect a version for the platform 'nodejs' in the repo.
```
-> "ENABLE_ORYX_BUILD" : "false", "SCM_DO_BUILD_DURING_DEPLOYMENT" : "false",

```
No MSI credential available
```
-> only works on azure env

```
no platform version, nodejs version
```
-> WEBSITE_NODE_DEFAULT_VERSION
-> update package.json node version
