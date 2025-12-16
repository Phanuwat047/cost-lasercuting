import { GasProfileKey, WorkRow } from "./types";

export const FIXED_RATES = {
    PIECES_PER_YEAR: 345600,
    ITEMS_PER_PAGE: 10,
};

// *** FINAL FIX: ใช้ค่า Gas Rate N2 ที่มีความละเอียดสูงที่สุด (เพื่อให้ Gas Cost/Piece ตรงเป๊ะ) ***
export const GAS_RATES_PER_MIN_FIXED: Record<GasProfileKey, number> = {
    'air': 0.00,
    'o2': 0.5762,
    'n2': 38.24264635194587,
};

export const BASE_AIR_COMP_COST_PER_HR = 5.405;

export const initialWorkRows: WorkRow[] = [
    { work: "Part 1", shape: 'แผ่น (Plate)', dimension: "", thickness: 1.2, length: 6000, nesting: 15, speed: 8.5, timeNest: "0:00", timePart: "0:32" },
];

export const LASER_TO_AUX_MAP: Record<string, { laserKw: number; laserAmpere: number; chillerKw: number; stabilizerKw: number }> = {
    '1500W': { laserKw: 4.6, laserAmpere: 7.7, chillerKw: 1.5, stabilizerKw: 12 },
    '2000W': { laserKw: 6.1, laserAmpere: 10.2, chillerKw: 1.8, stabilizerKw: 12 },
    '3000W': { laserKw: 9.1, laserAmpere: 15.3, chillerKw: 2.5, stabilizerKw: 12 },
    '4000W': { laserKw: 12.1, laserAmpere: 20.5, chillerKw: 4.2, stabilizerKw: 12 },
    '6000W': { laserKw: 18.2, laserAmpere: 30.7, chillerKw: 4.8, stabilizerKw: 18 },
    '8000W': { laserKw: 24.2, laserAmpere: 40.9, chillerKw: 9.5, stabilizerKw: 18 },
    '12000W': { laserKw: 36.4, laserAmpere: 61.4, chillerKw: 12, stabilizerKw: 36 },
    '20000W': { laserKw: 60.6, laserAmpere: 102.4, chillerKw: 16.5, stabilizerKw: 60 },
    '30000W': { laserKw: 90.9, laserAmpere: 153.5, chillerKw: 22, stabilizerKw: 90},
    '40000W': { laserKw: 121.2, laserAmpere: 204.7, chillerKw: 30, stabilizerKw: 120 },
    '60000W': { laserKw: 181.8, laserAmpere: 307, chillerKw: 52, stabilizerKw: 180 },
    '120000W': { laserKw: 363.6, laserAmpere: 614, chillerKw: 105, stabilizerKw: 360 },
};

export const MACHINE_TYPE_OPTIONS: string[] = [
    'Small-Small(1.5-3kW)', 'Small-Medium(1.5-3kW)', 'Small-Large(1.5-3kW)',
    'Medium-Small(4-8kW)', 'Medium-Medium(4-8kW)', 'Medium-Large(4-8kW)',
    'Large-Small(12-30kW)', 'Large-Medium(12-30kW)', 'Large-Large(12-30kW)',
    'Extra Large-Small(40-120kW)', 'Extra Large-Medium(40-120kW)', 'Extra Large-Large(40-120kW)',
];
