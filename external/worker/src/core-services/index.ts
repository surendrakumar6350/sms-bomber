import endpoints from "./utils/endpoints";
import type { Endpoint, ApiResponse } from "./utils/types";

class ApiService {
    private endpoints: Endpoint[] = endpoints();

    private queue: Array<() => Promise<void>> = [];
    private isProcessing = false;
    private readonly delayBetweenRequests = 500;
    private readonly maxRetries = 2;
    private readonly requestTimeout = 500;

    private async processQueue(): Promise<void> {
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const request = this.queue.shift();
            if (request) {
                await request();
                await new Promise(resolve => setTimeout(resolve, this.delayBetweenRequests));
            }
        }

        this.isProcessing = false;
    }

    private async makeRequest(
        endpoint: Endpoint,
        mobile: string,
        retryCount = 0
    ): Promise<ApiResponse> {
        try {
            const body = typeof endpoint.bodyTemplate === "function"
                ? JSON.stringify(endpoint.bodyTemplate(mobile))
                : endpoint.bodyTemplate;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

            const response = await fetch(endpoint.url, {
                method: "POST",
                headers: endpoint.headers,
                body,
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return {
                url: endpoint.url,
                success: true,
                data
            };
        } catch (error) {
            if (error instanceof TypeError && error.message === "Failed to fetch") {
                if (retryCount < this.maxRetries) {
                    console.log(`Retrying request to ${endpoint.url}, attempt ${retryCount + 1}`);
                    await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
                    return this.makeRequest(endpoint, mobile, retryCount + 1);
                }
            }

            return {
                url: endpoint.url,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    async send(mobile: string): Promise<ApiResponse[]> {
        const results: ApiResponse[] = [];

        this.endpoints.forEach(endpoint => {
            this.queue.push(async () => {
                const result = await this.makeRequest(endpoint, mobile);
                results.push(result);
                console.log(`Response from ${endpoint.url}:`, result);
            });
        });

        await this.processQueue();

        return results;
    }

    async sendToRandomFive(mobile: string): Promise<ApiResponse[]> {
        if (this.endpoints.length < 2) {
            throw new Error("Not enough endpoints to pick two.");
        }

        const shuffled = [...this.endpoints].sort(() => Math.random() - 0.5);
        const selectedEndpoints = shuffled.slice(0, 5);

        const requests = selectedEndpoints.map(endpoint =>
            this.makeRequest(endpoint, mobile)
        );

        const results = await Promise.all(requests);

        results.forEach((result: any) => {
            console.log(`Random parallel response from ${result.url}:`, result);
        });

        return results;
    }

}

export const apiService = new ApiService();
