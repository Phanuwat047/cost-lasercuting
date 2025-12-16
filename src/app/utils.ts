import {
  CustomKwRates,
  CustomRates,
  DerivedResult,
  WorkRow,
  WorkShape,
} from "./types";

export function thb(n: number) {
  if (!isFinite(n) || n === null) return "-";
  // ใช้ toLocaleString เพื่อให้แสดงผลเป็น THB และรักษาความแม่นยำ 2 ตำแหน่ง
  return n.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function num(n: number) {
  if (!isFinite(n) || n === null) return "-";
  return n.toLocaleString("th-TH", { maximumFractionDigits: 2 });
}

export const genId = () => Math.random().toString(36).slice(2, 9);

// *** UTILITY: แปลงค่า String (เช่น "5:16") หรือ Number ให้เป็น นาที (Decimal) ***
export const parseTimeValueToMinutes = (value: any): number => {
  const strValue = String(value || "0").trim();

  // 1. รองรับรูปแบบ mm:ss หรือ hh:mm:ss
  if (strValue.includes(":")) {
    const parts = strValue.split(":").map((p: string) => parseFloat(p));

    // mm:ss
    if (parts.length === 2) {
      return (parts[0] || 0) + (parts[1] || 0) / 60;
    }
    // hh:mm:ss
    if (parts.length === 3) {
      return parts[0] * 60 + parts[1] + parts[2] / 60;
    }
  }

  // 2. รองรับเลขทศนิยม
  let num = parseFloat(strValue);
  if (isNaN(num)) return 0;

  // ถ้าค่าน้อยกว่า 1 และมีจุดทศนิยมยาวๆ อาจเป็น Excel Time Serial (1.0 = 24ชม.)
  if (num > 0 && num < 1 && String(value).includes(".")) {
    return num;
  }

  return num;
};

export const mapExcelToWorkRow = (data: any[]): WorkRow[] => {
  if (!data || data.length < 2) return [];

  const newRows: WorkRow[] = data
    .slice(1)
    .map((row) => {
      const dimStr = String(row[1] || "").trim();
      let finalShape: WorkShape = "ท่อ (Pipe)";
      const platePattern = /[0-9]+(\.[0-9]+)?\s*[xX]\s*[0-9]+(\.[0-9]+)?/;
      if (platePattern.test(dimStr)) {
        finalShape = "แผ่น (Plate)";
      }

      // *** Logic ใหม่: เก็บค่า Time เป็น String เดิมๆ จาก Excel ***

      // Col 6: Time Nest (หรือ Pierce Count)
      const col6Raw = String(row[6] || "").trim();
      let timeNestStr = "0:00";

      if (col6Raw.includes(":")) {
        // เป็นเวลา "5:16"
        timeNestStr = col6Raw;
      } else if (col6Raw.includes(".") && parseFloat(col6Raw) < 1) {
        // เป็น Excel Serial Date (0.00xxxx) -> แปลงเป็นนาทีแล้วค่อยเก็บ?
        const val = parseFloat(col6Raw);
        if (val >= 1 && !col6Raw.includes(".")) {
          timeNestStr = "0:00"; // Pierce Count, ignore time
        }
      } else {
        // กรณีอื่นๆ เช่น ว่าง หรือ เลข 0
        if (parseFloat(col6Raw) > 0 && !col6Raw.includes(":")) {
          timeNestStr = "0:00";
        }
      }

      // Col 7: Time Part (Process Time)
      const col7Raw = String(row[7] || "").trim();
      let timePartStr = col7Raw || "0:00";

      return {
        work: String(row[0] || ""),
        shape: finalShape,
        dimension: dimStr,
        thickness: parseFloat(String(row[2] || 0)),
        length: parseFloat(String(row[3] || 0)),
        nesting: parseFloat(String(row[4] || 1)),
        speed: parseFloat(String(row[5] || 0)),
        timeNest: timeNestStr, // เก็บเป็น string "5:16"
        timePart: timePartStr, // เก็บเป็น string "0:32"
      };
    })
    .filter((r) => r.work && r.work.length > 0);

  return newRows;
};

// **********************************
// 3. CORE LOGIC (DERIVED COMPUTATION)
// **********************************

export const calculateAllDerived = (
  rows: WorkRow[],
  customRates: CustomRates,
  customKwRates: CustomKwRates
): DerivedResult => {
  // ใช้ parseTimeValueToMinutes แปลง string "5:16" เป็นตัวเลข 5.267 นาที เพื่อคำนวณ
  const totalTimePartOnly = rows.reduce(
    (sum, row) => sum + parseTimeValueToMinutes(row.timePart),
    0
  );
  const totalTimeAll = rows.reduce(
    (sum, row) =>
      sum +
      (parseTimeValueToMinutes(row.timePart) +
        parseTimeValueToMinutes(row.timeNest)),
    0
  );

  const totalNestingParts = rows.reduce(
    (sum, row) => sum + parseFloat(String(row.nesting) || "1"),
    0
  );
  const totalJobs = rows.length || 1;

  const minutesPerJob = totalTimeAll / totalJobs;
  const cuttingMinutesPerJob = totalTimePartOnly / totalJobs;

  const minutesPerPiece =
    totalNestingParts > 0 ? totalTimeAll / totalNestingParts : 0;
  const avgNestingParts = totalJobs > 0 ? totalNestingParts / totalJobs : 1;

  const pph = minutesPerPiece > 0 ? 60 / minutesPerPiece : 0;

  const hoursPerMonthPossible =
    customRates.hoursPerDay * customRates.workingDaysPerMonth;
  const hoursPerMonth =
    (hoursPerMonthPossible * customRates.loadFactorPct) / 100.0;
  const monthlyPieces = pph * hoursPerMonth;

  const monthlyJobs =
    minutesPerJob > 0 ? (hoursPerMonth * 60) / minutesPerJob : 0;

  const totalKwBeforeLoad = customKwRates.kwItems.reduce(
    (s, it) => s + (Number(it.kw) || 0),
    0
  );
  const totalKwAfterLoad =
    (totalKwBeforeLoad * customRates.loadFactorPct) / 100.0;

  const laserKw = Number(
    customKwRates.kwItems.find((i) => i.id === "laser")?.kw || 0
  );
  const totalKwOther = totalKwBeforeLoad - laserKw;
  const totalAmpere = (customKwRates.laserAmpere || 0) + totalKwOther * 1.8;

  // *** FINAL FIX: การแปลงหน่วยค่าไฟฟ้า จาก / 74 เป็น / 60.0 (ถูกต้องตามตรรกะ)
  const elecRateTHBPerMin = customRates.elecCostPerKwh / 60.0;
  const elecPerMin = totalKwAfterLoad * elecRateTHBPerMin;
  const airCoolingRateTHBPerMin = customRates.airCompCostPerHr / 60.0;
  const gasRateTHBPerMin = customRates.gasRateTHBPerMin;

  const elecPerJob = minutesPerJob * elecPerMin;
  const gasPerJob = cuttingMinutesPerJob * gasRateTHBPerMin;

  const airCoolingPerJob = minutesPerJob * airCoolingRateTHBPerMin;
  const sparePartsTHBPerMonth = customRates.baseSparePartTHBPerMonth;
  const sparePerJob = monthlyJobs > 0 ? sparePartsTHBPerMonth / monthlyJobs : 0;

  const totalPerJob = elecPerJob + gasPerJob + sparePerJob + airCoolingPerJob;

  const elecPerPiece = avgNestingParts > 0 ? elecPerJob / avgNestingParts : 0;
  const gasPerPiece = avgNestingParts > 0 ? gasPerJob / avgNestingParts : 0;
  const airCoolingPerPiece =
    avgNestingParts > 0 ? airCoolingPerJob / avgNestingParts : 0;
  const sparePerPiece =
    monthlyPieces > 0 ? sparePartsTHBPerMonth / monthlyPieces : 0; // ใช้ monthlyPieces ตามตรรกะ Excel
  const totalPerPiece =
    elecPerPiece + gasPerPiece + sparePerPiece + airCoolingPerPiece;

  const elecPerMonth = elecPerJob * monthlyJobs;
  const gasPerMonth = gasPerJob * monthlyJobs;
  const airCoolingPerMonth = airCoolingPerJob * monthlyJobs;

  const totalPerMonthRaw =
    elecPerMonth + gasPerMonth + sparePartsTHBPerMonth + airCoolingPerMonth;

  return {
    totalKw: totalKwBeforeLoad,
    totalKwAfterLoad: totalKwAfterLoad,
    totalAmpere: totalAmpere,
    hoursPerMonth,
    minutesPerPiece,
    monthlyPieces,
    avgNestingParts,

    elecPerPiece,
    sparePerPiece,
    gasPerPiece,
    airCoolingPerPiece,
    totalPerPiece,

    elecPerJob,
    sparePerJob,
    gasPerJob,
    airCoolingPerJob,
    totalPerJob,

    elecPerMonth: elecPerMonth, 
    gasPerMonth: gasPerMonth,
    airCoolingPerMonth: airCoolingPerMonth,
    totalPerMonth: totalPerMonthRaw,
    totalAnnualCost: totalPerMonthRaw * 12,
  };
};
