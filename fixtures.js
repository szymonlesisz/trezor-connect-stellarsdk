
const StellarSdk = require('stellar-sdk');
const Operation = StellarSdk.Operation;
const Asset = StellarSdk.Asset;

const fixtures = [
    /* Transaction Parameters - Memo */
    {
        description: 'memo type text',
        signature: '6290ab96e48967416c0245e9f06d8ddde7660d092a88b06c2d4a83e75d241a00b57fe9c4b53b9624754eeeeb0519368cba92194d96054cd7c31f4a6d391d9706',
        op: Operation.payment({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            amount: '50.0111000',
            asset: Asset.native(),
        }),
        memo: new StellarSdk.Memo(StellarSdk.MemoText, 'foobar'),
    },
    // {
    //     description: 'memo type text (binary)',
    //     signature: false,
    //     op: Operation.setOptions({}),
    //     memo: new StellarSdk.Memo(StellarSdk.MemoText, Buffer.from("TREZOQ", "base64")),
    // },
    // {
    //     description: 'memo type text (binary w/ NULL)',
    //     signature: false,
    //     op: Operation.setOptions({}),
    //     memo: new StellarSdk.Memo(StellarSdk.MemoText, Buffer.from("ABCD", "base64")),
    // },
    {
        description: 'memo type id',
        signature: 'b26eb3e67c0aa59a7f8275726249fb2d862d723d54cbdd24c6d1a7597a0830650fef55b6b4366a59b0978cd3d288e724658c4b0068eb5fc918e1fb6d44b6ea08',
        op: Operation.payment({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            amount: '50.0111000',
            asset: Asset.native(),
        }),
        memo: new StellarSdk.Memo(StellarSdk.MemoID, '1234567890'),
    },
    {
        description: 'memo type hash',
        signature: '584454be04b5f0ff4d298808f75cb9ae4cc255f6ff2b81060085f307eb42056552e7f08a11127ff7053b2dd96cce0e19a3fa2b02e60269b57679108f6cd75b03',
        op: Operation.payment({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            amount: '50.0111000',
            asset: Asset.native(),
        }),
        memo: new StellarSdk.Memo(StellarSdk.MemoHash, '72187adb879c414346d77c71af8cce7b6eaa57b528e999fd91feae6b6418628e'),
    },
    {
        description: 'memo type return',
        signature: '5fb11358e4aee1120c7e2e43d3b285d0a6a24859ceaef390aa9a2cc90097bba005790c02d0e1995466c9dfa89cb2b1347bd26a7b92c76b861abc7e734ac12d00',
        op: Operation.payment({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            amount: '50.0111000',
            asset: Asset.native(),
        }),
        memo: new StellarSdk.Memo(StellarSdk.MemoReturn, '72187adb879c414346d77c71af8cce7b6eaa57b528e999fd91feae6b6418628e'),
    },

    /* Transaction Parameters - Timebounds */
    {
        description: 'payment with timeBounds and memo text',
        signature: '2c56ada05098568381bb5d50bcc5775e251a285e45a2e19ce72ddb2467adbbc6dd600e625e5c6c132178f797110cb85e2ee00587418ead1911c97d41eabbd503',
        op: Operation.payment({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            amount: '50.0111000',
            asset: Asset.native(),
        }),
        memo: new StellarSdk.Memo(StellarSdk.MemoText, 'foobar'),
        timebounds: { minTime: 0, maxTime: 1580800029 },
    },
    {
        description: 'multiple operations with timeBounds and memo text',
        signature: '7683b67f489789ace2f8eccabcc543943da3a64fcd4bd2356ec3c7538eac5c83349e78479a4a886c2bde0ae63307bfd321159e30b4f69a0961b049a8e972a109',
        op: [
            Operation.payment({
                destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
                amount: '50.0111000',
                asset: Asset.native(),
            }),
            Operation.createAccount({
                destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
                startingBalance: '100.0333000',
            }),
            Operation.bumpSequence({
                bumpTo: '9223372036854775807',
            }),
        ],
        memo: new StellarSdk.Memo(StellarSdk.MemoText, 'foobar'),
        timebounds: { minTime: 0, maxTime: 1580800029 },
    },
    {
        description: 'timebounds - minTime only',
        signature: '38099504f25a2578e447cd6257f43343b7b957689d8e8698e94ee66660b6fe32b9ec9848840279026e95953d8fb175b86a0813be7e5e015cd58d51553ec97909',
        op: Operation.setOptions({}),
        timebounds: { minTime: 1000000000, maxTime: 0 },
    },
    {
        description: 'timebounds - minTime and maxTime',
        signature: '57c79a904825c748e30dda9ea7a868d6d939d76a573fe7fc8e174dcacd6581c5a34e5252bcc619b5b141feef21bc9d69da471f7090a17406136e11dbc1b06e04',
        op: Operation.setOptions({}),
        timebounds: { minTime: 1000000000, maxTime: 1580800029 },
    },

    /* Operations - Account Merge */
    {
        description: 'accountMerge',
        signature: 'd91dcf8fcf54f9d5abab2ee8b54acb2e3b40363020d2598140bf04fbcf4fa3463de28a9991ab8ff23dd613bfbfcfbbc5e97bc030ba0e76a458914cebda887b0e',
        op: Operation.accountMerge({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
        }),
    },

    /* Operations - Allow Trust */
    {
        description: 'allowTrust',
        signature: 'a1166e3f66adad2e4f82457e9e15613be589235690504c83a1a332c4ccfada5a44eb9ccd4714a9dd6ef7bf4e120700efd2b901e762eb7baafc94116025f4ed08',
        op: Operation.allowTrust({
            trustor: 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC',
            assetCode: 'XLM',
            authorize: true,
        }),
    },
    {
        description: 'allowTrust',
        signature: 'bb40e85b8e4c771cb18408ef610cffc1aad5411294500da09178157994a17a7c317bb45e795b2d965779f7385d5361508c7e591ae9c9c9f6fdb7e3b1c2d3e105',
        op: Operation.allowTrust({
            trustor: 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC',
            assetCode: 'XLM',
            authorize: false,
        }),
    },

    /* Operations - Bump Sequence */
    {
        description: 'bumpSequence',
        signature: '64c21f1d6869c97760e343f3c0eb647176276d920ed76432d16be41aaa18a5bee3c966c6d874021bb7605a10a85392bcd69bd94c0da933088f8ccc025c0fff06',
        op: Operation.bumpSequence({
            bumpTo: '9223372036854775807',
        }),
    },

    /* Operations - Change Trust */
    {
        description: 'changeTrust',
        signature: 'b39c7bfad1afd8d930b0650d5440f16d0d36249a8dd167a52e925b3d82f441aa785c7443d023a3294978539eb24fcab4b8f3736d031aba2e89cb692fee335e04',
        op: Operation.changeTrust({
            asset: Asset.native(),
            limit: '922337203685.4775807',
        }),
    },
    {
        description: 'changeTrust asset type alphanum4',
        signature: '2ea2db58ff5417878703ab4ce07db09fdd5d97433a39c0c0eb2c7b07477a510592324d89e9ebbb6c812886c89e1c5238b36f09d37ff21cea3f11e7eba9851008',
        op: Operation.changeTrust({
           asset: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            limit: '922337203685.4775807',
        }),
    },
    {
        description: 'changeTrust asset type alphanum12',
        signature: '42913cbacba413ee6bcaec9ee99c982e0c557d941a500902981f05015252313b26a1c1ae9886a795e4ef41f40b5aabd92f464c07428a3c79bfa79a67aa139e06',
        op: Operation.changeTrust({
            asset: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            limit: '922337203685.4775807',
        }),
    },
    {
        description: 'changeTrust with arbitrary limit',
        signature: '544ae7d8f5740b9794e4f42117c30aeb6ca4b82ff4334dea8ff4a06b443e151e8cb5de7aaadc98d0dc4459ca51c02dbe72716d802c8def483b9409550886a700',
        op: Operation.changeTrust({
            asset: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            limit: '1000',
        }),
    },
    {
        description: 'changeTrust (remove trust)',
        signature: 'fd26fef29dc5ce8b011206a277de10c35fdef484e665213c0a034003193d75183e0667a2dd876b17323c56900974080ed28fe51bd6b1ed89095632e38e048400',
        op: Operation.changeTrust({
            asset: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            limit: '0',
        }),
    },

    /* Operations - Create Account */
    {
        description: 'createAccount',
        signature: 'beb458aa43386f9e0dac3474e54ad6ed91d4ec235c89d5747e7f9b93d76a396d5b09b997dd87de45b9364dfd5a79af27afd483d2c7c186dac3a5dcb151e9e307',
        op: Operation.createAccount({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            startingBalance: '100.0333000',
        }),
    },

    /* Operations - Create Passive Sell Offer */
    {
        description: 'createPassiveSellOffer',
        signature: '90b39b6b8450ffc97df736562651b2d82c3fbdef15ea19f7c566fb23c8215aa7b71c4b87d2cc83701d1c1a645a8333896c8bccf6fcd34031e14a844cf8a8680e',
        op: Operation.createPassiveSellOffer({
            selling: Asset.native(),
            buying: Asset.native(),
            amount: '50.0111000',
            price: '50.0111000',
        }),
    },
    {
        description: 'createPassiveSellOffer asset type alphanum4',
        signature: 'b6a81b8bd705d5f013caa5c84eb2c11a2eaf1245c5adb6a4ff31c5493009bb223d76e987aef3f4dbbb992386518df231e9b773829d3dcc7560dead9ec966030c',
        op: Operation.createPassiveSellOffer({
            selling: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            buying: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            amount: '50.0111000',
            price: '50.0111000',
        }),
    },
    {
        description: 'createPassiveSellOffer asset type alphanum12',
        signature: 'ad33e9114d4f2957a5c4dfb552670cf500f67fd6b57d4fda4aad4160c3c645fd6a28f0afb6a517bc678200ee704cb6954093001556359912e46b099d8580570e',
        op: Operation.createPassiveSellOffer({
            selling: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            buying: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            amount: '50.0111000',
            price: '50.0111000',
        }),
    },
    {
        description: 'createPassiveSellOffer asset type combined',
        signature: 'f62241ec7f84371150109d097e4c6fca1202eb95f94ac3400e3d8cc149e0c53cc2db84879279bb83d0b43343eb4e0f6d4181d4ff899cb647aa177ac466889907',
        op: Operation.createPassiveSellOffer({
            selling: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            buying: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            amount: '922337203685.4775807',
            price: '50.0111000',
        }),
    },
    {
        description: 'createPassiveSellOffer { n, d } price',
        signature: '32fdececbc1d1731dce6979d3e0c77cb433b8c12cb242decc9706b7ca6bebf8534bea71603556612cb44badfda230b0f6886ca3f51546e989a97cb91d4871304',
        op: Operation.createPassiveSellOffer({
            selling: Asset.native(),
            buying: Asset.native(),
            amount: '50.0111000',
            price: { n: 1024, d: 100 },
        }),
    },

    /* Operations - Manage Data */
    {
        description: 'manageData',
        signature: '3136bc7e684cec1c58628f6463544a40516b83f3157f3b2088f4ae3fbf922598e14373f5b9c3792549df983e78f3850b44f8d54ddfb46188d2ea149c2eea5b09',
        op: Operation.manageData({
            name: 'data',
            value: 'abc',
        }),
    },
    {
        description: 'manageData Buffer value',
        signature: '0bbd890aceb16e3aeb27827e3663769f80830bd118ebaa899eb957f6b4b7676a4819c6993b2ec794c2cdacf6dfa3731fd9219cc4acf7e14cba0a82c9c21acd0d',
        op: Operation.manageData({
            name: 'data',
            value: Buffer.from("ABCD", "base64"),
        }),
    },
    {
        description: 'manageData remove entry',
        signature: 'c1ebb8d2b23a9145dfec9a465702484ed6130a824dc5d4eb2a1c98f011b463ad9de6eee3d241942aa0aa33a215390f465c375a4c6800e947a1c14b17b3206709',
        op: Operation.manageData({
            name: 'data',
            value: null,
        }),
    },

    /* Operations - Manage Buy Offer */
    // TODO

    /* Operations - Manage Sell Offer */
    {
        description: 'manageSellOffer',
        signature: '7ced75aa5e231cf079b74694307d6fcc84e2326694c13ae74748f10fdbb72653e648472fd6a7484f2d26d2f23fafe9a6495fd7766209d35756dc408fc3fb810b',
        op: Operation.manageSellOffer({
            selling: Asset.native(),
            buying: Asset.native(),
            amount: '50.0111000',
            price: '50.0111000',
            offerId: '101',
        }),
    },
    {
        description: 'manageSellOffer asset type alphanum4',
        signature: 'f88fafa8e3b8ec59a7e6e642a8b5b4065230da685ea48ff79480bad441587442383242a2eb352eeb59a734ffc02e60c856b5f905b0f6862297cd010bc5c8ca03',
        op: Operation.manageSellOffer({
            selling: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            buying: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            amount: '50.0111000',
            price: '50.0111000',
            offerId: '101',
        }),
    },
    {
        description: 'manageSellOffer asset type alphanum12',
        signature: 'e996eecc0112a89859d7b3a8d5ffd8fc1b4f9436ff8889997f20d61cfbc099d5891a28ee619408cc01342554df27a5480e29b13c4cbcc1fd464f583d019aa407',
        op: Operation.manageSellOffer({
            selling: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            buying: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            amount: '50.0111000',
            price: '50.0111000',
            offerId: '101',
        }),
    },
    {
        description: 'manageSellOffer asset type combined',
        signature: '77538169e48b405b45c8a0de6bc317e0ef7326300335da39c9632b56d3b9638ec309b8248032097943d2e82b9083caf30f2fb5fb43e851da7886c60020cd1409',
        op: Operation.manageSellOffer({
            selling: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            buying: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            amount: '922337203685.4775807',
            price: '50.0111000',
            offerId: '101',
        }),
    },
    {
        description: 'manageSellOffer { n, d } price',
        signature: '9e814c4f9c44a4b54451672fd7135b8cc3b2233e811167efb2e9e5f284c291d0ac41a1c9aa252f6893d8db0bb46aa6e78ecfe8edd8993fd8c6b1a243a1c8b40e',
        op: Operation.manageSellOffer({
            selling: Asset.native(),
            buying: Asset.native(),
            amount: '50.0111000',
            price: { n: 1024, d: 100 },
        }),
    },
    {
        description: 'manageSellOffer new offer',
        signature: 'b81209bb37b9408f01762bb276e913697032137bdbc007ba9db883391bc8b6b0b7e3cc299efede60081a343ace6ac9e1036d7466516250784d4eb09b76099104',
        op: Operation.manageSellOffer({
            selling: Asset.native(),
            buying: Asset.native(),
            amount: '50.0111000',
            price: '50.0111000',
        }),
    },
    {
        description: 'manageSellOffer remove offer',
        signature: 'cb974b89e0286c9c616f12cb377ccfcf7a4d7c262a75721013248972a8f2b69b5462bb368c425a3df2f06846ce1de62fb458b0d862feb289af670361621cbc08',
        op: Operation.manageSellOffer({
            selling: Asset.native(),
            buying: Asset.native(),
            amount: '0',
            price: '50.0111000',
            offerId: '101',
        }),
    },

    /* Operations - Path Payment Strict Receive */ 
    {
        description: 'pathPaymentStrictReceive',
        signature: '104a9ccbca49622f02b9029c8f4e4be0ca58fb8d26b42c4a409a99580a0c25878ba5c4073f7936dfed76244355974694fc08c1983fb3f09930d164372ad01a0a',
        op: Operation.pathPaymentStrictReceive({
            sendAsset: Asset.native(),
            sendMax: '50.0111000',
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            destAsset: Asset.native(),
            destAmount: '50.0111000',
        }),
    },
    {
        description: 'pathPaymentStrictReceive asset type alphanum4',
        signature: '212c02000c7ca6bf7df1542a0353b3f79452f3b17e201c68fd6053303f4b4263d0e5d7de33fb2e78a5ff9fc5a8534ca386475aea84d2022083d080af9b559d00',
        op: Operation.pathPaymentStrictReceive({
            sendAsset: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            sendMax: '50.0111000',
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            destAsset: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            destAmount: '50.0111000',
        }),
    },
    {
        description: 'pathPaymentStrictReceive asset type alphanum12',
        signature: '95f44fbc1dfd91927ed461316899cd8aeebec81df11eb217cac2757e7c4ecd1d6249c209eff9223f5e8be816589697c92de933fa23c6178073af0d6aebefca0e',
        op: Operation.pathPaymentStrictReceive({
            sendAsset: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            sendMax: '50.0111000',
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            destAsset: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            destAmount: '50.0111000',
        }),
    },
    {
        description: 'pathPaymentStrictReceive assets type combined',
        signature: 'b4d3b04c55ff0d0565691e1197baa33d245013217f35fdb41b7509672c52549bc3a41d7e77990f17b0d4e435ece31a2610ede619bcf3a2723823d6f143af7402',
        op: Operation.pathPaymentStrictReceive({
            sendAsset: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            sendMax: '50.0111000',
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            destAsset: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            destAmount: '50.0111000',
        }),
    },
    {
        description: 'pathPaymentStrictReceive with path',
        signature: 'c6999c263fa4ab9f22cdfaef42101b4b4706bf17fca3867e6a0a69a1fc7034932d0fb01db610e8e973eef379d4714f44f0b60acf45524bc7aa94fbbdae259e0f',
        op: Operation.pathPaymentStrictReceive({
            sendAsset: Asset.native(),
            sendMax: '50.0111000',
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            destAsset: Asset.native(),
            destAmount: '50.0111000',
            path: [
              new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
              new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
            ]
        }),
    },
    
    /* Operations - Payment */
    {
        description: 'payment',
        signature: 'a4373a8212822cda186edde1e1e070fb9df7db7ee6d01074269fddfd3c49080f37985de8e45af8979bf0016051eb685d4d600ff4c85596e63471de62e785300e',
        op: Operation.payment({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            amount: '50.0111000',
            asset: Asset.native(),
        }),
    },
    {
        description: 'payment with custom asset type alphanum4',
        signature: '02b67274eb57536c21a11b928c92c52163d222cab701bb2770967e4c7176e02452ae2556c39172fdd1eb0e550ebb87f3536f08ea8b0331e237f5a59ece0e6d0f',
        op: Operation.payment({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            amount: '50.0111000',
            asset: new Asset('X', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
        }),
    },
    {
        description: 'payment with custom asset type alphanum12',
        signature: '41920fe1728f7dee0ea59b6e262cab319057f58073bc6a4719c9e076015f1e7da471d38dade177f38fe9085f34c5f1271a6f20aca6a83a75042b1a9c30abf100',
        op: Operation.payment({
            destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
            amount: '50.0111000',
            asset: new Asset('ABCDEFGHIJKL', 'GAUYJFQCYIHFQNS7CI6BFWD2DSSFKDIQZUQ3BLQODDKE4PSW7VVBKENC'),
        }),
    },

    /* Operations - Set Options */
    {
        description: 'setOptions: noop',
        signature: '837c9a09112a111a457a52f81194488c08ed2989059bb597490b1b918380d5ad2b8061f8892068f2ebfb8d51d81b722c274d9a4fec90d5aa071c91dc66e68f0e',
        op: Operation.setOptions({}),
    },
    {
        description: 'setOptions: inflationDest',
        signature: '76f79684a63cc7b6f462a187587e85a354ac9316873f5d4d5ddda7ea81ca1a2bfe4ff2ea07e082cdb989034b69959fb41cd3c96c70fb2f706c83fcb8eb6a8b0c',
        op: Operation.setOptions({
            inflationDest: 'GAFXTC5OV5XQD66T7WGOB2HUVUC3ZVJDJMBDPTVQYV3G3K7TUHC6CLBR'
        }),
    },
    {
        description: 'setOptions: signer with ed25519PublicKey',
        signature: '1007a286e1418549e31fa4a077ffae00796f6a37eff78e1512935208bb0e50b371616768fd2d2525d519c3fda437a23eced28bed93d0e6060f25135478f4ce0a',
        op: Operation.setOptions({
            signer: {
                ed25519PublicKey: 'GBZBQ6W3Q6OECQ2G256HDL4MZZ5W5KSXWUUOTGP5SH7K423EDBRI5DDK',
                weight: 2,
            }
        }),
    },
    {
        description: 'setOptions: signer with sha256Hash',
        signature: 'd9c7d9ca38c1c5209706f1ed1a0e095728da6297935444cfeaf4a1165a3e33de84ac41036343dadc2a4a3b22964d749b7ff810e9fcb3168ac46dd66d4eee060e',
        op: Operation.setOptions({
            signer: {
                sha256Hash: '72187adb879c414346d77c71af8cce7b6eaa57b528e999fd91feae6b6418628e',
                weight: 2,
            },
        }),
    },
    {
        description: 'setOptions: signer with preAuthTx',
        signature: '4492b7d183cbea3e7e484b421d4ad3940aa9bf39df79b3b7ddf95a930ebe493ed8c16af713c9ba2a34ec1b323d5beaacc9eba4a3fe355f440cb4e993db0c3105',
        op: Operation.setOptions({
            signer: {
                preAuthTx: '72187adb879c414346d77c71af8cce7b6eaa57b528e999fd91feae6b6418628e',
                weight: 2,
            }
        }),
    },
    {
        description: 'setOptions: remove signer',
        signature: '82bade0d47be0ec690ba2ee301fcf354d7635dbad108900a82ed7b9fc7f340d76e6e85c00388fe56cc6a3b856b339d6f15abd4d965e4590b0286c7e5f4620907',
        op: Operation.setOptions({
            signer: {
                ed25519PublicKey: 'GBZBQ6W3Q6OECQ2G256HDL4MZZ5W5KSXWUUOTGP5SH7K423EDBRI5DDK',
                weight: 0,
            }
        }),
    },
    {
        description: 'setOptions: medThreshold',
        signature: '136a73d3a3c50790af213de9794718d30c68eeef5d6b687affefea8a6d5e4562c70bbdd9b45a83b4b30168a9ebeb765f8c1fe40f36660b31f18afe66fa6ebe01',
        op: Operation.setOptions({
            medThreshold: 0,
        }),
    },
    {
        description: 'setOptions: Threshold + clearFlags',
        signature: 'c92404e1a4b44c8f8dd718d2c22fe90011e90be03a46b34f5833ae158189150e41e2f214d92faa97680218b13b6d089867974af74db57fe6b7d2666861e14b0f',
        op: Operation.setOptions({
            lowThreshold: 0,
            highThreshold: 3,
            clearFlags: 0,
        }),
    },
    {
        description: 'setOptions: homeDomain',
        signature: 'db6adf70eaf10621396a4a4db27597f323e000ea5c95b6a356a5d469730d78bd34d29d4e845862d39d2dd7e18d469a123727d5b0918dbed948086a47e24b0301',
        op: Operation.setOptions({
            setFlags: 3,
            masterWeight: 4,
            homeDomain: 'hello',
        }),
    },
    {
        description: 'setOptions: unset homeDomain',
        signature: 'ce69d6bced2cc8a4280a22cb9fa109b3b6fd8e9ac06f78e18f7675ba77651dc7435fbbc0d392ab4396a833de37be42100fa3a55f7d8cd56c8252983042045108',
        op: Operation.setOptions({
            homeDomain: '',
        }),
    },

    // new tests
    
    // {
    //     description: 'manageBuyOffer- not working',
    //     signature: '92ba0742649ed964d64bfedc0c3aae690e41670338adce9d9a64577ac56e885716bfc6351ebe8b9f75e48b62eebf50595120fc2c94ca234b77378a74abb41706',
    //     op: Operation.manageBuyOffer({
    //         selling: Asset.native(),
    //         buying: Asset.native(),
    //         buyAmount: '40.0111000',
    //         price: '50.0111000',
    //         offerId: '101',
    //     }),
    // },
    // {
    //     description: 'pathPaymentStrictSend - not working',
    //     signature: '104a9ccbca49622f02b9029c8f4e4be0ca58fb8d26b42c4a409a99580a0c25878ba5c4073f7936dfed76244355974694fc08c1983fb3f09930d164372ad01a0a',
    //     op: Operation.pathPaymentStrictSend({
    //         sendAsset: Asset.native(),
    //         sendAmount: '50.0111000',
    //         destination: 'GBOVKZBEM2YYLOCDCUXJ4IMRKHN4LCJAE7WEAEA2KF562XFAGDBOB64V',
    //         destAsset: Asset.native(),
    //         destMin: '50.0111000',
    //     }),
    // },
];

exports[`default`] = fixtures;
module.exports = exports.default;
