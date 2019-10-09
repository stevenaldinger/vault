# Vault integration with GCP for Golang and NodeJS

## Environment Variable Configuration

|      Environment Variable        |     Default      | Required (GCP) | Required (other environments) |    Example   | Description |
| -------------------------------- | ---------------- | -------------- | ----------------------------- | -------------------------------------------- | ----------------------------------------------------- |
| `ENVIRONMENT`                    | `"development"`  | No             | No                            | `production`                                         | If set to anything but `production`, prints `trace` level logs |
| `FUNCTION_IDENTITY`              | `""`             | No             | Yes                           | `my-project-123@appspot.gserviceaccount.com`         | Email address associated with service account |
| `GCLOUD_PROJECT`                 | `""`             | No             | Yes                           | `my-project-123`                                     | Project ID the service account belongs to     |
| `GOOGLE_APPLICATION_CREDENTIALS` | `""`             | No             | Yes                           | `service-account/my-project-123.serviceaccount.json` | Path to service account credentials file      |
| `TRACE_ENABLED`                  | `"false"`        | No             | No                            | `true`                                               | Whether or to enable `opencensus` tracing     |
| `TRACE_PREFIX`                   | `"vault"`        | No             | No                            | `my-company`                                         | Prefix added to name of tracing spans         |
| `VAULT_ADDR`                     | `""`             | Yes            | Yes                           | `https://vault.my-company.com`                       | Vault address including protocol              |

## Usage

### Golang

```go
package main

import (
    "context"
    "fmt"
    "github.com/stevenaldinger/vault/pkg/vault"
)

var env = map[string]map[string]string{}

var envArr = []string{
    "secret-engine/data/secret-name",
    "secret-engine-2/data/another-secret-name",
}

func main() {
    ctx := context.Background()

    // name of role created in Vault for GCP auth
    vaultRole := "vault-role-cloud-functions"
    vault.GetSecrets(ctx, vaultRole, &env, envArr)

    fmt.Println("Secret values:", env)
    fmt.Println("secret-key value = " + env["secret-engine/data/secret-name"]["secret-key"])
    fmt.Println("secret-key-2 value = " + env["secret-engine-2/data/another-secret-name"]["secret-key-2"])
}
```

### NodeJS

```js
const vault = require('@aldinger/vault-auto')

const secrets = [
  'secret-engine/data/secret-name',
  'secret-engine-2/data/another-secret-name'
]

const secretData = vault.getSecrets(secrets)

console.log('Secret values:', JSON.stringify(secretData, null, 4))
console.log(`secret-key value = ${secretData['secret-engine/data/secret-name']['secret-key']}`)
console.log(`secret-key-2 value = ${secretData['secret-engine-2/data/another-secret-name']['secret-key-2']}`)
```

# References

- [node-8.16 v8 docs](https://v8docs.nodesource.com/node-8.16/)
- [nodeaddons.com](https://nodeaddons.com/)
