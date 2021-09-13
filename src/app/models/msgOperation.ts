export class MsgOperation {

    constructor(blockHeight: number, sender: string, invokedEntrypoint: string, message: string) {
        this.blockHeight = blockHeight;
        this.senderAddress = sender;
        this.invokedEntrypoint = invokedEntrypoint;
        this.message = message;
    }

    public blockHeight: number;
    public senderAddress: string;
    public senderAddressResolved: string | null;
    public invokedEntrypoint: string;
    public message: string;
}
