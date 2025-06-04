import { sql } from "../config/db.js";
export async function getTransactionsByUserId(req, res) {
    try{
        const { user_id } = req.params;
        const transactions = await sql`SELECT * FROM transactions where user_id =${user_id} ORDER BY created_at DESC`
        res.status(200).json(transactions);

    }
    catch(e){
        console.log("Err in creating transaction", e);
        res.status(500).json({error: "Internal error"});
    }

}

export async function createTransaction(req, res){
        try {
            const { user_id, title, amount, category } = req.body;
            if(!user_id || !title || amount === undefined|| !category){
                return res.status(400).json({error: "All fields are required"});
            }
           const transaction = await sql`INSERT INTO transactions(user_id,title,amount,category) VALUES (${user_id},${title},${amount},${category}) returning *`
           console.log(transaction);
           res.status(201).json(transaction[0]);
        }
        catch(e){
            console.log("Err in creating transaction", e);
            res.status(500).json({error: "Internal error"});
        }

}

export async function deleteTransaction(req, res) {
    try{
        const { id } = req.params;
        if(isNaN(parseInt(id))){
            return res.status(400).json({error: "Invalid transaction id"});
        }
        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`
        if(result.length === 0){
            return res.status(404).json({message: "Transaction not found"});
        }
        res.status(200).json({message: "Transaction deleted successfully"});
    }
    catch(e){
        console.log("Err in deleting transaction", e);
        res.status(500).json({error: "Internal error"});
    }
}

export async function getSummaryByUserId(req, res) {
    try{
        const { user_id } = req.params;
        const balanceResult = await sql`SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${user_id}`
        const incomeResult = await sql`SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${user_id} and amount > 0`
        const expensesResult = await sql`SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id = ${user_id} and amount < 0`
        res.status(200).json({balance:balanceResult[0].balance, income : incomeResult[0].income, expense : expensesResult[0].expenses});
    }
    catch(e){
        console.log("Err in getting summary", e);
        res.status(500).json({error: "Internal error"});
    }
}