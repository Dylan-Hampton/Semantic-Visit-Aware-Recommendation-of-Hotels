export interface MapNode {
    lat: number;
    lng: number;
}

export interface OriginNode extends MapNode {
    name: string;
}

export interface PoiNode extends MapNode {
    name: string;
    category: number;
}