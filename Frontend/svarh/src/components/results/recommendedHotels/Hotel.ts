import { PoiNode } from "../../../data/response/Node";

export default interface Hotel {
    name: string;
    routeLength: number;
    pois: PoiNode[];
}