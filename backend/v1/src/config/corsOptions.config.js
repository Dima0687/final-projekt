import allowedOrigins from "./allowedOrigins.config.js";

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}


export {
  corsOptions
}