import { Deserializable } from "./deserializable.model";
export class Fare implements Deserializable
{
    id!: string;
    amount!: string;
    currency!: string;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }

}
