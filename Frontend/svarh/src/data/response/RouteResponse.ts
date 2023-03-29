import { MapNode, OriginNode, PoiNode } from "./Node";

export default interface Route {
    distance: number;
    nodes: MapNode[];
    origin: OriginNode;
    pois: PoiNode[];
}