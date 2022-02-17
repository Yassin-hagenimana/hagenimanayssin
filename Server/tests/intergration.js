import faker from "@faker-js/faker";
import { request } from "undici";
import { createTestServer } from "../../utils/test-utils";

const { serverURL, prisma } = createTestServer();

const tokenstructure = {
  id: expect.any(Number),
  token: expect.any(Number),
  amount: expect.any(Number),
  meterNumber: expect.any(Number),
};

beforeAll(async () => {
  await prisma.post.create({
    data: {
      amount: faker.lorem.sentence(),
      token: faker.lorem.paragraph(),
      meterNumber: 111111,
    },
  });

  console.log("✨ inserted token into database");
});

describe("Post API", () => {
  describe("GET /api/tokens", () => {
    it("Should return tokens", async () => {
      const { statusCode, body, headers } = await request(
        `${serverURL}/api/tokens`
      );

      const respData = await body.json();

      expect(headers["content-type"]).toMatch(/application\/json/);

      expect(statusCode).toBe(200);

      for (const tokens of respData) {
        expect(tokens).toMatchObject(tokenstructure);
      }
    });
  });

  describe("POST /api/tokens", () => {
    it("Should create Post", async () => {
      const { statusCode, body } = await request(`${serverURL}/api/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: faker.lorem.paragraph(),
          amount: faker.lorem.sentence(),
          authorId: 1,
        }),
      });

      const respData = await body.json();

      expect(statusCode).toBe(201);
      expect(typeof respData).toBe("object");
    });
  });
});

afterAll(async () => {
  await prisma.$disconnect();
})