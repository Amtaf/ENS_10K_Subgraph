**ENS-Ethereum Naming System Subgraph Documentation.**

This documentation supports the building of the ENS subgraph.

**Tasks**

* Subgraph that tracks the 10k club.The 10k club is all ENS from 0000.eth to 9999.eth.
* This subgraph should only index these ENS **domains** and their **owners**.
* and other information about the domains like when they were **renewed** and **registered**, and for **how much**.

***To-Dos***

The diagram and description of the ecosystem in relation to the subgraph.

*What to identify:*

 
| Contract Details       |                                            |
| ---------------------- | ------------------------------------------ |
| Smart Contract Address new | 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85 |
|EthRegistrarController Address  | 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5|
| Name                   |  ENS-Ethereum Naming Service                    |
| Start Block new contract|  15896076                                          |
| old controller startBlock|  15994722                                       |
| Role                   |  provide a way for users to map human readable names to blockchain and non-blockchain resources                                           |

Ecosystem diagram https://drive.google.com/file/d/1A34ur8KzYyQTz6libjiVAQsnjSpfHxZl/view?usp=sharing

**State Stored In smart Contract**

Arrays,Struct,Mappings,Events
Whats being stored?

**ENSRegistry.sol**

 struct Record {
        address owner;
        address resolver;
        uint64 ttl;
    }
mapping(bytes32 => Record) records;

 // Permits modifications only by the owner of the specified node.
    modifier authorised(bytes32 node)
 
 function owner(bytes32 node)
    
 function recordExists(bytes32 node)
 
** Events**

Transfer(node, owner)
    
**BaseRegistrar.sol**

Mapping from token ID to owner
    mapping (uint256 => address) private _tokenOwner;
    
Mapping from owner to number of owned token
    mapping (address => uint256) private _ownedTokensCount;

A map of expiry time
    mapping(uint256 => uint256) expiries;
    
A map of addresses that are authorised to register and renew names.
    mapping(address => bool) public controllers;

**Ecosystem Roles(e.g OnlyOwner,Admin)**

onlyController() modifier

**State Changing Functions**

Gets the owner of the specified token ID
function ownerOf(uint256 tokenId) public view returns (address)

Approves another address to transfer the given token ID
 function approve(address to, uint256 tokenId)
 
Returns whether the specified token/domain exists
function _exists(uint256 tokenId) internal view returns (bool)


**Events and When they are emitted**

***Transfer***

Transfer (address from,address to,uint256 tokenId)

* Get the current owner of the domain from DB(event.params.from).
* Get the Domain from the DB
* Get the account the domain is being transferred to (event.params.to)
* Assign Domain to new owner


***NameRegistered***

NameRegistered ( uint256 id, address owner, uint256 expires)
* Get or create the domain name registered(id).
* Get or create account of name owner(address owner)
* Get the expiry date of the name


***NameRenewed***

NameRenewed (uint256 id, uint256 expires)
* Get the id of the name to be renewed(event.params.id)
* Get the expiry date of the renewed name

**Characteristics of the 10k club ENS**

Should have a name,description,tokenId,creation Date,Registration date,Expiration Date & Attributes

attributes[
{
"trait_type": "Length",
"display_type": "number",
"value": 4
},
]
"name_length": 4,
"segment_length": 4,












