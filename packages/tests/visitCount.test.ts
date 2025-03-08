const request = require("supertest");

describe("Visit Count API", () => {
    it("should increment visit count", async () => {
        const response = await request("http://localhost:3000").post("/api/visitCount");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("today");
    }, 50000);

    it("should return an error for incorrect requests", async () => {
        jest.setTimeout(20000);
        // Sending an invalid request (e.g., GET instead of POST)
        const response = await request("http://localhost:3000").get("/api/visitCount");

        expect(response.status).not.toBe(200); // Expect a non-200 status (e.g., 404 or 405)
    }, 50000);
});
