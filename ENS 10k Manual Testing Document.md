ENS 10K MANUAL TESTING DOCUMENT


Run the querries below to do a manual test and get the following results:

**Testing Domain Existence**
```

  domains(first: 5) {
    id
    tokenId
    name
    labelName
  }
```
Result

```
"data": {
    "domains": [
      {
        "id": "0x19c02da95bc9b2d61bf360b688101f84a95684c762956b88bf7e24066057e421",
        "tokenId": "11647370995502094349242750088099512694266623433386763013369380615487225324577",
        "name": "1985",
        "labelName": null
      },
```
**Checking for domain owner where the domain name is "1995"**

```
{
  
  ownerAccounts(where: {domain_: {name: "1995"}}) {
    id
    address
   
  }
}
```

Result
```

"data": {
    "ownerAccounts": [
      {
        "id": "0x4f42d9fbe289536cbe35daee928ccd95afaa21d8",
        "address": "0x4f42d9fbe289536cbe35daee928ccd95afaa21d8"
      }
    ]
  }
```
