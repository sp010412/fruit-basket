module.exports = function FruitBasket(storage) {

    var pool = storage;

    async function store(type, price) {
        const db = await pool.query('select * from fruits');

        if (db.rows.length == 0) {
            await pool.query('INSERT INTO fruits (fruit_type, qty, price) values ($1,$2,$3)', [type, 1, price]);
        } else {
            await pool.query('UPDATE fruits SET qty = qty + 1 WHERE fruit_type = $1', [type])
        }
    }

    async function allFruits() {

        const db = await pool.query('select fruit_type from fruits');

        return db.rows
    }

    async function typeQty(type) {
        const db = await pool.query('select qty from fruits WHERE fruit_type = $1', [type]);
        return db.rows[0].qty
    }

    async function typeTotal(type){

        const dbPrice = await pool.query('select price from fruits WHERE fruit_type = $1', [type]);
        const dbQty = await pool.query('select qty from fruits WHERE fruit_type = $1', [type]);

        return 'R' + dbPrice.rows[0].price * dbQty.rows[0].qty;

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