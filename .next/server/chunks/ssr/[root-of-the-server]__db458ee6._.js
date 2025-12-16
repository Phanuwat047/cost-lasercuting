module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/app/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_AIR_COMP_COST_PER_HR",
    ()=>BASE_AIR_COMP_COST_PER_HR,
    "FIXED_RATES",
    ()=>FIXED_RATES,
    "GAS_RATES_PER_MIN_FIXED",
    ()=>GAS_RATES_PER_MIN_FIXED,
    "LASER_TO_AUX_MAP",
    ()=>LASER_TO_AUX_MAP,
    "MACHINE_TYPE_OPTIONS",
    ()=>MACHINE_TYPE_OPTIONS,
    "initialWorkRows",
    ()=>initialWorkRows
]);
const FIXED_RATES = {
    PIECES_PER_YEAR: 345600,
    ITEMS_PER_PAGE: 10
};
const GAS_RATES_PER_MIN_FIXED = {
    'air': 0.00,
    'o2': 0.5762,
    'n2': 38.24264635194587
};
const BASE_AIR_COMP_COST_PER_HR = 5.405;
const initialWorkRows = [
    {
        work: "Part 1",
        shape: 'แผ่น (Plate)',
        dimension: "",
        thickness: 1.2,
        length: 6000,
        nesting: 15,
        speed: 8.5,
        timeNest: "0:00",
        timePart: "0:32"
    }
];
const LASER_TO_AUX_MAP = {
    '1500W': {
        laserKw: 4.6,
        laserAmpere: 7.7,
        chillerKw: 1.5,
        stabilizerKw: 12
    },
    '2000W': {
        laserKw: 6.1,
        laserAmpere: 10.2,
        chillerKw: 1.8,
        stabilizerKw: 12
    },
    '3000W': {
        laserKw: 9.1,
        laserAmpere: 15.3,
        chillerKw: 2.5,
        stabilizerKw: 12
    },
    '4000W': {
        laserKw: 12.1,
        laserAmpere: 20.5,
        chillerKw: 4.2,
        stabilizerKw: 12
    },
    '6000W': {
        laserKw: 18.2,
        laserAmpere: 30.7,
        chillerKw: 4.8,
        stabilizerKw: 18
    },
    '8000W': {
        laserKw: 24.2,
        laserAmpere: 40.9,
        chillerKw: 9.5,
        stabilizerKw: 18
    },
    '12000W': {
        laserKw: 36.4,
        laserAmpere: 61.4,
        chillerKw: 12,
        stabilizerKw: 36
    },
    '20000W': {
        laserKw: 60.6,
        laserAmpere: 102.4,
        chillerKw: 16.5,
        stabilizerKw: 60
    },
    '30000W': {
        laserKw: 90.9,
        laserAmpere: 153.5,
        chillerKw: 22,
        stabilizerKw: 90
    },
    '40000W': {
        laserKw: 121.2,
        laserAmpere: 204.7,
        chillerKw: 30,
        stabilizerKw: 120
    },
    '60000W': {
        laserKw: 181.8,
        laserAmpere: 307,
        chillerKw: 52,
        stabilizerKw: 180
    },
    '120000W': {
        laserKw: 363.6,
        laserAmpere: 614,
        chillerKw: 105,
        stabilizerKw: 360
    }
};
const MACHINE_TYPE_OPTIONS = [
    'Small-Small(1.5-3kW)',
    'Small-Medium(1.5-3kW)',
    'Small-Large(1.5-3kW)',
    'Medium-Small(4-8kW)',
    'Medium-Medium(4-8kW)',
    'Medium-Large(4-8kW)',
    'Large-Small(12-30kW)',
    'Large-Medium(12-30kW)',
    'Large-Large(12-30kW)',
    'Extra Large-Small(40-120kW)',
    'Extra Large-Medium(40-120kW)',
    'Extra Large-Large(40-120kW)'
];
}),
"[project]/src/app/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateAllDerived",
    ()=>calculateAllDerived,
    "genId",
    ()=>genId,
    "mapExcelToWorkRow",
    ()=>mapExcelToWorkRow,
    "num",
    ()=>num,
    "parseTimeValueToMinutes",
    ()=>parseTimeValueToMinutes,
    "thb",
    ()=>thb
]);
function thb(n) {
    if (!isFinite(n) || n === null) return "-";
    // ใช้ toLocaleString เพื่อให้แสดงผลเป็น THB และรักษาความแม่นยำ 2 ตำแหน่ง
    return n.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function num(n) {
    if (!isFinite(n) || n === null) return "-";
    return n.toLocaleString("th-TH", {
        maximumFractionDigits: 2
    });
}
const genId = ()=>Math.random().toString(36).slice(2, 9);
const parseTimeValueToMinutes = (value)=>{
    const strValue = String(value || "0").trim();
    // 1. รองรับรูปแบบ mm:ss หรือ hh:mm:ss
    if (strValue.includes(":")) {
        const parts = strValue.split(":").map((p)=>parseFloat(p));
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
const mapExcelToWorkRow = (data)=>{
    if (!data || data.length < 2) return [];
    const newRows = data.slice(1).map((row)=>{
        const dimStr = String(row[1] || "").trim();
        let finalShape = "ท่อ (Pipe)";
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
            timeNest: timeNestStr,
            timePart: timePartStr
        };
    }).filter((r)=>r.work && r.work.length > 0);
    return newRows;
};
const calculateAllDerived = (rows, customRates, customKwRates)=>{
    // ใช้ parseTimeValueToMinutes แปลง string "5:16" เป็นตัวเลข 5.267 นาที เพื่อคำนวณ
    const totalTimePartOnly = rows.reduce((sum, row)=>sum + parseTimeValueToMinutes(row.timePart), 0);
    const totalTimeAll = rows.reduce((sum, row)=>sum + (parseTimeValueToMinutes(row.timePart) + parseTimeValueToMinutes(row.timeNest)), 0);
    const totalNestingParts = rows.reduce((sum, row)=>sum + parseFloat(String(row.nesting) || "1"), 0);
    const totalJobs = rows.length || 1;
    const minutesPerJob = totalTimeAll / totalJobs;
    const cuttingMinutesPerJob = totalTimePartOnly / totalJobs;
    const minutesPerPiece = totalNestingParts > 0 ? totalTimeAll / totalNestingParts : 0;
    const avgNestingParts = totalJobs > 0 ? totalNestingParts / totalJobs : 1;
    const pph = minutesPerPiece > 0 ? 60 / minutesPerPiece : 0;
    const hoursPerMonthPossible = customRates.hoursPerDay * customRates.workingDaysPerMonth;
    const hoursPerMonth = hoursPerMonthPossible * customRates.loadFactorPct / 100.0;
    const monthlyPieces = pph * hoursPerMonth;
    const monthlyJobs = minutesPerJob > 0 ? hoursPerMonth * 60 / minutesPerJob : 0;
    const totalKwBeforeLoad = customKwRates.kwItems.reduce((s, it)=>s + (Number(it.kw) || 0), 0);
    const totalKwAfterLoad = totalKwBeforeLoad * customRates.loadFactorPct / 100.0;
    const laserKw = Number(customKwRates.kwItems.find((i)=>i.id === "laser")?.kw || 0);
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
    const airCoolingPerPiece = avgNestingParts > 0 ? airCoolingPerJob / avgNestingParts : 0;
    const sparePerPiece = monthlyPieces > 0 ? sparePartsTHBPerMonth / monthlyPieces : 0; // ใช้ monthlyPieces ตามตรรกะ Excel
    const totalPerPiece = elecPerPiece + gasPerPiece + sparePerPiece + airCoolingPerPiece;
    const elecPerMonth = elecPerJob * monthlyJobs;
    const gasPerMonth = gasPerJob * monthlyJobs;
    const airCoolingPerMonth = airCoolingPerJob * monthlyJobs;
    const totalPerMonthRaw = elecPerMonth + gasPerMonth + sparePartsTHBPerMonth + airCoolingPerMonth;
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
        totalAnnualCost: totalPerMonthRaw * 12
    };
};
}),
"[project]/src/app/components/CostSummaryBill.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/utils.ts [app-ssr] (ecmascript)");
;
;
const CostSummaryBill = ({ derived, activeGas, customRates, currentSelectionLabel })=>{
    const annualElec = derived.elecPerMonth * 12;
    const annualGas = derived.gasPerMonth * 12;
    const annualSpare = customRates.baseSparePartTHBPerMonth * 12;
    const annualAirCooling = derived.airCoolingPerMonth * 12;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl shadow p-5 sticky top-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold mb-2",
                children: [
                    "สรุปผลการคำนวณ: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-blue-700",
                        children: currentSelectionLabel
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 22,
                        columnNumber: 33
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 border-b pb-2 mb-3",
                children: "*ค่า/เดือน และ /ปี คำนวณจาก Load Factor ของชิ้นงานที่เลือก"
            }, void 0, false, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 text-sm border-b pb-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "kW รวม (ใช้คำนวณ)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 29,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-red-600",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(derived.totalKwAfterLoad),
                                    " kW"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 29,
                                columnNumber: 85
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 29,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "นาที/ชิ้น (เฉลี่ย)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 30,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(derived.minutesPerPiece),
                                    " min"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 30,
                                columnNumber: 86
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ชิ้น/เดือน (Projected)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 31,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(derived.monthlyPieces),
                                    " pcs"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 31,
                                columnNumber: 90
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold mb-2",
                children: "ต้นทุนต่อชิ้น (บาท/ชิ้น)"
            }, void 0, false, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1 text-sm border-b pb-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ไฟฟ้า"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 36,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.elecPerPiece)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 36,
                                columnNumber: 73
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "แก๊ส (",
                                    activeGas.toUpperCase(),
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 37,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.gasPerPiece)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 37,
                                columnNumber: 100
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ค่าลม Cooling/Air Assist"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 38,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-orange-600",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.airCoolingPerPiece)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 38,
                                columnNumber: 92
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "อะไหล่สิ้นเปลือง"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 39,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.sparePerPiece)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 39,
                                columnNumber: 84
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-base mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: "รวมต้นทุนต่อชิ้น"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 40,
                                columnNumber: 70
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-lg text-green-600",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.totalPerPiece)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 40,
                                columnNumber: 121
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold mb-2",
                children: "ต้นทุนต่องาน (บาท/งาน)"
            }, void 0, false, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1 text-sm border-b pb-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 mb-2",
                        children: [
                            "อ้างอิงจากชิ้นงานเฉลี่ย: ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(derived.avgNestingParts),
                            " ชิ้น/งาน"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ไฟฟ้า"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 46,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-purple-700",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.elecPerJob)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 46,
                                columnNumber: 73
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "แก๊ส (",
                                    activeGas.toUpperCase(),
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 47,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-purple-700",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.gasPerJob)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 47,
                                columnNumber: 100
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ค่าลม Cooling/Air Assist"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 48,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-orange-600",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.airCoolingPerJob)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 48,
                                columnNumber: 92
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 48,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "อะไหล่สิ้นเปลือง"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 49,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-purple-700",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.sparePerJob)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 49,
                                columnNumber: 84
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 49,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-base mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: "รวมต้นทุนต่องาน"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 50,
                                columnNumber: 70
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-lg text-purple-600",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.totalPerJob)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 50,
                                columnNumber: 120
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 50,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold mb-2",
                children: "ต้นทุนรวม/เดือน (Projected)"
            }, void 0, false, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1 text-sm border-b pb-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ค่าไฟ/เดือน"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 55,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.elecPerMonth)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 55,
                                columnNumber: 79
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "แก๊ส/เดือน"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 56,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.gasPerMonth)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 56,
                                columnNumber: 78
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 56,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ค่าลม Cooling/Air Assist"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 57,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-orange-600",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.airCoolingPerMonth)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 57,
                                columnNumber: 92
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "อะไหล่สิ้นเปลือง/เดือน"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 58,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(customRates.baseSparePartTHBPerMonth)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 58,
                                columnNumber: 90
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-base mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: "รวมต่อเดือน"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 60,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-lg text-red-600",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.totalPerMonth)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 61,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold mb-2",
                children: "ต้นทุนรวม/ปี (Projected)"
            }, void 0, false, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ค่าไฟ/ปี"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 67,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(annualElec)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 67,
                                columnNumber: 76
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 67,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "แก๊ส/ปี"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 68,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(annualGas)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 68,
                                columnNumber: 75
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ค่าลม Cooling/Air Assist"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 69,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-orange-600",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(annualAirCooling)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 69,
                                columnNumber: 92
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "อะไหล่สิ้นเปลือง/ปี"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 70,
                                columnNumber: 55
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(annualSpare)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 70,
                                columnNumber: 87
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-base mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: "รวมต่อปี"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-lg text-red-900",
                                children: [
                                    "฿ ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.totalAnnualCost)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                                lineNumber: 73,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/CostSummaryBill.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/CostSummaryBill.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CostSummaryBill;
}),
"[project]/src/app/components/MainCostSummaryTable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/utils.ts [app-ssr] (ecmascript)");
;
;
const MainCostSummaryTable = ({ derived, rows, currentSelectionLabel })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-white rounded-xl shadow-2xl p-6 border-t-8 border-blue-400",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-blue-800 mb-6 border-b pb-2",
                children: [
                    "สรุปผลรวมต้นทุนต่อชิ้นงาน (",
                    currentSelectionLabel,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                lineNumber: 14,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full border-collapse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-blue-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "text-blue-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "p-3 border",
                                        children: "จำนวนชิ้นงาน (รายการ)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 21,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "p-3 border",
                                        children: "เวลาเฉลี่ย/ชิ้น (นาที)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 22,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "p-3 border bg-green-300",
                                        children: "ต้นทุนรวม/ชิ้น (บาท)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 23,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "p-3 border bg-red-300",
                                        children: "ต้นทุนรวม/เดือน (บาท)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 24,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "p-3 border",
                                        children: "ต้นทุนรวม/ปี (บาท)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 25,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                lineNumber: 20,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                            lineNumber: 19,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "text-center even:bg-gray-50 transition duration-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "p-2 border font-medium",
                                        children: [
                                            rows.length,
                                            " รายการ"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 30,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "p-2 border",
                                        children: derived.minutesPerPiece.toFixed(3)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 31,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "p-2 border bg-green-100 font-bold text-lg",
                                        children: derived.totalPerPiece.toFixed(3)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 32,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "p-2 border bg-red-100 font-bold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.totalPerMonth)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 33,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "p-2 border font-semibold text-blue-700",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thb"])(derived.totalAnnualCost)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                        lineNumber: 34,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                                lineNumber: 29,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                    lineNumber: 18,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/MainCostSummaryTable.tsx",
        lineNumber: 13,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = MainCostSummaryTable;
}),
"[project]/src/app/components/EquipmentModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/utils.ts [app-ssr] (ecmascript)");
;
;
const Dropdown = ({ field, label, value, opts, disabled = false, onUpdate, onGasTypeChange })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-end space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-bold text-gray-700",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (e)=>{
                    const newValue = e.target.value;
                    if (field === 'gasType') {
                        const newGasType = newValue;
                        onGasTypeChange(newGasType);
                    } else {
                        onUpdate(field, newValue);
                    }
                },
                disabled: disabled,
                className: `w-full border rounded-lg px-3 py-2 ${disabled ? 'bg-gray-100' : 'bg-white'} focus:ring-blue-400`,
                children: opts.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: opt,
                        children: opt
                    }, opt, false, {
                        fileName: "[project]/src/app/components/EquipmentModal.tsx",
                        lineNumber: 45,
                        columnNumber: 41
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/EquipmentModal.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
const CustomRateInput = ({ field, label, unit, value, onRateUpdate })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-end space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-bold text-gray-700",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "number",
                step: "any",
                value: value,
                onChange: (e)=>{
                    const newValue = parseFloat(e.target.value);
                    if (!isNaN(newValue)) {
                        onRateUpdate(field, newValue);
                    }
                },
                className: `w-full border rounded-lg px-3 py-2 ${field === 'gasRateTHBPerMin' ? 'bg-yellow-100 border-yellow-500 font-bold' : 'bg-white border-gray-300'} focus:ring-yellow-400`
            }, void 0, false, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500",
                children: unit
            }, void 0, false, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/EquipmentModal.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
