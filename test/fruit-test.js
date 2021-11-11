const assert = require('assert');
const Fruit = require("../fruit");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruit_basket';

const pool = new Pool({
    connectionString
});

describe('Fruit-Basket Exercise', async function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query('delete from  Fruits');
    });

    it('it should get the total price for a given fruit basket', async function () {
        const tests = Fruit(pool);
        //await tests.clearTable();
        await tests.store("Banana", 1, 3);
        await tests.store("Banana", 1, 3);
        await tests.store("Banana", 2, 3);
        await tests.store("Banana", 1, 3);
        assert.equal(await tests.typeTotal('Banana'), 'R15');
    });

    it('it should get all fruit baskets inserted from database', async function () {
        const tests = Fruit(pool);
        await tests.store("Banana", 1, 3);
        await tests.store("Banana", 1, 3);
        await tests.store("Banana", 2, 3);
        await tests.store("Banana", 1, 3);
        assert.deepEqual(await tests.allFruits('Banana'),
            [{
                "fruit_type": "Banana"
            }]);
    });

    it('it should update the number of fruits in a baskets', async function () {
        const tests = Fruit(pool);
        await tests.store("Banana", 1, 3);
        await tests.store("Banana", 1, 3);
        await tests.store("Banana", 2, 3);
        await tests.store("Banana", 1, 3);
        assert.equal(await tests.typeQty('Banana'), 5);
    });

    it('must show the QTY for a given fruit type', async function () {
        const tests = Fruit(pool);
        await tests.store("Banana", 1, 3);
        await tests.store("Banana", 1, 3);
        await tests.store("Banana", 2, 3);
        await tests.store("Banana", 1, 3);
        assert.equal(await tests.typeQty('Banana'), 5);
    });

});