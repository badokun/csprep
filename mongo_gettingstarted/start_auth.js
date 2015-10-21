var stormpath = require('stormpath');
var client = null;
var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
var keyfile = '.stormpath/apiKey.properties';

stormpath.loadApiKey(keyfile, function apiKeyFileLoaded(err, apiKey) {
    if (err) throw err;
    client = new stormpath.Client({
        apiKey: apiKey
    });

    client.getApplications({
        name: 'Stormpath'
    }, function (err, applications) {
        if (err) throw err;

        app = applications.items[0];
        console.log(app);
 

        //using username and password
        app.authenticateAccount({
            username: 'tk421',
            password: 'Changeme1',
        }, function (err, result) {
            if (err) throw err;
            account = result.account;
            console.log(account);
        });


    });
});