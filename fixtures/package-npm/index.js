const express = require('express');



const app = express();

app.get('*', (req, res) => {res.send('works')});

app.listen('8081', () => {
    console.log('Server started on 8081');
});
