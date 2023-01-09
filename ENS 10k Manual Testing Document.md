# ENS 10K MANUAL TESTING DOCUMENT




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
**Checking for a specific domain name(in the 10k club) owner**

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

**Testing renewed names**


```
{
  renewedNames{
    id
    registration{
      domain{
        id
        name
        expires
      }
    }
  }
}
```

Result

  ```
**** "renewedNames": [
      {
        "id": "15723943-153",
        "registration": {
          "domain": {
            "id": "0xdbb0c2eddba6d539cf8b9907d3b61571093d82f2968cb7a5edabc36082864457",
            "name": "2332",
            "expires": "1760150531"
          }
        }
      },
      {
        "id": "16139896-75",
        "registration": {
          "domain": {
            "id": "0xe007810027ed2be18388284ba951ce9b93150afbcf8f94d304255a9da0a93f32",
            "name": "3831",
            "expires": "1702393540"
          }
        }
      },
      {
        "id": "16296967-238",
        "registration": {
          "domain": {
            "id": "0x6a04473b8c0bbfaef8b0c448ca503a2d9d56f4e8fc84113ba4704d5b4e05b254",
            "name": "1502",
            "expires": "1677453862"
          }
        }
      }
    ]
  
```**
