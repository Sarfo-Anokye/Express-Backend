import {createLogger, format, transports} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import * as dotenv from "dotenv";
import {join} from "path";
dotenv.config();
export class LoggerService {
  private readonly logTimeFormat = "MMM-DD-YYYY HH:mm:ss";
  private readonly logsDir = process.env.LOGS_DIR || "logs";
  private readonly loggers: Map<string, any> = new Map();

  // Shared console transport for all loggers
  private readonly consoleTransport = new transports.Console({
    level: "warn",
    format: format.combine(
      format.timestamp({format: this.logTimeFormat}),
      format.printf((info) => {
        return `${info.level}: ${info.timestamp}: [${info.context}]: ${this.formatMessage(info.message)}`;
      }),
      format.colorize({all: true})
    ),
    handleExceptions: false
  });

  constructor() {
    // Create default logger
    this.createLogger("app");
  }

  /**
   * Get or create a logger for a specific module
   */
  getLogger(context: string): any {
    if (!this.loggers.has(context)) {
      this.createLogger(context);
    }
    return this.loggers.get(context);
  }

  /**
   * Create a new logger for a specific module
   */
  private createLogger(context: string): void {
    const fileTransport = new DailyRotateFile({
      dirname: join(this.logsDir, context),
      filename: `%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      format: format.combine(
        format.timestamp({format: this.logTimeFormat}),
        format.json()
      ),
      handleExceptions: false
    });

    const logger = createLogger({
      level: process.env.LOG_LEVEL || "info",
      defaultMeta: {context},
      format: format.combine(
        format.timestamp({format: this.logTimeFormat}),
        format.json()
      ),
      transports: [this.consoleTransport, fileTransport],
      exitOnError: false
    });

    // Add convenience methods that include context
    const enhancedLogger = {
      log: (message: any) =>
        logger.info(this.formatLogMessage(message, context)),
      error: (message: any, trace?: string) =>
        logger.error(this.formatLogMessage(message, context, trace)),
      warn: (message: any) =>
        logger.warn(this.formatLogMessage(message, context)),
      debug: (message: any) =>
        logger.debug(this.formatLogMessage(message, context)),
      verbose: (message: any) =>
        logger.verbose(this.formatLogMessage(message, context)),
      // Original winston logger methods
      info: logger.info.bind(logger),
      child: logger.child.bind(logger),
      // The original logger instance
      instance: logger
    };

    this.loggers.set(context, enhancedLogger);
  }

  /**
   * Format message for logging
   */
  private formatMessage(message: any): string {
    if (typeof message === "object") {
      return JSON.stringify(message);
    }
    return message;
  }

  /**
   * Format log message with context
   */
  private formatLogMessage(message: any, context: string, trace?: string): any {
    const formattedMessage =
      typeof message === "object" ? {...message} : {message};

    return {
      ...formattedMessage,
      context,
      trace,
      timestamp: new Date().toISOString()
    };
  }
}