const KwItemInput = ({ item, index, isLaser, updateKw, customKwRates, updateLaserAmpere, removeKwRow })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "col-span-1 border border-gray-300 p-3 rounded-md bg-white shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                className: "text-sm font-bold text-blue-700 mb-2",
                children: item.name
            }, void 0, false, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-semibold text-gray-600",
                        children: "กำลังไฟฟ้าจริง (kW)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/EquipmentModal.tsx",
                        lineNumber: 84,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        step: "any",
                        min: "0",
                        value: item.kw,
                        onChange: (e)=>updateKw(item.id, {
                                kw: e.target.value
                            }),
                        className: "w-full border rounded-lg px-2 py-1 bg-white border-gray-300 focus:ring-blue-400 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/EquipmentModal.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isLaser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-semibold text-gray-600",
                        children: "กระแสไฟฟ้า (A)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/EquipmentModal.tsx",
                        lineNumber: 95,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        step: "any",
                        min: "0",
                        value: customKwRates.laserAmpere,
                        onChange: (e)=>updateLaserAmpere(Number(e.target.value)),
                        className: "w-full border rounded-lg px-2 py-1 bg-blue-50 border-blue-400 font-medium focus:ring-blue-400 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/EquipmentModal.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            index >= 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>removeKwRow(item.id),
                className: "mt-2 text-red-500 text-xs hover:text-red-700",
                children: "ลบรายการ"
            }, void 0, false, {
                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/EquipmentModal.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
const EquipmentModal = ({ isOpen, onClose, summary, onUpdate, options, customRates, onRateUpdate, derived, customKwRates, updateKw, updateLaserAmpere, addKwRow, removeKwRow, onGasTypeChange })=>{
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative top-10 mx-auto p-8 border w-11/12 md:w-4/5 lg:w-4/5 xl:w-2/3 shadow-2xl rounded-xl bg-white",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center border-b pb-3 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-extrabold text-blue-800",
                            children: "ตั้งค่าอุปกรณ์และโหมดการตัด (Equipment Configuration)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                            lineNumber: 126,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-red-500 hover:text-red-700 text-3xl font-light",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                            lineNumber: 127,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                    lineNumber: 125,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 p-4 rounded-lg border border-blue-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-lg font-bold text-blue-800 mb-3",
                                    children: "กำหนดกำลังไฟฟ้า (kW) และกระแสไฟฟ้า (A)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 133,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                            field: "laserPower",
                                            label: "1. Laser Power (เลือกเพื่อลิงก์ Chiller/Stabilizer kW)",
                                            value: summary.laserPower,
                                            opts: options.laserPowerOptions,
                                            onUpdate: onUpdate,
                                            onGasTypeChange: onGasTypeChange
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 136,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 mt-1",
                                            children: "การเลือกนี้จะอัปเดตค่า kW ของ Laser Source, Chiller, และ Stabilizer รวมถึง Ampere ของ Laser Source อัตโนมัติ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 144,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 135,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 md:grid-cols-2 gap-6",
                                    children: customKwRates.kwItems.map((item, index)=>item.id === 'machine' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-1 border border-gray-300 p-3 rounded-md bg-white shadow-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                                field: "machineType",
                                                label: "4. Machine Type",
                                                value: summary.machineType,
                                                opts: options.machineTypeOptions,
                                                onUpdate: onUpdate,
                                                onGasTypeChange: onGasTypeChange
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                                lineNumber: 151,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, item.id, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 150,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KwItemInput, {
                                            item: item,
                                            index: index,
                                            isLaser: item.id === 'laser',
                                            updateKw: updateKw,
                                            customKwRates: customKwRates,
                                            updateLaserAmpere: updateLaserAmpere,
                                            removeKwRow: removeKwRow
                                        }, item.id, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 161,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 147,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addKwRow,
                                    className: "mt-4 px-3 py-2 rounded-xl border bg-blue-700 text-white hover:bg-blue-800 text-sm shadow-sm",
                                    children: "+ เพิ่มรายการกำลังไฟอื่น ๆ"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 174,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-3 bg-blue-100 rounded-md",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-blue-700",
                                            children: [
                                                "Ampere รวมที่ใช้ในการคำนวณ (โดยประมาณ): ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-600",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(derived.totalAmpere),
                                                        " A"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 120
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 177,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-blue-700",
                                            children: [
                                                "kW รวมก่อน Load Factor: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-600",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(derived.totalKw),
                                                        " kW"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 104
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 178,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 176,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                            lineNumber: 132,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-yellow-50 p-4 rounded-lg border border-yellow-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-lg font-bold text-yellow-800 mb-3",
                                    children: "ปรับแต่งอัตราต้นทุนและการดำเนินงาน"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 183,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-6 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomRateInput, {
                                            field: "elecCostPerKwh",
                                            label: "7. ค่าไฟฟ้า",
                                            unit: "THB/kWh (บาท/หน่วย)",
                                            value: customRates.elecCostPerKwh,
                                            onRateUpdate: onRateUpdate
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 185,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomRateInput, {
                                            field: "baseSparePartTHBPerMonth",
                                            label: "8. ค่า Spare Part (ฐาน)",
                                            unit: "THB/เดือน (ใช้ในการคำนวณต้นทุนหลัก)",
                                            value: customRates.baseSparePartTHBPerMonth,
                                            onRateUpdate: onRateUpdate
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 192,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomRateInput, {
                                            field: "gasRateTHBPerMin",
                                            label: "9. ค่า Gas/min",
                                            unit: "THB/min (ค่าเริ่มต้นปรับตาม Gas Type)",
                                            value: customRates.gasRateTHBPerMin,
                                            onRateUpdate: onRateUpdate
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 199,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomRateInput, {
                                            field: "loadFactorPct",
                                            label: "10. Load Factor",
                                            unit: "(0 - 100) %",
                                            value: customRates.loadFactorPct,
                                            onRateUpdate: onRateUpdate
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 206,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 184,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-4 border-yellow-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomRateInput, {
                                            field: "airCompCostPerHr",
                                            label: "11. ค่าบำรุงรักษา Air Comp",
                                            unit: "THB/Hr (ใช้คิดค่าลม Cooling/Assist)",
                                            value: customRates.airCompCostPerHr,
                                            onRateUpdate: onRateUpdate
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 216,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomRateInput, {
                                            field: "hoursPerDay",
                                            label: "12. ชั่วโมงทำงาน/วัน",
                                            unit: "Hrs/Day",
                                            value: customRates.hoursPerDay,
                                            onRateUpdate: onRateUpdate
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 223,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomRateInput, {
                                            field: "workingDaysPerMonth",
                                            label: "13. วันทำงาน/เดือน",
                                            unit: "Days/Month",
                                            value: customRates.workingDaysPerMonth,
                                            onRateUpdate: onRateUpdate
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 230,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-semibold text-gray-700 col-span-2 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-yellow-100 rounded-md",
                                                children: [
                                                    "ชั่วโมงทำงานต่อเดือน:",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-600 ml-2 text-md",
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(derived.hoursPerMonth),
                                                            " Hrs"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                                lineNumber: 238,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                            lineNumber: 237,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 215,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                            lineNumber: 182,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                    field: "gasType",
                                    label: "15. Gas Type",
                                    value: summary.gasType,
                                    opts: options.gasTypeOptions,
                                    onUpdate: onUpdate,
                                    onGasTypeChange: onGasTypeChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 248,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                    field: "machineGeometry",
                                    label: "16. Machine Geometry",
                                    value: summary.machineGeometry,
                                    opts: options.machineGeometryOptions,
                                    onUpdate: onUpdate,
                                    onGasTypeChange: onGasTypeChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 249,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                    field: "nozzle",
                                    label: "17. Nozzle",
                                    value: summary.nozzle,
                                    opts: options.nozzleTypes,
                                    onUpdate: onUpdate,
                                    onGasTypeChange: onGasTypeChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 250,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                    field: "cuttingMode",
                                    label: "18. Cutting Mode",
                                    value: summary.cuttingMode,
                                    opts: options.cuttingModes,
                                    onUpdate: onUpdate,
                                    onGasTypeChange: onGasTypeChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                    lineNumber: 251,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                            lineNumber: 246,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-150",
                                children: "ยืนยันการตั้งค่า (Close)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/EquipmentModal.tsx",
                                lineNumber: 255,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/EquipmentModal.tsx",
                            lineNumber: 254,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/EquipmentModal.tsx",
                    lineNumber: 130,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/EquipmentModal.tsx",
            lineNumber: 124,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/components/EquipmentModal.tsx",
        lineNumber: 123,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = EquipmentModal;
}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$CostSummaryBill$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/CostSummaryBill.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MainCostSummaryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/MainCostSummaryTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$EquipmentModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/EquipmentModal.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const TakecoLaserCostV25 = ()=>{
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialWorkRows"]);
    const [selectedModel, setSelectedModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('total');
    const initialKwRates = {
        kwItems: [
            {
                id: 'laser',
                name: "1. Laser Source (kW)",
                kw: 9.1
            },
            {
                id: 'chiller',
                name: "2. Chiller (kW)",
                kw: 2.5
            },
            {
                id: 'stabilizer',
                name: "3. Stabilizer (kW)",
                kw: 6.8
            },
            {
                id: 'machine',
                name: "4. Machine Type (kW)",
                kw: 6
            },
            {
                id: 'aircomp',
                name: "5. Air Compressor (kW)",
                kw: 22
            },
            {
                id: 'dustcoll',
                name: "6. Dust Collector (kW)",
                kw: 3
            }
        ],
        laserAmpere: 15.3
    };
    const [customKwRates, setCustomKwRates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialKwRates);
    const [customRates, setCustomRates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        elecCostPerKwh: 4.5,
        gasRateTHBPerMin: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAS_RATES_PER_MIN_FIXED"]['n2'],
        // *** FINAL FIX: ปรับ Spare Part/เดือน ให้เป็น 625.0 THB/เดือน (ตรงตาม Excel) ***
        baseSparePartTHBPerMonth: 625.0,
        // ** Load Factor 80% **
        loadFactorPct: 80,
        workingDaysPerMonth: 22,
        hoursPerDay: 8,
        airCompCostPerHr: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_AIR_COMP_COST_PER_HR"]
    });
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        machineGeometry: 'Plate Cutting (ตัดแผ่น)',
        gasType: 'Nitrogen',
        nozzle: "1.0mm",
        cuttingMode: "Normal",
        laserPower: '3000W',
        machineType: 'Small-Large(1.5-3kW)'
    });
    const getSelectedRows = (allRows, selection)=>{
        if (selection === 'total') {
            return allRows;
        }
        if (typeof selection === 'number' && allRows[selection]) {
            return [
                allRows[selection]
            ];
        }
        return allRows;
    };
    const derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const selectedRows = getSelectedRows(rows, selectedModel);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateAllDerived"])(selectedRows, customRates, customKwRates);
    }, [
        rows,
        customRates,
        customKwRates,
        selectedModel
    ]);
    // --- Handlers & Utils ---
    const handleRateChange = (field, value)=>{
        if (field === 'loadFactorPct') {
            value = Math.max(0, Math.min(100, value));
        }
        setCustomRates((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const updateKw = (id, patch)=>{
        const next = customKwRates.kwItems.map((it)=>it.id === id ? {
                ...it,
                ...patch
            } : it);
        setCustomKwRates((prev)=>({
                ...prev,
                kwItems: next
            }));
    };
    const updateLaserAmpere = (value)=>{
        setCustomKwRates((prev)=>({
                ...prev,
                laserAmpere: value
            }));
    };
    const addKwRow = ()=>{
        setCustomKwRates((prev)=>({
                ...prev,
                kwItems: [
                    ...prev.kwItems,
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["genId"])(),
                        name: `Device ${prev.kwItems.length + 1} (kW)`,
                        kw: 0
                    }
                ]
            }));
    };
    const removeKwRow = (id)=>{
        setCustomKwRates((prev)=>({
                ...prev,
                kwItems: prev.kwItems.filter((it)=>it.id !== id)
            }));
    };
    const handleGasTypeChange = (type)=>{
        let gasKey = 'air';
        if (type === 'Oxygen') {
            gasKey = 'o2';
        } else if (type === 'Nitrogen') {
            gasKey = 'n2';
        } else {
            gasKey = 'air';
        }
        const defaultRate = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAS_RATES_PER_MIN_FIXED"][gasKey];
        setSummary((prev)=>({
                ...prev,
                gasType: type
            }));
        setCustomRates((prev)=>({
                ...prev,
                gasRateTHBPerMin: defaultRate || 0
            }));
    };
    const handleSummaryChange = (field, value)=>{
        setSummary((prev)=>{
            let newState = {
                ...prev,
                [field]: value
            };
            if (field === 'laserPower') {
                const map = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LASER_TO_AUX_MAP"][value];
                if (map) {
                    setCustomKwRates((prevKw)=>{
                        const nextKwItems = prevKw.kwItems.map((item)=>{
                            if (item.id === 'laser') return {
                                ...item,
                                kw: map.laserKw
                            };
                            if (item.id === 'chiller') return {
                                ...item,
                                kw: map.chillerKw
                            };
                            if (item.id === 'stabilizer') return {
                                ...item,
                                kw: map.stabilizerKw
                            };
                            return item;
                        });
                        return {
                            ...prevKw,
                            kwItems: nextKwItems,
                            laserAmpere: map.laserAmpere
                        };
                    });
                }
            }
            return newState;
        });
    };
    const totalPages = Math.ceil(rows.length / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FIXED_RATES"].ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FIXED_RATES"].ITEMS_PER_PAGE;
    const currentRows = rows.slice(startIndex, startIndex + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FIXED_RATES"].ITEMS_PER_PAGE);
    const handleFileUpload = (event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        const fileType = file.name.split('.').pop()?.toLowerCase();
        if (fileType === 'xlsx' || fileType === 'xls') {
            const reader = new FileReader();
            reader.onload = (e)=>{
                const data = new Uint8Array(e.target.result);
                const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["read"](data, {
                    type: 'array'
                });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonSheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(worksheet, {
                    header: 1
                });
                if (jsonSheet.length > 1) {
                    const mappedRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapExcelToWorkRow"])(jsonSheet);
                    if (mappedRows.length > 0) {
                        setRows(mappedRows);
                        setCurrentPage(1);
                        setSelectedModel('total');
                        alert(`นำเข้าข้อมูล ${mappedRows.length} ชิ้นงานจากไฟล์ Excel สำเร็จ`);
                    } else {
                        alert("ไม่พบข้อมูลชิ้นงานที่ถูกต้องในไฟล์ Excel (โปรดตรวจสอบรูปแบบ)");
                    }
                } else {
                    alert("ไฟล์ Excel ว่างเปล่าหรือไม่ถูกต้อง");
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert("ไฟล์ PDF ไม่สามารถประมวลผลข้อมูลตารางที่ซับซ้อนในเบราว์เซอร์ได้ กรุณาใช้ไฟล์ Excel (.xlsx) เพื่อการนำเข้าที่แม่นยำ");
        }
        event.target.value = '';
    };
    const handleInputChange = (index, field, value)=>{
        const newRows = [
            ...rows
        ];
        const globalIndex = startIndex + index;
        if (field === 'shape') {
            newRows[globalIndex] = {
                ...newRows[globalIndex],
                [field]: value
            };
        } else {
            newRows[globalIndex] = {
                ...newRows[globalIndex],
                [field]: value
            };
        }
        setRows(newRows);
    };
    const addRow = ()=>{
        setRows((prev)=>[
                ...prev,
                {
                    work: `Part ${prev.length + 1}`,
                    shape: 'แผ่น (Plate)',
                    dimension: "",
                    thickness: "",
                    length: "",
                    nesting: 1,
                    speed: "",
                    timeNest: "0:00",
                    timePart: "0.53"
                }
            ]);
    };
    const removeRow = (index)=>{
        const globalIndex = startIndex + index;
        const newRows = rows.filter((_, i)=>i !== globalIndex);
        setRows(newRows);
        if (currentRows.length === 1 && currentPage > 1 && newRows.length > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const workRowFields = [
        {
            key: 'work',
            label: 'Work Name'
        },
        {
            key: 'shape',
            label: 'Shape'
        },
        {
            key: 'dimension',
            label: 'Dimension '
        },
        {
            key: 'thickness',
            label: 'Thickness (mm)'
        },
        {
            key: 'length',
            label: 'Length (mm)'
        },
        {
            key: 'nesting',
            label: 'Nesting '
        },
        {
            key: 'speed',
            label: 'Speed (m/min)'
        },
        {
            key: 'timeNest',
            label: 'Time Nest (mm:ss)'
        },
        {
            key: 'timePart',
            label: 'Time Part (mm:ss)'
        }
    ];
    const dropdownOptions = {
        laserPowerOptions: Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LASER_TO_AUX_MAP"]),
        machineTypeOptions: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MACHINE_TYPE_OPTIONS"],
        machineGeometryOptions: [
            'Plate Cutting (ตัดแผ่น)',
            'Pipe Cutting (ตัดท่อ)'
        ],
        gasTypeOptions: [
            "Air",
            "Oxygen",
            "Nitrogen"
        ],
        nozzleTypes: [
            "1.0mm",
            "1.2mm",
            "1.5mm",
            "2.0mm"
        ],
        cuttingModes: [
            "Normal",
            "Fine",
            "HighSpeed"
        ]
    };
    const modelOptions = [
        {
            value: 'total',
            label: `รวม ${rows.length} โมเดล (Overall Average)`
        },
        ...rows.map((row, index)=>({
                value: index,
                label: `${index + 1}. ${row.work}`
            }))
    ];
    const currentSelectionLabel = modelOptions.find((opt)=>opt.value === selectedModel)?.label || modelOptions[0].label;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-100 text-gray-900 font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-blue-900 text-white p-4 shadow-xl flex items-center space-x-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: "/LogoTakeco Laser.jpg",
                        alt: "Takeco Laser Logo",
                        width: 50,
                        height: 50,
                        className: "rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 272,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-extrabold tracking-tight",
                                children: "Takeco Laser Operation Cost"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 280,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-light mt-1",
                                children: "จัดทำโดย: บริษัท ทาเคโกะ เอ็นจิเนียริ่ง (ประเทศไทย) จำกัด"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 283,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 279,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 271,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "bg-white rounded-xl shadow-2xl p-6 border-t-8 border-blue-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-blue-800 mb-6 border-b pb-2",
                                            children: " ชิ้นงานและพารามิเตอร์การตัด (Work Piece Input)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 flex items-center space-x-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow cursor-pointer transition duration-150",
                                                    children: [
                                                        "📂 Import Data from Excel",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: ".xlsx, .xls, .pdf",
                                                            onChange: handleFileUpload,
                                                            className: "hidden"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-gray-500",
                                                    children: [
                                                        "(Total Parts: ",
                                                        rows.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 297,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-x-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "w-full border-collapse rounded-lg overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "bg-blue-600 text-white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-3 border border-blue-700 text-sm font-medium",
                                                                    children: "No."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 316,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                workRowFields.map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "p-3 border border-blue-700 text-sm font-medium",
                                                                        children: label
                                                                    }, key, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 317,
                                                                        columnNumber: 85
                                                                    }, ("TURBOPACK compile-time value", void 0))),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-3 border border-blue-700",
                                                                    children: "Action"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 318,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: currentRows.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "text-center even:bg-gray-50 transition duration-100",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2 border border-gray-300 font-medium",
                                                                        children: startIndex + i + 1
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 324,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    workRowFields.map(({ key })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-2 border border-gray-300",
                                                                            children: key === 'shape' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                value: row.shape,
                                                                                onChange: (e)=>handleInputChange(i, key, e.target.value),
                                                                                className: "w-full border rounded-md px-2 py-1 bg-white focus:ring-2 focus:ring-blue-400",
                                                                                children: [
                                                                                    'แผ่น (Plate)',
                                                                                    'ท่อ (Pipe)'
                                                                                ].map((shape)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: shape,
                                                                                        children: shape
                                                                                    }, shape, false, {
                                                                                        fileName: "[project]/src/app/page.tsx",
                                                                                        lineNumber: 331,
                                                                                        columnNumber: 111
                                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/page.tsx",
                                                                                lineNumber: 330,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: [
                                                                                        'thickness',
                                                                                        'length',
                                                                                        'nesting',
                                                                                        'speed'
                                                                                    ].includes(key) ? 'number' : 'text',
                                                                                    value: String(row[key]),
                                                                                    onChange: (e)=>handleInputChange(i, key, e.target.value),
                                                                                    // ปลดล็อก Dimension ให้กรอกได้อิสระ
                                                                                    disabled: false,
                                                                                    className: `w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 transition border-gray-300`,
                                                                                    min: 0
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 335,
                                                                                    columnNumber: 65
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false)
                                                                        }, key, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 328,
                                                                            columnNumber: 53
                                                                        }, ("TURBOPACK compile-time value", void 0))),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2 border border-gray-300",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>removeRow(i),
                                                                            className: "bg-red-500 text-white w-full px-3 py-1 rounded-full text-lg hover:bg-red-600 shadow-md",
                                                                            children: "×"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 349,
                                                                            columnNumber: 53
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 348,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, startIndex + i, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 312,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        rows.length > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FIXED_RATES"].ITEMS_PER_PAGE && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-gray-600",
                                                    children: [
                                                        "แสดงรายการที่ ",
                                                        startIndex + 1,
                                                        " - ",
                                                        Math.min(startIndex + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FIXED_RATES"].ITEMS_PER_PAGE, rows.length),
                                                        " จาก ",
                                                        rows.length,
                                                        " รายการ"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setCurrentPage((prev)=>Math.max(1, prev - 1)),
                                                            disabled: currentPage === 1,
                                                            className: "px-3 py-1 mr-2 border rounded-md bg-gray-100 disabled:opacity-50",
                                                            children: "< Prev"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: [
                                                                currentPage,
                                                                " / ",
                                                                totalPages
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setCurrentPage((prev)=>Math.min(totalPages, prev + 1)),
                                                            disabled: currentPage === totalPages,
                                                            className: "px-3 py-1 ml-2 border rounded-md bg-gray-100 disabled:opacity-50",
                                                            children: "Next >"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 358,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: addRow,
                                            className: "mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-150 flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl",
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "เพิ่มชิ้นงาน"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "bg-white rounded-xl shadow-2xl p-6 border-t-8 border-purple-500 flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold text-purple-800",
                                                    children: "ข้อมูลเครื่องจักรและตัวเลือกการตัด"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 388,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 mt-1",
                                                    children: "คลิกปุ่มด้านข้างเพื่อกำหนดค่ากำลังไฟฟ้า (kW) และอัตราต้นทุนเอง"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-md font-semibold mt-2 text-green-600",
                                                    children: [
                                                        "สถานะ: Total kW: ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(derived.totalKwAfterLoad),
                                                        " / Gas: ",
                                                        summary.gasType,
                                                        " / Load Factor: ",
                                                        customRates.loadFactorPct,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsModalOpen(true),
                                            className: "bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-150",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl mr-2",
                                                    children: "⚙️"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ตั้งค่าอุปกรณ์ & ดูสรุปผล"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 386,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MainCostSummaryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    derived: derived,
                                    rows: rows,
                                    currentSelectionLabel: currentSelectionLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$EquipmentModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    isOpen: isModalOpen,
                                    onClose: ()=>setIsModalOpen(false),
                                    summary: summary,
                                    onUpdate: handleSummaryChange,
                                    options: dropdownOptions,
                                    derived: derived,
                                    customRates: customRates,
                                    onRateUpdate: handleRateChange,
                                    customKwRates: customKwRates,
                                    updateKw: updateKw,
                                    updateLaserAmpere: updateLaserAmpere,
                                    addKwRow: addKwRow,
                                    removeKwRow: removeKwRow,
                                    onGasTypeChange: handleGasTypeChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 402,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 292,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold mb-2",
                                            children: "เลือกโมเดลเพื่อสรุปผล"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 423,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedModel,
                                            onChange: (e)=>setSelectedModel(e.target.value === 'total' ? 'total' : Number(e.target.value)),
                                            className: "w-full border rounded-lg px-3 py-2 bg-white border-blue-400 focus:ring-2 focus:ring-blue-400 text-base",
                                            children: modelOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: opt.value,
                                                    children: opt.label
                                                }, opt.value, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 430,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 424,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 422,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$CostSummaryBill$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    derived: derived,
                                    activeGas: summary.gasType,
                                    customRates: customRates,
                                    currentSelectionLabel: currentSelectionLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 437,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 421,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 290,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 289,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 270,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = TakecoLaserCostV25;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__db458ee6._.js.map