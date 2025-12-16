import React from 'react';
import { CustomKwRates, CustomRates, DerivedResult, KwItem, SummaryOptions } from '../types';
import { num } from '../utils';

interface EquipmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    summary: SummaryOptions;
    onUpdate: (field: keyof SummaryOptions, value: string) => void;
    options: any;
    customRates: CustomRates;
    onRateUpdate: (field: keyof CustomRates, value: number) => void;
    derived: DerivedResult;
    customKwRates: CustomKwRates;
    updateKw: (id: string, patch: Partial<KwItem>) => void;
    updateLaserAmpere: (value: number) => void;
    addKwRow: () => void;
    removeKwRow: (id: string) => void;
    onGasTypeChange: (type: 'Air' | 'Oxygen' | 'Nitrogen') => void;
}

const Dropdown = ({
    field, label, value, opts, disabled = false, onUpdate, onGasTypeChange
}: {
    field: keyof SummaryOptions, label: string, value: string, opts: string[], disabled?: boolean,
    onUpdate: (field: keyof SummaryOptions, value: string) => void,
    onGasTypeChange: (type: 'Air' | 'Oxygen' | 'Nitrogen') => void
}) => (
    <div className="flex flex-col justify-end space-y-1">
        <label className="block text-sm font-bold text-gray-700">{label}</label>
        <select
            value={value}
            onChange={(e) => {
                const newValue = e.target.value;
                if (field === 'gasType') {
                    const newGasType = newValue as 'Air' | 'Oxygen' | 'Nitrogen';
                    onGasTypeChange(newGasType);
                } else {
                    onUpdate(field, newValue);
                }
            }}
            disabled={disabled}
            className={`w-full border rounded-lg px-3 py-2 ${disabled ? 'bg-gray-100' : 'bg-white'} focus:ring-blue-400`}
        >
            {opts.map((opt: string) => (<option key={opt} value={opt}>{opt}</option>))}
        </select>
    </div>
);

const CustomRateInput = ({
    field, label, unit, value, onRateUpdate
}: {
    field: keyof CustomRates, label: string, unit: string, value: number,
    onRateUpdate: (field: keyof CustomRates, value: number) => void
}) => (
    <div className="flex flex-col justify-end space-y-1">
        <label className="block text-sm font-bold text-gray-700">{label}</label>
        <input
            type="number" step="any"
            value={value}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                if (!isNaN(newValue)) { onRateUpdate(field, newValue); }
            }}
            className={`w-full border rounded-lg px-3 py-2 ${field === 'gasRateTHBPerMin' ? 'bg-yellow-100 border-yellow-500 font-bold' : 'bg-white border-gray-300'} focus:ring-yellow-400`}
        />
        <p className="text-xs text-gray-500">{unit}</p>
    </div>
);

const KwItemInput = ({
    item, index, isLaser, updateKw, customKwRates, updateLaserAmpere, removeKwRow
}: {
    item: KwItem, index: number, isLaser: boolean,
    updateKw: (id: string, patch: Partial<KwItem>) => void,
    customKwRates: CustomKwRates,
    updateLaserAmpere: (value: number) => void,
    removeKwRow: (id: string) => void
}) => (
    <div className="col-span-1 border border-gray-300 p-3 rounded-md bg-white shadow-sm">
        <h5 className="text-sm font-bold text-blue-700 mb-2">{item.name}</h5>

        <div className="mb-2">
            <label className="block text-xs font-semibold text-gray-600">กำลังไฟฟ้าจริง (kW)</label>
            <input
                type="number" step="any" min="0"
                value={item.kw}
                onChange={(e) => updateKw(item.id, { kw: e.target.value })}
                className="w-full border rounded-lg px-2 py-1 bg-white border-gray-300 focus:ring-blue-400 text-sm"
            />
        </div>

        {isLaser && (
            <div>
                <label className="block text-xs font-semibold text-gray-600">กระแสไฟฟ้า (A)</label>
                <input
                    type="number" step="any" min="0"
                    value={customKwRates.laserAmpere}
                    onChange={(e) => updateLaserAmpere(Number(e.target.value))}
                    className="w-full border rounded-lg px-2 py-1 bg-blue-50 border-blue-400 font-medium focus:ring-blue-400 text-sm"
                />
            </div>
        )}

        {index >= 6 && (
            <button
                onClick={() => removeKwRow(item.id)}
                className="mt-2 text-red-500 text-xs hover:text-red-700"
            >
                ลบรายการ
            </button>
        )}
    </div>
);

