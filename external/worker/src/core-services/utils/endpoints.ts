import type { Endpoint } from "./types";
export default function endpoints(): Endpoint[] {
    return [
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
            bodyTemplate: (mobile: string) => ({
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
            bodyTemplate: (mobile: string) => ({
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
            bodyTemplate: (mobile: string) => ({
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
            bodyTemplate: (mobile: string) => ({
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
            bodyTemplate: (mobile: string) =>
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
            bodyTemplate: (mobile: string) => ({
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
            bodyTemplate: (mobile: string) => ({
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
            bodyTemplate: (mobile: string) => ({
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
            bodyTemplate: (mobile: string) => ({
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
            bodyTemplate: (mobile: string) =>
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
            bodyTemplate: (mobile: string) =>
                `action=ajax_send_otp_verification_2&lead_phone=${mobile}`
        },
        {
            url: "https://woich.in/otplogin",
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "accept-language": "en-US,en;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                pragma: "no-cache",
                priority: "u=0, i",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "sec-gpc": "1",
                "upgrade-insecure-requests": "1",
                cookie: `XSRF-TOKEN=eyJpdiI6Im9RUys2NFpUSldRcVZENTdXbk5OeHc9PSIsInZhbHVlIjoiTmI2V1... (shortened)`,
                Referer: "https://woich.in/login",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) =>
                `_token=nfMBnSAGaw7NvcYcU9BKSb8cFNNg6HHznxH3uZPj&type=frontend&mobile=${mobile}`
        },
        {
            url: "https://dehaat.in/api/keycloak/sendOTP",
            headers: {
                accept: "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.5",
                baggage:
                    "sentry-environment=production,sentry-release=kisan-app-web_2.2.43_production,sentry-public_key=71f0d520af42408c8097e5872fed902c,sentry-trace_id=2d206085ed07f6945b6629362f0a8132,sentry-sample_rate=0.25,sentry-transaction=GET%20%2Flogin,sentry-sampled=true",
                "cache-control": "no-cache",
                "content-type": "application/json",
                pragma: "no-cache",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": `"Android"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "sentry-trace": "2d206085ed07f6945b6629362f0a8132-b3a97a4ccee2a486-1",
                cookie: "NEXT_LOCALE=en",
                Referer: "https://dehaat.in/en/login",
                "Referrer-Policy": "same-origin"
            },
            bodyTemplate: (mobile: string) => ({
                mobile_number: mobile,
                client_id: "kisan-app"
            })
        },
        {
            url: "https://api-prod.bewakoof.com/v3/user/auth/login/otp",
            headers: {
                "ab-id": "40",
                accept: "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "access-control-allow-origin": "*",
                "cache-control": "no-cache",
                "client-device-token":
                    "MWY5ZTNmNzFmN2M1ZTUyMjkwNjM2NGMzNmNjZTA3N2Q6M2RhMmI3OTgtNTY2MC00ZDRhLWJhZWQtNTZlMDI2MWRlYmZm",
                "content-type": "application/json",
                pragma: "no-cache",
                "preferred-location": "IN",
                priority: "u=1, i",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": `"Android"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1",
                "x-origin-host": "api-prod.bewakoof.com/v3/user/auth/login/otp",
                "x-tmrw-request-trace-id": "56d363e7-189d-4bc3-907b-8e6cd8890bf5",
                "x-tmrw-trace-id": "0ee497c7-5cdc-443c-a3b6-da4f9db33690",
                Referer: "https://www.bewakoof.com/",
                "Referrer-Policy": "origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) => ({
                mobile,
                country_code: "+91"
            })
        },
        {
            url: "https://user-auth.otpless.app/v3/lp/user/transaction/intent/8187cccb-9333-4446-9b31-ffc7bc675b36",
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "text/plain;charset=UTF-8",
                pragma: "no-cache",
                priority: "u=1, i",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": `"Android"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "sec-gpc": "1",
                Referer: "https://www.curiousjr.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) =>
                JSON.stringify({
                    metadata: `{"browser":"Chrome"}`,
                    loginUri: "https://www.curiousjr.com/login",
                    origin: "https://www.curiousjr.com",
                    version: "V4.1",
                    deviceInfo:
                        '{"userAgent":"Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36","platform":"Win32","vendor":"Google Inc.","browser":"Chrome","connection":"UNKNOWN","language":"en-US","cookieEnabled":true,"screenWidth":1680,"screenHeight":1050,"screenColorDepth":24,"devicePixelRatio":2.625,"timezoneOffset":420,"cpuArchitecture":"4-core","fontFamily":"\\\"Times New Roman\\\"","cHash":"baa2eb3d1f97eafd1e0180c08321be937962fff554408826cfe26d74c1d73974"}',
                    browser: "Chrome",
                    sdkPlatform: null,
                    platform: "Desktop",
                    isLoginPage: true,
                    channel: "OTP",
                    type: "INPUT",
                    mobile: `91${mobile}`,
                    selectedCountryCode: "+91",
                    value: mobile,
                    triggerWebauthn: false,
                    silentAuthEnabled: false,
                    tsId: "26883F28-59404AF0-4000-8-2A3A4382-0000E8755751",
                    inId: "4C6DD999-8ED70F00-4000-8-2542944C-000096CEB2DC-01970850B30F",
                    appId: "FRP1EYAH4VBEXEAR65P9"
                })
        },
        {
            url: "https://api.account.relianceretail.com/service/application/retail-auth/v2.0/send-otp",
            headers: {
                accept: "application/json",
                "accept-language": "en-US,en;q=0.8",
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXR1cm5fdWlfdXJsIjoid3d3Lmppb21hcnQuY29tL2N1c3RvbWVyL2FjY291bnQvbG9naW4_bXNpdGU9eWVzIiwiY2xpZW50X2lkIjoiZmRiNjQ2ZWEtZTcwOC00NzI1LWE5NTMtMjI4ZmExY2I4MzU1IiwiaWF0IjoxNzQ4MTkxNDA5LCJzYWx0IjowfQ.BEdeFmsvCmqvFtsc62iZyLYmlpKyXecCuhukwWFDOpE",
                "cache-control": "no-cache",
                "content-type": "application/json",
                pragma: "no-cache",
                priority: "u=1, i",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": `"Android"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1",
                source_meta:
                    '{"source_id":null,"os_name":"Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36"}',
                Referer: "https://account.relianceretail.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) => ({
                mobile
            })
        },
        {
            url: "https://www.tvsmotor.com/api/Ecommerce/RegisterUser",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.6",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-arch": `"\"`,
                "sec-ch-ua-bitness": `"64"`,
                "sec-ch-ua-full-version-list": `"Chromium";v="136.0.0.0", "Brave";v="136.0.0.0", "Not.A/Brand";v="99.0.0.0"`,
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-model": `"SM-G955U"`,
                "sec-ch-ua-platform": `"Android"`,
                "sec-ch-ua-platform-version": `"8.0.0"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "shell#lang=en; UniqueRandomNumber=3998305; __RequestVerificationToken=zpg1lQ99KF0rfXimf3WzE4qAyBjbhkLTpo_--KkGObWgHs_dMut8JO7xFfU0P-rN40np2JU15BcqRFlSS__5H2nIsbgfIHAL0q-zoPhZTyo1; sxa_site=TVS; ASLBSA=0003d68068f49dfddbd1c062a70e1ac90aacf43e00afdee41e53a61f116bb668d9d1; ASLBSACORS=0003d68068f49dfddbd1c062a70e1ac90aacf43e00afdee41e53a61f116bb668d9d1; _vwo_uuid_v2=DD42C7C7ACA11C4D037DE5FB35603D93C|2210f54503bf7d6403c386401a4b7955; _vwo_uuid=DD42C7C7ACA11C4D037DE5FB35603D93C; _vwo_sn=0%3A1%3A%3A%3A1; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_ds=3%3At_0%2Ca_0%3A0%241748191701%3A20.12461166%3A%3A%3A%3A7; VurnabilityCookie_7878842575=Data={\"MobileNumber\":\"7878842575\",\"BlockedTill\":null,\"GenerateCount\":3,\"VerifyCount\":0,\"TotalCount\":3}; VurnabilityCookie_TotalRequest=Data=3",
                "Referer": "https://www.tvsmotor.com/account/login",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobileNumber: string) =>
                `FullName=Surendra+Kumar&Email=busynightingale1%40deliveryotter.com&CityId=701&Picture=3998305&MobileNumber=${mobileNumber}&Otp=&Locale=R`
        },
        {
            url: "https://www.samsung.com/in/api/v1/sso/otp/init",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "Referer": "https://www.samsung.com/in/web/login?redirect_uri=https%3A%2F%2Fwww.samsung.com%2Fin%2Foffer%2Fsamsung-care-plus%2Flogin%2F",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (userId: string) =>
                `{"user_id":"${userId}"}`
        },
        {
            url: "https://api.khatabook.com/v1/auth/request-otp",
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.5",
                "cache-control": "no-cache",
                "content-type": "application/json",
                pragma: "no-cache",
                priority: "u=1, i",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1",
                "x-kb-app-locale": "en",
                "x-kb-app-name": "Khatabook Website",
                "x-kb-app-version": "000100",
                "x-kb-new-auth": "false",
                "x-kb-platform": "web",
                Referer: "https://khatabook.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) => ({
                country_code: "+91",
                phone: mobile,
                app_signature: "Jc/Zu7qNqQ2"
            })
        },
        {
            url: "https://www.snapdeal.com/signupAjax",
            headers: {
                accept: "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.5",
                "cache-control": "no-cache",
                "content-type": "application/json;charset=UTF-8",
                pragma: "no-cache",
                priority: "u=1, i",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-requested-with": "XMLHttpRequest",
                cookie:
                    "SCOUTER=z7hc6buvc594t4; JSESSIONID=...; other-cookies",
                Referer: "https://www.snapdeal.com/login",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) => ({
                j_number: mobile,
                j_username: "example@example.com",
                j_name: "test",
                j_dob: "24/05/2000",
                j_password: "password123",
                j_confpassword: "password123",
                CSRFToken: "a741ce7fe8e4e33939a6b80587d925772a75d448",
                targetUrl: "",
                mobileStart: "true",
                numberEdit: "false",
                socialid: "",
                gender: "",
                j_displayname: "",
                language: "",
                source: "",
                lastname: "",
                firstname: ""
            })
        },
        {
            url: "https://authentication.zestmoney.in/v2/mobile/otp/",
            headers: {
                accept: "application/json",
                "accept-language": "en-US,en;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/json",
                pragma: "no-cache",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1",
                token: "135b043150475d7288b936606e086af5c1fb7f0eff15256748f5ad078ebdcf85",
                Referer: "https://app.zestmoney.in/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) => ({
                MobileNumber: mobile,
                MessageParams: {
                    MerchantKey: "null"
                }
            })
        },
        {
            url: "https://api.zeptonow.com/api/v1/user/customer/send-otp-sms/",
            headers: {
                accept: "application/json",
                "accept-language": "en-US,en;q=0.8",
                "access-control-allow-credentials": "true",
                "access-control-allow-methods": "GET, POST, OPTIONS",
                "access-control-allow-origin": "*",
                app_sub_platform: "WEB",
                app_version: "12.75.8",
                appversion: "12.75.8",
                auth_revamp_flow: "v2",
                bundleversion: "v1",
                "cache-control": "no-cache",
                compatible_components:
                    "CONVENIENCE_FEE,NEW_FEE_STRUCTURE,NEW_BILL_INFO,RE_PROMISE_ETA_ORDER_SCREEN_ENABLED,SUPERSTORE_V1,MANUALLY_APPLIED_DELIVERY_FEE_RECEIVABLE,MARKETPLACE_REPLACEMENT,ZEPTO_PASS,ZEPTO_PASS:1,ZEPTO_PASS:2,ZEPTO_PASS_RENEWAL,CART_REDESIGN_ENABLED,SHIPMENT_WIDGETIZATION_ENABLED,TABBED_CAROUSEL_V2,24X7_ENABLED_V1,PROMO_CASH:0,HOMEPAGE_V2,SUPER_SAVER:1,NO_PLATFORM_CHECK_ENABLED_V2,HP_V4_FEED,GIFT_CARD,SCLP_ADD_MONEY,GIFTING_ENABLED,OFSE,WIDGET_BASED_ETA,PC_REVAMP_1,NEW_ETA_BANNER,NO_COST_EMI_V1,",
                "content-type": "application/json; charset=UTF-8",
                device_id: "0342c119-dd06-437d-9235-9ca335c245f7",
                deviceid: "0342c119-dd06-437d-9235-9ca335c245f7",
                deviceuid: "",
                marketplace_type: "ZEPTO_NOW",
                platform: "WEB",
                pragma: "no-cache",
                priority: "u=1, i",
                "request-signature":
                    "2ccffc0b912972171a8a40f52990373d7d2fce96fcfc67f89a9674032835053d",
                request_id: "abb108a1-e1b5-48ff-8309-29f43cb24269",
                requestid: "abb108a1-e1b5-48ff-8309-29f43cb24269",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1",
                session_id: "78251f3c-1c23-4bf2-96dc-a73654782435",
                sessionid: "78251f3c-1c23-4bf2-96dc-a73654782435",
                store_etas:
                    '{"fa5e892d-65d7-4da6-9bde-e1f22deb7b6f":-1}',
                store_id: "fa5e892d-65d7-4da6-9bde-e1f22deb7b6f",
                store_ids: "fa5e892d-65d7-4da6-9bde-e1f22deb7b6f",
                storeid: "fa5e892d-65d7-4da6-9bde-e1f22deb7b6f",
                systemversion: "",
                tenant: "ZEPTO",
                "x-csrf-secret": "tjV1Vtz_iRI",
                "x-requested-with": "XMLHttpRequest",
                "x-timezone":
                    "b218262f70cb979ec1c3f3656853fde1fab24355fa74431c8224fc8c367f4638",
                "x-xsrf-token":
                    "eBEry2dhDh35F0srt-S_7:2dFLV00gQyGrpaIBKpbhETKCHUE.J5hBBuAntMbXxpkZTqoYpYIVLvI5PBbQdbJ+08DbXs0",
                Referer: "https://www.zeptonow.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) => ({
                mobileNumber: mobile
            })
        },
        {
            url: "https://2.rome.api.flipkart.com/api/7/user/otp/generate",
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.6",
                "cache-control": "no-cache",
                "content-type": "application/json",
                pragma: "no-cache",
                "sec-ch-ua": `"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1",
                "x-user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 FKUA/website/42/website/Desktop channelType/brw",
                cookie:
                    "T=TI174480000183000173969151198982337095471073848911702479704286767060; ULSN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb29raWUiLCJhdWQiOiJmbGlwa2FydCIsImlzcyI6ImF1dGguZmxpcGthcnQuY29tIiwiY2xhaW1zIjp7ImdlbiI6IjEiLCJ1bmlxdWVJZCI6IlVVSTI1MDQyNzE3MzU0NTgzOEVFUlU1REkiLCJma0RldiI6bnVsbH0sImV4cCI6MTc2MTUzNTU0NSwiaWF0IjoxNzQ1NzU1NTQ1LCJqdGkiOiJmNTJjN2I3MS00OGRjLTRmNDAtOTIwNi1jYTAyNDIzNzY2NGIifQ.pYMYT061OgdLIQEOF_3Kj_1JJoW9AeT28r1u3jwxnF0; vh=613; vw=1366; dpr=1; at=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFkOTYzYzUwLTM0YjctNDA1OC1iMTNmLWY2NDhiODFjYTBkYSJ9.eyJleHAiOjE3NDk5NzM3MjAsImlhdCI6MTc0ODI0NTcyMCwiaXNzIjoia2V2bGFyIiwianRpIjoiZTZiOTFhODQtODFkYS00MjY3LTg4ZGItNDk4ODc1YmNiYTE0IiwidHlwZSI6IkFUIiwiZElkIjoiVEkxNzQ0ODAwMDAxODMwMDAxNzM5NjkxNTExOTg5ODIzMzcwOTU0NzEwNzM4NDg5MTE3MDI0Nzk3MDQyODY3NjcwNjAiLCJrZXZJZCI6IlZJOEY4MDg0MkM5RUVBNEJENDgwRkM0MDU5OTRFRjgxNzUiLCJ0SWQiOiJtYXBpIiwidnMiOiJMTyIsInoiOiJIWUQiLCJtIjp0cnVlLCJnZW4iOjR9.qkN1CfALjpkSDRiundsRr8Glr86ZX8M0PnzD2Gu9NpY; ...",
                Referer: "https://www.flipkart.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            bodyTemplate: (mobile: string) => ({
                loginId: `+91${mobile}`
            })
        }
    ];
}