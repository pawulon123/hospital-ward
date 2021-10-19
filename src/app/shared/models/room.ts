import { Bed } from "./bed";
export interface Room {

    id: string;
    name: string;
    type: string;
    polygon: string;
    beds: Bed[]


}
