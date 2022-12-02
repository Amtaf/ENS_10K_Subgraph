import {  BigInt, Bytes,  ByteArray,ens, ethereum} from "@graphprotocol/graph-ts"

export function createEventID(event:  ethereum.Event): string {
  return event.block.number.toString().concat('-').concat(event.logIndex.toString())
}

//convert hex to byteArray
export function byteArrayFromHex(s: string): ByteArray {
    if(s.length % 2 !== 0) {
      throw new TypeError("Hex string must have an even number of characters")
    }
    let out = new Uint8Array(s.length / 2)
    for(var i = 0; i < s.length; i += 2) {
      out[i / 2] = parseInt(s.substring(i, i + 2), 16) as u32
    }
    return changetype<ByteArray>(out)
  }
//convert uint to ByteArray
export function uint256ToByteArray(i: BigInt): ByteArray {
    let hex = i.toHex().slice(2).padStart(64, '0')
    return byteArrayFromHex(hex)
  }
//check if domain is of length=4 and 
  export function validateNumber(candidate: string): boolean {
    if (candidate.length != 4) return false;
    for (let i = 0; i < candidate.length; i++) {
      let intCandidate = parseInt(candidate.charAt(i));
      if (isNaN(intCandidate)) {
        return false;
      }
    }
    return true;
  }