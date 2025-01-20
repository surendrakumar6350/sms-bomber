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
    }
  ];

  async send(mobile: string): Promise<void> {
    for (const endpoint of this.endpoints) {
      try {
        const body =
          typeof endpoint.bodyTemplate === "function"
            ? JSON.stringify(endpoint.bodyTemplate(mobile))
            : endpoint.bodyTemplate;

        const response = await fetch(endpoint.url, {
          method: "POST",
          headers: endpoint.headers,
          body
        });

        const data = await response.json();
        console.log(`Response from ${endpoint.url}:`, data);
      } catch (error) {
        console.error(`Error calling ${endpoint.url}:`, error);
      }
    }
  }
}

export const apiService = new ApiService();
