import winston from "winston";
import { env } from "./env.ts";

// Helper function to serialize errors in objects
const serializeError = ({ message, stack, ...rest }: Error) => ({
  message,
  stack,
  ...rest,
});

// Helper function to handle metadata serialization including nested errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serializeMetadata = (metadata: any) => {
  if (typeof metadata === "number") {
    return { value: metadata };
  }

  const serialized = { ...metadata };
  Object.keys(serialized).forEach((key) => {
    if (serialized[key] instanceof Error) {
      serialized[key] = serializeError(serialized[key]);
    }
  });
  return serialized;
};

// Logtail client

const logger = winston.createLogger({
  level: env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    env.NODE_ENV === "development" ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
      // Handle when message is an Error
      if (message instanceof Error) {
        message = JSON.stringify(serializeError(message), null, 2);
      }
      // Handle when message is an object
      else if (typeof message === "object") {
        message = JSON.stringify(message, null, 2);
      }

      const metaString = JSON.stringify(serializeMetadata(metadata), null, 2);
      return `${timestamp} ${level}: ${message} ${metaString !== "{}" ? metaString : ""}`;
    }),
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 50_000_000, // 50MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "logs/info.log",
      level: "info",
      maxsize: 50_000_000, // 50MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "logs/debug.log",
      level: "debug",
      maxsize: 50_000_000, // 50MB
      maxFiles: 5,
    }),
  ],
});

// Log to console in development
if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, ...metadata }) => {
          const metaString = JSON.stringify(serializeMetadata(metadata), null, 2);
          return `${timestamp} ${level}: ${message} ${metaString !== "{}" ? metaString : ""}`;
        }),
      ),
    }),
  );
}

export { logger };
