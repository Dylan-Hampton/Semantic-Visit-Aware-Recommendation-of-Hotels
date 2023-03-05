export default interface RouteRequest {
    algorithm: number; // 0 - dijkstra, 1 - random-walk, 2 - poi-first, 3 - origin-first
    origins: number; // Max # of origins]
    distance: number; // Meters
    categories: number[]; // Map names of PoIs from City object to the index in this array with the value being the quantity.
}