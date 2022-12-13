![key-app](https://user-images.githubusercontent.com/233941/207288958-0e1aa7db-f7c3-497f-9fa8-9dad33012d92.png)

# Dev Notes

## structure
- app service plan
- app service
  - local git (git enabled app) for deployment

## app configuration
![app-config](https://user-images.githubusercontent.com/233941/207288949-64c59448-cf02-4454-bf65-6bf4cf4c6ac5.png)

## troubleshooting

<dl>
  <dt>
AKV10000: Request is missing a Bearer or PoP token
  </dt>
  <dd>
dependecy version should be:
<pre>
├── @azure/identity@3.0.1
└── @azure/keyvault-secrets@4.6.0
</pre>
  </dd>
  <dt>
Error: Couldn't detect a version for the platform 'nodejs' in the repo.
  </dt>
  <dd>
add the following configs:
<pre>
"ENABLE_ORYX_BUILD" : "false", 
"SCM_DO_BUILD_DURING_DEPLOYMENT" : "false",
</pre>
  </dd>  
<dt>
No MSI credential available
  </dt>
  <dd>
key vault lib only works on azure env
  </dd>
  <dt>
no platform version, nodejs version
  </dt>
  <dd>
    <pre>
- set `WEBSITE_NODE_DEFAULT_VERSION` in cofig
- update node version in package.json</pre>
<dd>
  </dl>
