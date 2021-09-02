export class MsgOperation {

    constructor(blockHeight: number, sender: string, invokedEntrypoint: string, message: string) {
        this.blockHeight = blockHeight;
        this.sender = sender;
        this.invokedEntrypoint = invokedEntrypoint;
        this.message = message;
    }

    public blockHeight: number;
    public sender: string;
    public invokedEntrypoint: string;
    public message: string;
}
