import mongoos from "mongoose";

export const connectDB = async () => {
  try {
    const URI = process.env.DBURI || "mongodb://localhost:27017/db_1";
    await mongoos.connect(URI);
    console.log(
      `📡 Database connected successfully (${process.env.NODE_ENV}) Mode`,
    );
  } catch (error) {
    console.error(`❌ Database connection fail: ${error.message}`);
    process.exit(1);
  }
};
