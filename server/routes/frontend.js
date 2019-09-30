//konstant variabel af services
const forsidetekst_service = require('../services/forsidetekst.js');

//Opbygning af mine routes
module.exports = (app) => {

    //min get route, der henter alt i forsidetekst service
    app.get('/', (req, res) => {

        (async () => {

            let hent_tekst = [];

            // udfør de asynkrone funktioner med en await kommando
            await forsidetekst_service.hent_tekst()
                .then(result => {
                    hent_tekst = result;
                });


            res.render('pages/index', {
                "title": "Velkommen til motionscentret",
                "hent_tekst": hent_tekst,
                "page": "index",
                "email": "",
                "besked": "",
                "session": req.session,

            });

        })();

    });



}