"use client";

import React, { useState, useMemo } from "react";
import Image from 'next/image';
import * as XLSX from 'xlsx';

import {
    WorkRow,
    SummaryOptions,
    CustomKwRates,
    CustomRates,
    GasProfileKey,
    KwItem,
    WorkShape
} from "./types";

import {
    FIXED_RATES,
    GAS_RATES_PER_MIN_FIXED,
    BASE_AIR_COMP_COST_PER_HR,
    initialWorkRows,
    LASER_TO_AUX_MAP,
    MACHINE_TYPE_OPTIONS
} from "./constants";

import {
    genId,
    mapExcelToWorkRow,
    calculateAllDerived,
    num
} from "./utils";

import CostSummaryBill from "./components/CostSummaryBill";
import MainCostSummaryTable from "./components/MainCostSummaryTable";
import EquipmentModal from "./components/EquipmentModal";

const TakecoLaserCostV25: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState<WorkRow[]>(initialWorkRows);

    const [selectedModel, setSelectedModel] = useState<'total' | number>('total');

    const initialKwRates: CustomKwRates = {
        kwItems: [
            { id: 'laser', name: "1. Laser Source (kW)", kw: 9.1 },
            { id: 'chiller', name: "2. Chiller (kW)", kw: 2.5 },
            { id: 'stabilizer', name: "3. Stabilizer (kW)", kw: 6.8 },
            { id: 'machine', name: "4. Machine Type (kW)", kw: 6 },
            { id: 'aircomp', name: "5. Air Compressor (kW)", kw: 22 },
            { id: 'dustcoll', name: "6. Dust Collector (kW)", kw: 3 },
        ],
        laserAmpere: 15.3,
    };

    const [customKwRates, setCustomKwRates] = useState<CustomKwRates>(initialKwRates);

    const [customRates, setCustomRates] = useState<CustomRates>({
        elecCostPerKwh: 4.5,
        gasRateTHBPerMin: GAS_RATES_PER_MIN_FIXED['n2'],
        // *** FINAL FIX: ปรับ Spare Part/เดือน ให้เป็น 625.0 THB/เดือน (ตรงตาม Excel) ***
        baseSparePartTHBPerMonth: 625.0,

        // ** Load Factor 80% **
        loadFactorPct: 80,
        workingDaysPerMonth: 22,
        hoursPerDay: 8,

        airCompCostPerHr: BASE_AIR_COMP_COST_PER_HR,
    });

    const [summary, setSummary] = useState<SummaryOptions>({
        machineGeometry: 'Plate Cutting (ตัดแผ่น)',
        gasType: 'Nitrogen',
        nozzle: "1.0mm",
        cuttingMode: "Normal",
        laserPower: '3000W',
        machineType: 'Small-Large(1.5-3kW)',
    });

    const getSelectedRows = (allRows: WorkRow[], selection: 'total' | number): WorkRow[] => {
        if (selection === 'total') {
            return allRows;
        }
        if (typeof selection === 'number' && allRows[selection]) {
            return [allRows[selection]];
        }
        return allRows;
    };

    const derived = useMemo(() => {
        const selectedRows = getSelectedRows(rows, selectedModel);
        return calculateAllDerived(selectedRows, customRates, customKwRates);
    }, [rows, customRates, customKwRates, selectedModel]);


    // --- Handlers & Utils ---
    const handleRateChange = (field: keyof CustomRates, value: number) => {
        if (field === 'loadFactorPct') {
            value = Math.max(0, Math.min(100, value));
        }
        setCustomRates(prev => ({ ...prev, [field]: value }));
    };

    const updateKw = (id: string, patch: Partial<KwItem>) => {
        const next = customKwRates.kwItems.map((it) => (it.id === id ? { ...it, ...patch } : it));
        setCustomKwRates(prev => ({ ...prev, kwItems: next }));
    };

    const updateLaserAmpere = (value: number) => {
        setCustomKwRates(prev => ({ ...prev, laserAmpere: value }));
    };

    const addKwRow = () => {
        setCustomKwRates(prev => ({
            ...prev,
            kwItems: [
                ...prev.kwItems,
                { id: genId(), name: `Device ${prev.kwItems.length + 1} (kW)`, kw: 0 },
            ],
        }));
    };

    const removeKwRow = (id: string) => {
        setCustomKwRates(prev => ({
            ...prev,
            kwItems: prev.kwItems.filter((it) => it.id !== id)
        }));
    };

    const handleGasTypeChange = (type: 'Air' | 'Oxygen' | 'Nitrogen') => {

        let gasKey: GasProfileKey = 'air';
        if (type === 'Oxygen') {
            gasKey = 'o2';
        } else if (type === 'Nitrogen') {
            gasKey = 'n2';
        } else {
            gasKey = 'air';
        }

        const defaultRate = GAS_RATES_PER_MIN_FIXED[gasKey];

        setSummary(prev => ({ ...prev, gasType: type }));
        setCustomRates(prev => ({ ...prev, gasRateTHBPerMin: defaultRate || 0 }));
    };

    const handleSummaryChange = (field: keyof SummaryOptions, value: string) => {
        setSummary(prev => {
            let newState = { ...prev, [field]: value as any };

            if (field === 'laserPower') {
                const map = LASER_TO_AUX_MAP[value];
                if (map) {
                    setCustomKwRates(prevKw => {
                        const nextKwItems = prevKw.kwItems.map(item => {
                            if (item.id === 'laser') return { ...item, kw: map.laserKw };
                            if (item.id === 'chiller') return { ...item, kw: map.chillerKw };
                            if (item.id === 'stabilizer') return { ...item, kw: map.stabilizerKw };
                            return item;
                        });
                        return { ...prevKw, kwItems: nextKwItems, laserAmpere: map.laserAmpere };
                    });
                }
            }
            return newState;
        });
    };

    const totalPages = Math.ceil(rows.length / FIXED_RATES.ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * FIXED_RATES.ITEMS_PER_PAGE;
    const currentRows = rows.slice(startIndex, startIndex + FIXED_RATES.ITEMS_PER_PAGE);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const fileType = file.name.split('.').pop()?.toLowerCase();
        if (fileType === 'xlsx' || fileType === 'xls') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target!.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonSheet: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                if (jsonSheet.length > 1) {
                    const mappedRows = mapExcelToWorkRow(jsonSheet);
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

    const handleInputChange = (index: number, field: keyof WorkRow, value: string) => {
        const newRows = [...rows];
        const globalIndex = startIndex + index;

        if (field === 'shape') {
            newRows[globalIndex] = {
                ...newRows[globalIndex],
                [field]: value as WorkShape,
            };
        } else {
            newRows[globalIndex] = { ...newRows[globalIndex], [field]: value };
        }
        setRows(newRows);
    };

    const addRow = () => {
        setRows(prev => [
            ...prev,
            { work: `Part ${prev.length + 1}`, shape: 'แผ่น (Plate)', dimension: "", thickness: "", length: "", nesting: 1, speed: "", timeNest: "0:00", timePart: "0.53" },
        ]);
    };

    const removeRow = (index: number) => {
        const globalIndex = startIndex + index;
        const newRows = rows.filter((_, i) => i !== globalIndex);
        setRows(newRows);
        if (currentRows.length === 1 && currentPage > 1 && newRows.length > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const workRowFields: { key: keyof WorkRow, label: string }[] = [
        { key: 'work', label: 'Work Name' },
        { key: 'shape', label: 'Shape' },
        { key: 'dimension', label: 'Dimension ' },
        { key: 'thickness', label: 'Thickness (mm)' },
        { key: 'length', label: 'Length (mm)' },
        { key: 'nesting', label: 'Nesting ' },
        { key: 'speed', label: 'Speed (m/min)' },
        { key: 'timeNest', label: 'Time Nest (mm:ss)' },
        { key: 'timePart', label: 'Time Part (mm:ss)' },
    ];

    const dropdownOptions = {
        laserPowerOptions: Object.keys(LASER_TO_AUX_MAP),
        machineTypeOptions: MACHINE_TYPE_OPTIONS,
        machineGeometryOptions: ['Plate Cutting (ตัดแผ่น)', 'Pipe Cutting (ตัดท่อ)'],
        gasTypeOptions: ["Air", "Oxygen", "Nitrogen"],
        nozzleTypes: ["1.0mm", "1.2mm", "1.5mm", "2.0mm"],
        cuttingModes: ["Normal", "Fine", "HighSpeed"],
    };

    const modelOptions = [
        { value: 'total', label: `รวม ${rows.length} โมเดล (Overall Average)` },
        ...rows.map((row, index) => ({
            value: index as number,
            label: `${index + 1}. ${row.work}`
        }))
    ];
    const currentSelectionLabel = modelOptions.find(opt => opt.value === selectedModel)?.label || modelOptions[0].label;


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
            <header className="bg-blue-900 text-white p-4 shadow-xl flex items-center space-x-4">
                <Image
                    src="/LogoTakeco Laser.jpg"
                    alt="Takeco Laser Logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Takeco Laser Operation Cost 
                    </h1>
                    <p className="text-sm font-light mt-1">
                        จัดทำโดย: บริษัท ทาเคโกะ เอ็นจิเนียริ่ง (ประเทศไทย) จำกัด
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">

                        <section className="bg-white rounded-xl shadow-2xl p-6 border-t-8 border-blue-700">
                            <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2"> ชิ้นงานและพารามิเตอร์การตัด (Work Piece Input)</h2>

                            <div className="mb-4 flex items-center space-x-3">
                                <label className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow cursor-pointer transition duration-150">
                                    📂 Import Data from Excel
                                    <input
                                        type="file"
                                        accept=".xlsx, .xls, .pdf"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                                <span className="text-sm text-gray-500">
                                    (Total Parts: {rows.length})
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse rounded-lg overflow-hidden">
                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="p-3 border border-blue-700 text-sm font-medium">No.</th>
                                            {workRowFields.map(({ key, label }) => (<th key={key} className="p-3 border border-blue-700 text-sm font-medium">{label}</th>))}
                                            <th className="p-3 border border-blue-700">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRows.map((row, i) => (
                                            <tr key={startIndex + i} className="text-center even:bg-gray-50 transition duration-100">
                                                <td className="p-2 border border-gray-300 font-medium">
                                                    {(startIndex + i) + 1}
                                                </td>
                                                {workRowFields.map(({ key }) => (
                                                    <td key={key} className="p-2 border border-gray-300">
                                                        {key === 'shape' ? (
                                                            <select value={row.shape} onChange={(e) => handleInputChange(i, key, e.target.value)} className="w-full border rounded-md px-2 py-1 bg-white focus:ring-2 focus:ring-blue-400">
                                                                {['แผ่น (Plate)', 'ท่อ (Pipe)'].map(shape => (<option key={shape} value={shape}>{shape}</option>))}
                                                            </select>
                                                        ) : (
                                                            <>
                                                                <input
                                                                    type={['thickness', 'length', 'nesting', 'speed'].includes(key) ? 'number' : 'text'}
                                                                    value={String(row[key])}
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(i, key, e.target.value)}
                                                                    // ปลดล็อก Dimension ให้กรอกได้อิสระ
                                                                    disabled={false}
                                                                    className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 transition border-gray-300`}
                                                                    min={0}
                                                                />
                                                            </>
                                                        )}
                                                    </td>
                                                ))}
                                                <td className="p-2 border border-gray-300">
                                                    <button onClick={() => removeRow(i)} className="bg-red-500 text-white w-full px-3 py-1 rounded-full text-lg hover:bg-red-600 shadow-md">&times;</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {rows.length > FIXED_RATES.ITEMS_PER_PAGE && (
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm text-gray-600">แสดงรายการที่ {startIndex + 1} - {Math.min(startIndex + FIXED_RATES.ITEMS_PER_PAGE, rows.length)} จาก {rows.length} รายการ</span>
                                    <div>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 mr-2 border rounded-md bg-gray-100 disabled:opacity-50"
                                        >
                                            &lt; Prev
                                        </button>
                                        <span className="font-semibold">{currentPage} / {totalPages}</span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 ml-2 border rounded-md bg-gray-100 disabled:opacity-50"
                                        >
                                            Next &gt;
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button onClick={addRow} className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-150 flex items-center space-x-2">
                                <span className="text-xl">+</span>
                                <span>เพิ่มชิ้นงาน</span>
                            </button>
                        </section>

                        <section className="bg-white rounded-xl shadow-2xl p-6 border-t-8 border-purple-500 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-purple-800">ข้อมูลเครื่องจักรและตัวเลือกการตัด</h2>
                                <p className="text-sm text-gray-500 mt-1">คลิกปุ่มด้านข้างเพื่อกำหนดค่ากำลังไฟฟ้า (kW) และอัตราต้นทุนเอง</p>
                                <p className="text-md font-semibold mt-2 text-green-600">สถานะ: Total kW: {num(derived.totalKwAfterLoad)} / Gas: {summary.gasType} / Load Factor: {customRates.loadFactorPct}%</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-150"
                            >
                                <span className="text-xl mr-2">⚙️</span> ตั้งค่าอุปกรณ์ & ดูสรุปผล
                            </button>
                        </section>

                        <MainCostSummaryTable derived={derived} rows={rows} currentSelectionLabel={currentSelectionLabel} />

                        <EquipmentModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            summary={summary}
                            onUpdate={handleSummaryChange}
                            options={dropdownOptions}
                            derived={derived}
                            customRates={customRates}
                            onRateUpdate={handleRateChange}
                            customKwRates={customKwRates}
                            updateKw={updateKw}
                            updateLaserAmpere={updateLaserAmpere}
                            addKwRow={addKwRow}
                            removeKwRow={removeKwRow}
                            onGasTypeChange={handleGasTypeChange}
                        />

                    </div>

                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-xl shadow p-5">
                            <h3 className="text-lg font-semibold mb-2">เลือกโมเดลเพื่อสรุปผล</h3>
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value === 'total' ? 'total' : Number(e.target.value))}
                                className="w-full border rounded-lg px-3 py-2 bg-white border-blue-400 focus:ring-2 focus:ring-blue-400 text-base"
                            >
                                {modelOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <CostSummaryBill
                            derived={derived}
                            activeGas={summary.gasType}
                            customRates={customRates}
                            currentSelectionLabel={currentSelectionLabel}
                        />
                    </div>

                </div>
            </main>
        </div>
    );
}

export default TakecoLaserCostV25;