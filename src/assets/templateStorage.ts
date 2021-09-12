export class TemplateStorage {
    public static readonly allowedContractsHashes: object = {
        "v0.1": "3c3956f3",
    };
    public static readonly trustedContracts: Array<string> = [
        'KT1AD55utWAC27ubY2rQaYXDa7Vi37Ev9vHc',
        'PredefinedContractAddr2',
        'PredefinedContractAddr3'
    ];
    public static readonly predefinedRpcs: object = {
        "Tezos Giganode": "https://mainnet-tezos.giganode.io",
        "Tz stats": "https://rpc.tzstats.com"
    };
}