const EquipmentModal: React.FC<EquipmentModalProps> = ({
    isOpen, onClose, summary, onUpdate, options, customRates, onRateUpdate,
    derived, customKwRates, updateKw, updateLaserAmpere, addKwRow, removeKwRow, onGasTypeChange
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50" onClick={onClose}>
            <div className="relative top-10 mx-auto p-8 border w-11/12 md:w-4/5 lg:w-4/5 xl:w-2/3 shadow-2xl rounded-xl bg-white" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-extrabold text-blue-800">ตั้งค่าอุปกรณ์และโหมดการตัด (Equipment Configuration)</h3>
                    <button onClick={onClose} className="text-red-500 hover:text-red-700 text-3xl font-light">&times;</button>
                </div>

                <div className="space-y-8">

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="text-lg font-bold text-blue-800 mb-3">กำหนดกำลังไฟฟ้า (kW) และกระแสไฟฟ้า (A)</h4>

                        <div className="mb-4">
                            <Dropdown
                                field="laserPower"
                                label="1. Laser Power (เลือกเพื่อลิงก์ Chiller/Stabilizer kW)"
                                value={summary.laserPower}
                                opts={options.laserPowerOptions}
                                onUpdate={onUpdate}
                                onGasTypeChange={onGasTypeChange}
                            />
                            <p className="text-xs text-gray-500 mt-1">การเลือกนี้จะอัปเดตค่า kW ของ Laser Source, Chiller, และ Stabilizer รวมถึง Ampere ของ Laser Source อัตโนมัติ</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                            {customKwRates.kwItems.map((item, index) => (
                                item.id === 'machine' ? (
                                    <div key={item.id} className="col-span-1 border border-gray-300 p-3 rounded-md bg-white shadow-sm">
                                        <Dropdown
                                            field="machineType"
                                            label="4. Machine Type"
                                            value={summary.machineType}
                                            opts={options.machineTypeOptions}
                                            onUpdate={onUpdate}
                                            onGasTypeChange={onGasTypeChange}
                                        />
                                    </div>
                                ) : (
                                    <KwItemInput
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        isLaser={item.id === 'laser'}
                                        updateKw={updateKw}
                                        customKwRates={customKwRates}
                                        updateLaserAmpere={updateLaserAmpere}
                                        removeKwRow={removeKwRow}
                                    />
                                )
                            ))}
                        </div>
                        <button onClick={addKwRow} className="mt-4 px-3 py-2 rounded-xl border bg-blue-700 text-white hover:bg-blue-800 text-sm shadow-sm">+ เพิ่มรายการกำลังไฟอื่น ๆ</button>

                        <div className="mt-4 p-3 bg-blue-100 rounded-md">
                            <p className="text-sm font-semibold text-blue-700">Ampere รวมที่ใช้ในการคำนวณ (โดยประมาณ): <span className="text-red-600">{num(derived.totalAmpere)} A</span></p>
                            <p className="text-sm font-semibold text-blue-700">kW รวมก่อน Load Factor: <span className="text-red-600">{num(derived.totalKw)} kW</span></p>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                        <h4 className="text-lg font-bold text-yellow-800 mb-3">ปรับแต่งอัตราต้นทุนและการดำเนินงาน</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-4">
                            <CustomRateInput
                                field="elecCostPerKwh"
                                label="7. ค่าไฟฟ้า"
                                unit="THB/kWh (บาท/หน่วย)"
                                value={customRates.elecCostPerKwh}
                                onRateUpdate={onRateUpdate}
                            />
                            <CustomRateInput
                                field="baseSparePartTHBPerMonth"
                                label="8. ค่า Spare Part (ฐาน)"
                                unit="THB/เดือน (ใช้ในการคำนวณต้นทุนหลัก)"
                                value={customRates.baseSparePartTHBPerMonth}
                                onRateUpdate={onRateUpdate}
                            />
                            <CustomRateInput
                                field="gasRateTHBPerMin"
                                label="9. ค่า Gas/min"
                                unit="THB/min (ค่าเริ่มต้นปรับตาม Gas Type)"
                                value={customRates.gasRateTHBPerMin}
                                onRateUpdate={onRateUpdate}
                            />
                            <CustomRateInput
                                field="loadFactorPct"
                                label="10. Load Factor"
                                unit="(0 - 100) %"
                                value={customRates.loadFactorPct}
                                onRateUpdate={onRateUpdate}
                            />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-4 border-yellow-300">
                            <CustomRateInput
                                field="airCompCostPerHr"
                                label="11. ค่าบำรุงรักษา Air Comp"
                                unit="THB/Hr (ใช้คิดค่าลม Cooling/Assist)"
                                value={customRates.airCompCostPerHr}
                                onRateUpdate={onRateUpdate}
                            />
                            <CustomRateInput
                                field="hoursPerDay"
                                label="12. ชั่วโมงทำงาน/วัน"
                                unit="Hrs/Day"
                                value={customRates.hoursPerDay}
                                onRateUpdate={onRateUpdate}
                            />
                            <CustomRateInput
                                field="workingDaysPerMonth"
                                label="13. วันทำงาน/เดือน"
                                unit="Days/Month"
                                value={customRates.workingDaysPerMonth}
                                onRateUpdate={onRateUpdate}
                            />
                            <div className="text-sm font-semibold text-gray-700 col-span-2 flex items-center justify-center">
                                <div className="p-3 bg-yellow-100 rounded-md">
                                    ชั่วโมงทำงานต่อเดือน:
                                    <span className="text-red-600 ml-2 text-md">{num(derived.hoursPerMonth)} Hrs</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

                        <Dropdown field="gasType" label="15. Gas Type" value={summary.gasType} opts={options.gasTypeOptions} onUpdate={onUpdate} onGasTypeChange={onGasTypeChange} />
                        <Dropdown field="machineGeometry" label="16. Machine Geometry" value={summary.machineGeometry} opts={options.machineGeometryOptions} onUpdate={onUpdate} onGasTypeChange={onGasTypeChange} />
                        <Dropdown field="nozzle" label="17. Nozzle" value={summary.nozzle} opts={options.nozzleTypes} onUpdate={onUpdate} onGasTypeChange={onGasTypeChange} />
                        <Dropdown field="cuttingMode" label="18. Cutting Mode" value={summary.cuttingMode} opts={options.cuttingModes} onUpdate={onUpdate} onGasTypeChange={onGasTypeChange} />
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-150">
                            ยืนยันการตั้งค่า (Close)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentModal;
