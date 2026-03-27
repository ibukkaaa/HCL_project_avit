import pkg from "pg"
const { Pool } = pkg

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20,
    idleTimeoutMillis: 30000
})

export const connectDB = async () => {
    try{
        const client = await pool.connect()
        console.log("Database connected")
        client.release()
    }catch(err){
        console.error("Database connection failed", err)
        process.exit(1)
    }
}

export default pool