#### A test for `trezor-connect` compatibility with `stellar-sdk`

Sign Stellar Transaction using secret and compare with signature from `trezor-connect`

Files:
- index.js 
- plugin.js - transform StellarSDK.Transaction into TrezorConnect.Transaction copied from ['trezor-connect'](https://github.com/trezor/connect/blob/develop/src/js/plugins/stellar/plugin.js) repository
- fixtures.js

Usage:
- `node index.js` or `node index.js > result.txt`

Result:
- Signed Transaction and compared with `trezor-connect` signatures
- Generated `json` objects with TrezorConnect.stellarSignTransaction parameters for each operation specified in fixtures

Not working (not implemented neither in Trezor firmware or in `trezor-connect`):
- manageBuyOffer
- pathPaymentStrictSend