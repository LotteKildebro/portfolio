const mysql = require('../config/mysql.js');

module.exports = {
    hent_tekst: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT 
            tekst_forside 
            FROM forsidetekst
            ORDER BY tekst_forside_id
            `,
                [], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        resolve(rows[0]);
                    }
                });
            db.end();
        });
    },



}