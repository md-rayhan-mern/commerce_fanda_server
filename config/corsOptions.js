const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
<<<<<<< HEAD
  : ["http://localhost:5173", "http://localhost:3000"];
=======
  : ["http://localhost:5173"];
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(
        new Error("CORS Policy: এই ডোমেইন থেকে রিকোয়েস্ট পাঠানোর অনুমতি নেই!"),
      );
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
