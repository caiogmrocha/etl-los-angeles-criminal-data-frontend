import { Suspense, useEffect, useState } from "react";
import { CrimesAmountPerSexChart } from "./components/CrimesAmountPerSexChart";
import { ApiProvider, ApiProviderGetReportDataResponseDTO } from "@/providers/api";

export function DashboardPage() {
    const apiProvider = new ApiProvider()
    const [reportData, setReportData] = useState<ApiProviderGetReportDataResponseDTO | null>(null)

    useEffect(() => {
        apiProvider.getReportData().then(setReportData)
    }, [])

    return (
        <div className="container mx-auto mt-5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Dashboard
            </h1>
            
            <main className="flex py-4 gap-4">
                {reportData ? (
                    <CrimesAmountPerSexChart data={reportData?.crimes_amount_per_sex ?? null} />
                ) : (
                    <p>Loading...</p>
                )}
            </main>
        </div>
    )
}