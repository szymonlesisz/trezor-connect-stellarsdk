const StellarSdk = require('stellar-sdk');
const fixtures = require('./fixtures');
const transformTrezorTransaction = require('./plugin');
const Operation = StellarSdk.Operation;

const SOURCE_ACCOUNT = 'GAK5MSF74TJW6GLM7NLTL76YZJKM2S4CGP3UH4REJHPHZ4YBZW2GSBPW';
const SOURCE_SECRET = 'SDE2YU4V2IYSJIUH7MONDYZTSSLDXV5QDEGUUOLCU4TK7CZWTAXZ5CEG';

// Create Transaction object
const prepareTransaction = (operation, memo, timebounds) => {
    const account = new StellarSdk.Account(SOURCE_ACCOUNT, '4294967295'); // -1. Test factors are set to 4294967296 but builder will increment it
    const builder = new StellarSdk.TransactionBuilder(account, { 
            fee: 100,
            networkPassphrase: StellarSdk.Networks.TESTNET,
            timebounds: timebounds,
        });

    if (!timebounds) {
        builder.setTimeout(timebounds ? undefined : 0);
    }
    builder.addMemo(memo ? memo : StellarSdk.Memo.none());

    if (Array.isArray(operation)) {
        operation.forEach(o => {
            builder.addOperation(o);
        })
    } else {
        builder.addOperation(operation);
    }

    return builder.build();
}

// Sign Transaction using secret
const signWithSecret = (fixture) => {
    const keyPair = StellarSdk.Keypair.fromSecret('SDE2YU4V2IYSJIUH7MONDYZTSSLDXV5QDEGUUOLCU4TK7CZWTAXZ5CEG');
    const transaction = prepareTransaction(fixture.op, fixture.memo, fixture.timebounds);
    transaction.sign(keyPair);
    console.log('TrezorConnect.stellarSignTransaction');
    const json = transformTrezorTransaction("m/44'/148'/0'", transaction);
    console.log(JSON.stringify(json, null, 2));


    const txSignature = transaction.signatures[0].signature().toString('base64');
    const trezorSignature = Buffer.from(fixture.signature, 'hex').toString('base64')

    if (txSignature !== trezorSignature) {
        console.log("tx signature", txSignature);
        console.log("trezor signature", trezorSignature);
    }
    return transaction;
}

// Sign Transaction using signature
const signWithSignature = (fixture) => {
    const transaction = prepareTransaction(fixture.op, fixture.memo, fixture.timebounds);
    try {
        transaction.addSignature(SOURCE_ACCOUNT, Buffer.from(fixture.signature, 'hex').toString('base64'));
    } catch (error) {
        console.log('Hex signature invalid');
    }
    return transaction;
}

let failed = 0;
fixtures.forEach((fixture, index) => {
    console.log('----------');
    console.log(index, 'Test:', fixture.description);
    
    const tx1 = signWithSecret(fixture);
    const tx2 = signWithSignature(fixture);

    const envelope1 = tx1.toEnvelope().toXDR().toString('base64');
    const envelope2 = tx2.toEnvelope().toXDR().toString('base64');

    if (envelope1 == envelope2) {
        console.log('Trezor signature:', fixture.signature);
        console.log(index, "...Passed");
    } else {
        failed++;
        console.error("Failed");
        console.log("Envelope1", envelope1);
        console.log("Envelope2", envelope2);
    }
})

console.log("Total failed:", failed);