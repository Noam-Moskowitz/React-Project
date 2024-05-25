
export class RequestObject{
    constructor(rUrl, rMethod, rPayload, rHeaders ){
        this.rUrl=rUrl;
        this.rMethod=rMethod;
        this.rHeaders=rHeaders;
        this.rPayload=rPayload;
    }
}