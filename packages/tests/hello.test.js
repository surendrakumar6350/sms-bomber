const request = require("supertest");

describe("Mobile Tracking API (/api/hello)", () => {
    it("should return 400 for invalid mobile number", async () => {
        jest.setTimeout(20000);
        const response = await request("http://localhost:3000").get("/api/hello?mobile=123");

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("success", false);
        expect(response.body).toHaveProperty("message");
    }, 50000);

    it("should return success for a valid mobile number", async () => {
        const response = await request("http://localhost:3000").get("/api/hello?mobile=8234567890");

        expect(response.status).toBe(300);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("message", "SMS sent successfully.");
    }, 50000);

    it("should return 400 if an error occurs", async () => {
        const response = await request("http://localhost:3000").get("/api/hello");

        expect(response.status).toBe(400);
    }, 50000);
});
