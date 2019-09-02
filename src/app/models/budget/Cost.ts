import {ICost} from "./i-cost";

export class Cost implements ICost {
    public id: string;
    public category: string;
    public amount = 0.0;
}
