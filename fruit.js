module.exports = function FruitBasket(storage) {

    var pool = storage;

    async function store(type,perFruit,price) {
        const db = await pool.query('select * from fruits');
        if (db.rows.length == 0) {
            await pool.query('INSERT INTO fruits (fruit_type, qty, price) values ($1,$2,$3)', [type, perFruit, price]);
        } else {
            await pool.query('UPDATE fruits SET qty = qty + $1 WHERE fruit_type = $2', [perFruit, type]);
        }
    }

    async function allFruits(type) {
        const db = await pool.query('select fruit_type from fruits WHERE fruit_type = $1', [type]);
        return db.rows
    }

    async function typeQty(type) {
        const db = await pool.query('select qty from fruits WHERE fruit_type = $1', [type]);
        return db.rows[0].qty
    }

    async function typeTotal(type) {
        const dbQty = await pool.query('select SUM(price*qty) from fruits WHERE fruit_type = $1', [type]);
        return 'R' + dbQty.rows[0].sum
    }

    async function clearTable() {
        await pool.query("DELETE FROM fruits");
    }


    return {
        store,
        allFruits,
        typeQty,
        typeTotal,
        clearTable
    }

}