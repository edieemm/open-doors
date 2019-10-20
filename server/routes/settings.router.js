const express = require('express');
const router = express.Router();
const pool = require('../../modules/pool');

// UPDATES the contact information in the "shelter" table 
router.put('/', (req, res) => {
    //-----------query text for any call
    const queryText = `UPDATE "shelter" 
                        SET "name" = $1, "location" = $2,  
                        "phone" = $3, "website" = $4 
                        WHERE "user_" = $5;`;
    //-------------querying database 
    pool.query(queryText, [req.body.name, req.body.location, req.body.phone, req.body.website, req.user.id])
        .then((result) => { res.sendStatus(201); console.log(result); })
        .catch((err) => {
            console.log('Error grabbing updating contact info in settings', err);
            res.sendStatus(500);
        });
});

// posts hours, types, or tags that the user added in settings
router.post('/', (req, res) => {
    //-----------query text for any call
    let queryText = ''
    req.body.types.post.forEach(obj => {
        queryText = queryText + `INSERT INTO "shelter_guest_count"("shelter_id", "type", "capacity") VALUES(${Number(req.body.id)}, '${obj.type}', ${Number(obj.capacity)});`
        // console.log('id, type, capacity', req.body.id, obj.type, obj.capacity)
    })
    req.body.hours.post.forEach(obj => {
        queryText = queryText + `INSERT INTO "hours" ("shelter_id", "day", "open", "close") VALUES (${Number(req.body.id)}, '${obj.day}', '${obj.open}', '${obj.close}');`
        // console.log('day, open, close', obj.day, obj.open, obj.close)
    })
    req.body.tags.post.forEach(string => {
        queryText = queryText + `INSERT INTO "shelter_tags" ("shelter_id", "tag") VALUES (${Number(req.body.id)}, '${string}');`
        // console.log('tag', obj.tag)
    })
    //-------------querying database 
    pool.query(queryText)
        .then((result) => { res.sendStatus(201); console.log(result); })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});

// deletes hours, types, or tags that the user deleted in settings
router.delete('/', (req, res) => {
    //-----------query text for any call
    let queryText = ''
    req.body.types.delete.forEach(obj => {
        queryText = queryText + `DELETE FROM "shelter_guest_count" WHERE "shelter_id" = ${req.body.id} AND "type" = '${obj.type}';`
        // console.log('id, type, capacity', req.body.id, obj.type, obj.capacity)
    })
    req.body.hours.delete.forEach(obj => {
        queryText = queryText + `DELETE FROM "hours" WHERE "shelter_id" = ${req.body.id} AND "day" = '${obj.day}';`
        // console.log('day, open, close', obj.day, obj.open, obj.close)
    })
    req.body.tags.delete.forEach(string => {
        queryText = queryText + `DELETE FROM "shelter_tags" WHERE "shelter_id" = ${req.body.id} AND "tag" = '${string}';`
        // console.log('tag', obj.tag)
    })
    //-------------querying database 
    pool.query(queryText)
        .then((result) => { res.sendStatus(201); console.log(result); })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});



module.exports = router;