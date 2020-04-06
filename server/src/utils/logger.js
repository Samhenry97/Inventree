import winston from 'winston';

const { combine, timestamp, printf } = winston.format;
const format = printf(({ message, level, timestamp }) => {
  return `${level} (${timestamp}): ${message}`;
});

export default winston.createLogger({
  level: 'info',
  format: combine(timestamp(), format),
  transports: [
      new winston.transports.Console()
  ]
});
