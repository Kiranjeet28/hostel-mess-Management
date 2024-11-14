"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCheck, FaTimes } from 'react-icons/fa';

type Messperstd = {
    Id: string;
    Year: number;
    january: boolean;
    february: boolean;
    march: boolean;
    april: boolean;
    may: boolean;
    june: boolean;
    july: boolean;
    august: boolean;
    september: boolean;
    october: boolean;
    november: boolean;
    december: boolean;
    Student: {
        Name: string;
        RollNumber: number;
        Branch: string;
    };
};

export default function MessperstdList() {
    const [data, setData] = useState<Messperstd[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [years, setYears] = useState<number[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/messperstd');
                const messData: Messperstd[] = await response.json();
                setData(messData);

                // Extract unique years from data
                const uniqueYears = Array.from(new Set(messData.map(record => record.Year)));
                setYears(uniqueYears);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = selectedYear ? data.filter(record => record.Year === selectedYear) : [];

    if (loading) return <p className="text-gray-900">Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {/* Dropdown to select the year */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{selectedYear ? `Year: ${selectedYear}` : "Select Year"}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel>Select Year</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={selectedYear?.toString()}
                        onValueChange={(value) => setSelectedYear(parseInt(value))}
                    >
                        {years.map((year: number) => (
                            <DropdownMenuRadioItem key={year} value={year.toString()}>
                                {year}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Display filtered data for the selected year */}
            {filteredData.length > 0 ? (

                filteredData.map((record: Messperstd) => (
                    <div key={record.Id} >
                      
                        {/* Table for monthly attendance */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-main mt-4 table-auto">
                                <thead>
                                    <tr>
                                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                            <th key={month} className="px-4 py-2 border-b bg-[#01509171] text-Black whitespace-nowrap">{month}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {Object.values(record).slice(3, 15).map((status, index) => (
                                            <td key={index} className="px-4 py-2 border-b text-center">
                                                {status ? (
                                                    <FaCheck className="w-5 h-5 text-main" />
                                                ) : (
                                                    <FaTimes className="w-5 h-5 text-red-500 mx-auto" />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            ) : (
                <p className="mt-4">No records found for the selected year.</p>
            )}
        </div>
    );

}