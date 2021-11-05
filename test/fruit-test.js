const assert = require('assert');
const Fruit = require("../fruit");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruit_basket';

// const pool = new Pool({
//     connectionString,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const pool = new Pool({
    connectionString
});

describe('Fruit-Basket Exercise', async function () {

    it('it should get all fruit baskets inserted from database', async function () {

        const tests = Fruit(pool);

        await tests.clearTable();
        await tests.store("Banana", 3);

        assert.deepEqual(await tests.allFruits(),
            [{
                "fruit_type": "Banana"
            }]);
    });

    it('it should update the number of fruits in a baskets', async function () {

        const tests = Fruit(pool);

        await tests.clearTable();
        await tests.store("Apple", 3);
        await tests.store("Apple", 3);
        await tests.store("Apple", 3);
        await tests.store("Apple", 3);
        

        assert.equal(await tests.typeQty('Apple'), 4);
    });

    it('it should get the total price for a given fruit basket', async function () {

        const tests = Fruit(pool);

        await tests.clearTable();
        await tests.store("Apple", 3);
        await tests.store("Apple", 3);
        await tests.store("Apple", 3);
        await tests.store("Apple", 3);
        

        assert.equal(await tests.typeTotal('Apple'), 'R12');
    });


    it('must show the QTY for a given fruit type', async function () {

        const tests = Fruit(pool);
        assert.equal(await tests.typeQty('Apple'), 4);

        await tests.clearTable();
    });

});