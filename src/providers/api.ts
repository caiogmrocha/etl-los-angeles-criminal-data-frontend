const BASE_URL = "http://localhost:8080"

export class ApiProvider {
    public async getReportData(): Promise<ApiProviderGetReportDataResponseDTO> {
        const response = await fetch(`${BASE_URL}/reports/criminal-data`)
        return await response.json()
    }
}

export type ApiProviderGetReportDataResponseDTO = {
    crimes_amount_per_age: {
        [key in `from_${number}_to_${number}`]: number;
    };
    crimes_amount_per_area: {
        [key in string]: number;
    };
    crimes_amount_per_period: {
        [key in `from_${number}_to_${number}`]: {
            [key in `from_${number}_to_${number}`]: number
        };
    };
    crimes_amount_per_sex: {
        male: number;
        female: number;
        unknown: number;
        non_binary: number;
    }
}