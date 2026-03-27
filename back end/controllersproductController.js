import db from "../config/database.js"

export const getProducts = async (req,res)=>{
    try{

        const {page=1, limit=20, search=""} = req.query

        const offset = (page-1)*limit

        const query = `
            SELECT 
                p.id,
                p.name,
                p.price,
                p.stock,
                c.name as category
            FROM products p
            LEFT JOIN categories c
            ON p.category_id = c.id
            WHERE p.name ILIKE $1
            ORDER BY p.created_at DESC
            LIMIT $2 OFFSET $3
        `

        const values = [`%${search}%`, limit, offset]

        const result = await db.query(query,values)

        res.json({
            success:true,
            count: result.rows.length,
            data: result.rows
        })

    }catch(err){
        console.error(err)
        res.status(500).json({error:"Internal server error"})
    }
}