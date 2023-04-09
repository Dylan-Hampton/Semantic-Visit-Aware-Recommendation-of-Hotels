export interface DistanceMetric {
    metric: string;
    conversionToMeter: number;
}

export const MILES = 'mi';
export const METERS = 'm';
export const KILOMETERS = 'km';
export const MILETOMETER = Number(1609.344);
export const KILOMETERTOMETER = Number(1000);