const vault = require('@aldinger/vault')

const secrets = [
  'test/data/test'
]

const secretData = vault.getSecrets(secrets)

console.log('Secret map:', JSON.stringify(secretData, null, 4))
