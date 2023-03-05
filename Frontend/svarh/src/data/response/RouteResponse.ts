import { MapNode, OriginNode, PoiNode } from "./Node";

export interface Route {
    distance: number;
    nodes: MapNode[];
    origin: OriginNode;
    pois: PoiNode[];
}