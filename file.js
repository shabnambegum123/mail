const emailExistence = require('email-existence');

emailExistence.check('shabnamdoodleblue@gmail.com', (err, exists) => {
    if (err) {
        console.error('Error checking email existence:', err);
    } else {
        console.log('Email exists:', exists);
    }
});

