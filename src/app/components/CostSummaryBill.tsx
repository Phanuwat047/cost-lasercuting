import React from 'react';
import { CustomRates, DerivedResult } from '../types';
import { thb, num } from '../utils';

interface CostSummaryBillProps {
    derived: DerivedResult;
    activeGas: string;
    customRates: CustomRates;
    currentSelectionLabel: string;
}

const CostSummaryBill: React.FC<CostSummaryBillProps> = ({ derived, activeGas, customRates, currentSelectionLabel }) => {

    const annualElec = derived.elecPerMonth * 12;
    const annualGas = derived.gasPerMonth * 12;
    const annualSpare = customRates.baseSparePartTHBPerMonth * 12;
    const annualAirCooling = derived.airCoolingPerMonth * 12;

    return (
        <div className="bg-white rounded-2xl shadow p-5 sticky top-6">
            <h2 className="text-lg font-semibold mb-2">
                สรุปผลการคำนวณ: <span className="text-blue-700">{currentSelectionLabel}</span>
            </h2>
            <p className="text-xs text-gray-500 border-b pb-2 mb-3">
                *ค่า/เดือน และ /ปี คำนวณจาก Load Factor ของชิ้นงานที่เลือก
            </p>

            <div className="space-y-2 text-sm border-b pb-3 mb-3">
                <div className="flex justify-between"><span>kW รวม (ใช้คำนวณ)</span><span className="font-bold text-red-600">{num(derived.totalKwAfterLoad)} kW</span></div>
                <div className="flex justify-between"><span>นาที/ชิ้น (เฉลี่ย)</span><span className="font-semibold">{num(derived.minutesPerPiece)} min</span></div>
                <div className="flex justify-between"><span>ชิ้น/เดือน (Projected)</span><span className="font-semibold">{num(derived.monthlyPieces)} pcs</span></div>
            </div>

            <h3 className="font-semibold mb-2">ต้นทุนต่อชิ้น (บาท/ชิ้น)</h3>
            <div className="space-y-1 text-sm border-b pb-3 mb-3">
                <div className="flex justify-between"><span>ไฟฟ้า</span><span className="font-semibold">฿ {thb(derived.elecPerPiece)}</span></div>
                <div className="flex justify-between"><span>แก๊ส ({activeGas.toUpperCase()})</span><span className="font-semibold">฿ {thb(derived.gasPerPiece)}</span></div>
                <div className="flex justify-between"><span>ค่าลม Cooling/Air Assist</span><span className="font-semibold text-orange-600">฿ {thb(derived.airCoolingPerPiece)}</span></div>
                <div className="flex justify-between"><span>อะไหล่สิ้นเปลือง</span><span className="font-semibold">฿ {thb(derived.sparePerPiece)}</span></div>
                <div className="flex justify-between text-base mt-2"><span className="font-bold">รวมต้นทุนต่อชิ้น</span><span className="font-bold text-lg text-green-600">฿ {thb(derived.totalPerPiece)}</span></div>
            </div>

            <h3 className="font-semibold mb-2">ต้นทุนต่องาน (บาท/งาน)</h3>
            <div className="space-y-1 text-sm border-b pb-3 mb-3">
                <p className="text-xs text-gray-500 mb-2">อ้างอิงจากชิ้นงานเฉลี่ย: {num(derived.avgNestingParts)} ชิ้น/งาน</p>
                <div className="flex justify-between"><span>ไฟฟ้า</span><span className="font-semibold text-purple-700">฿ {thb(derived.elecPerJob)}</span></div>
                <div className="flex justify-between"><span>แก๊ส ({activeGas.toUpperCase()})</span><span className="font-semibold text-purple-700">฿ {thb(derived.gasPerJob)}</span></div>
                <div className="flex justify-between"><span>ค่าลม Cooling/Air Assist</span><span className="font-semibold text-orange-600">฿ {thb(derived.airCoolingPerJob)}</span></div>
                <div className="flex justify-between"><span>อะไหล่สิ้นเปลือง</span><span className="font-semibold text-purple-700">฿ {thb(derived.sparePerJob)}</span></div>
                <div className="flex justify-between text-base mt-2"><span className="font-bold">รวมต้นทุนต่องาน</span><span className="font-bold text-lg text-purple-600">฿ {thb(derived.totalPerJob)}</span></div>
            </div>

            <h3 className="font-semibold mb-2">ต้นทุนรวม/เดือน (Projected)</h3>
            <div className="space-y-1 text-sm border-b pb-3 mb-3">
                <div className="flex justify-between"><span>ค่าไฟ/เดือน</span><span className="font-semibold">฿ {thb(derived.elecPerMonth)}</span></div>
                <div className="flex justify-between"><span>แก๊ส/เดือน</span><span className="font-semibold">฿ {thb(derived.gasPerMonth)}</span></div>
                <div className="flex justify-between"><span>ค่าลม Cooling/Air Assist</span><span className="font-semibold text-orange-600">฿ {thb(derived.airCoolingPerMonth)}</span></div>
                <div className="flex justify-between"><span>อะไหล่สิ้นเปลือง/เดือน</span><span className="font-semibold">฿ {thb(customRates.baseSparePartTHBPerMonth)}</span></div>
                <div className="flex justify-between text-base mt-2">
                    <span className="font-bold">รวมต่อเดือน</span>
                    <span className="font-bold text-lg text-red-600">฿ {thb(derived.totalPerMonth)}</span>
                </div>
            </div>

            <h3 className="font-semibold mb-2">ต้นทุนรวม/ปี (Projected)</h3>
            <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>ค่าไฟ/ปี</span><span className="font-semibold">฿ {thb(annualElec)}</span></div>
                <div className="flex justify-between"><span>แก๊ส/ปี</span><span className="font-semibold">฿ {thb(annualGas)}</span></div>
                <div className="flex justify-between"><span>ค่าลม Cooling/Air Assist</span><span className="font-semibold text-orange-600">฿ {thb(annualAirCooling)}</span></div>
                <div className="flex justify-between"><span>อะไหล่สิ้นเปลือง/ปี</span><span className="font-semibold">฿ {thb(annualSpare)}</span></div>
                <div className="flex justify-between text-base mt-2">
                    <span className="font-bold">รวมต่อปี</span>
                    <span className="font-bold text-lg text-red-900">฿ {thb(derived.totalAnnualCost)}</span>
                </div>
            </div>
        </div>
    );
};

export default CostSummaryBill;
