import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChartBar, Eye } from "lucide-react";

const VisitCounter = () => {
    const [visits, setVisits] = useState({ today: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const data = await axios.post(`/api/visitCount`);
                if (!data.data.success) {
                    setError(data.data.message || "Failed to fetch visit data");
                    return;
                }
                setVisits({ today: data.data.today, total: data.data.total });
            } catch (err) {
                console.error(err);
                setError("Unable to fetch visit counts");
            } finally {
                setLoading(false);
            }
        };

        fetchVisits();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
                <p className="font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
                <Eye className="w-10 h-10 text-blue-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Website Visits</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <ChartBar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Today&#39;s Visits</p>
                    <p className="text-2xl font-bold text-blue-700">{visits.today}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 text-center">
                    <ChartBar className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Total Visits</p>
                    <p className="text-2xl font-bold text-green-700">{visits.total}</p>
                </div>
            </div>
        </div>
    );
};

export default VisitCounter;