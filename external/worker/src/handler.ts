import { APIGatewayProxyHandler } from 'aws-lambda';
import { apiService } from './core-services';
import { z } from "zod";
import * as dotenv from 'dotenv';
dotenv.config();

export const hello: APIGatewayProxyHandler = async (event) => {
  const queryParams = event.queryStringParameters;
  const rawMobile = queryParams?.mobile;
  const rawSecret = queryParams?.secret;

  const secretSchema = z.string().min(5, "Must be at least 5 characters").max(30, "Must be at most 30 characters");
  const mobileSchema = z.string().trim().regex(/^\d{10}$/, "Invalid mobile number. It must be exactly 10 digits.");
  const secretResult = secretSchema.safeParse(rawSecret);
  const mobileResult = mobileSchema.safeParse(rawMobile);

  if (!mobileResult.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: mobileResult.error
      }),
    };
  }

  if (!secretResult.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: secretResult.error
      })
    }
  }

  const mobile = mobileResult.data;
  const secret = secretResult.data;

  if (process.env.WORKER_SECRET !== secret) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        success: false,
        message: "Invalid Secret"
      })
    }
  }

  const finalResult = await apiService.sendToRandomFive(mobile);

  return {
    statusCode: 200,
    body: JSON.stringify({
      hello: "Hello from the worker",
      message: "Message sent successfully",
      result: finalResult
    }),
  };
};
