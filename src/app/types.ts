export type WorkShape = 'แผ่น (Plate)' | 'ท่อ (Pipe)';
export type GasProfileKey = "air" | "o2" | "n2";

export interface WorkRow {
    work: string;
    shape: WorkShape;
    dimension: string;
    thickness: string | number;
    length: string | number;
    nesting: string | number;
    speed: string | number;
    timeNest: string | number; // เปลี่ยนเป็น string/number รองรับข้อความ "5:16"
    timePart: string | number;
}

export interface SummaryOptions {
    machineGeometry: 'Plate Cutting (ตัดแผ่น)' | 'Pipe Cutting (ตัดท่อ)';
    gasType: 'Air' | 'Oxygen' | 'Nitrogen';
    nozzle: string;
    cuttingMode: string;
    machineType: string;
    laserPower: string;
}

export interface KwItem {
    id: string;
    name: string;
    kw: number | string;
}

export interface CustomKwRates {
    kwItems: KwItem[];
    laserAmpere: number;
}

export interface CustomRates {
    elecCostPerKwh: number;
    baseSparePartTHBPerMonth: number;
    gasRateTHBPerMin: number;

    loadFactorPct: number;
    workingDaysPerMonth: number;
    hoursPerDay: number;

    airCompCostPerHr: number;
}

export interface DerivedResult {
    totalKw: number;
    totalKwAfterLoad: number;
    totalAmpere: number;
    hoursPerMonth: number;
    minutesPerPiece: number;
    monthlyPieces: number;
    avgNestingParts: number;

    elecPerPiece: number;
    sparePerPiece: number;
    gasPerPiece: number;
    airCoolingPerPiece: number;
    totalPerPiece: number;

    elecPerJob: number;
    sparePerJob: number;
    gasPerJob: number;
    airCoolingPerJob: number;
    totalPerJob: number;

    elecPerMonth: number;
    gasPerMonth: number;
    airCoolingPerMonth: number;
    totalPerMonth: number;
    totalAnnualCost: number;
}
