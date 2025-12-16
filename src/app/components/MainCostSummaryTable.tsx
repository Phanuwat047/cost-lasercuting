import React from 'react';
import { DerivedResult, WorkRow } from '../types';
import { thb } from '../utils';

interface MainCostSummaryTableProps {
    derived: DerivedResult;
    rows: WorkRow[];
    currentSelectionLabel: string;
}

const MainCostSummaryTable: React.FC<MainCostSummaryTableProps> = ({ derived, rows, currentSelectionLabel }) => {
    return (
        <section className="bg-white rounded-xl shadow-2xl p-6 border-t-8 border-blue-400">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2">
                สรุปผลรวมต้นทุนต่อชิ้นงาน ({currentSelectionLabel})
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-blue-200">
                        <tr className="text-blue-800">
                            <th className="p-3 border">จำนวนชิ้นงาน (รายการ)</th>
                            <th className="p-3 border">เวลาเฉลี่ย/ชิ้น (นาที)</th>
                            <th className="p-3 border bg-green-300">ต้นทุนรวม/ชิ้น (บาท)</th>
                            <th className="p-3 border bg-red-300">ต้นทุนรวม/เดือน (บาท)</th>
                            <th className="p-3 border">ต้นทุนรวม/ปี (บาท)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center even:bg-gray-50 transition duration-100">
                            <td className="p-2 border font-medium">{rows.length} รายการ</td>
                            <td className="p-2 border">{derived.minutesPerPiece.toFixed(3)}</td>
                            <td className="p-2 border bg-green-100 font-bold text-lg">{derived.totalPerPiece.toFixed(3)}</td>
                            <td className="p-2 border bg-red-100 font-bold">{thb(derived.totalPerMonth)}</td>
                            <td className="p-2 border font-semibold text-blue-700">{thb(derived.totalAnnualCost)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MainCostSummaryTable;
