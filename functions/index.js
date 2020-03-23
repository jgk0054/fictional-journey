const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const database = admin.database();

exports.test_func = functions.database.ref('/test/{id}/').onUpdate((snapshot) => {
    console.info(`Test`);
    let ref = database.ref(`/test_1/`);
    ref.transaction((data) => {
        console.info(`Test 2`);
        let returnVal = Math.random();
        console.info(returnVal);
        return returnVal;
    }, (error, commited, snapshot) => {
        if (error) {
            console.error(`ref failed: ${error}`);
        } else if (!commited) {
            console.error(`Aborted ref transaction`);
        } else {
            console.info(`Success!`);
        }
    }, false);
    return true;
});