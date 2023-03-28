export interface Algorithm {
    algorithmName: string;
    algorithmNum: number;
}

export const RANDOMWALK = 'Random Walk';
export const DIJKSTRA = 'Dijkstra';
export const EDGEFIRST = 'Edge-first';
export const NODEFIRST = 'Node-first';