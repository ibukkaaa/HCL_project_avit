import db from "../config/database.js"

export const createOrder = async (req,res)=>{
    const client = await db.connect()

    try{

        const {userId, items, total} = req.body

        await client.query("BEGIN")

        const orderQuery = `
            INSERT INTO orders (user_id,total,status)
            VALUES ($1,$2,'pending')
            RETURNING id
        `

        const orderResult = await client.query(orderQuery,[userId,total])

        const orderId = orderResult.rows[0].id

        for(const item of items){

            const itemQuery = `
                INSERT INTO order_items
                (order_id,product_id,quantity,price)
                VALUES ($1,$2,$3,$4)
            `

            await client.query(itemQuery,[
                orderId,
                item.productId,
                item.quantity,
                item.price
            ])

        }

        await client.query("COMMIT")

        res.json({
            success:true,
            orderId
        })

    }catch(err){

        await client.query("ROLLBACK")

        console.error(err)

        res.status(500).json({
            success:false,
            message:"Order creation failed"
        })

    }finally{
        client.release()
    }
}