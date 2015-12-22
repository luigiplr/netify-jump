import Promise from 'bluebird';
import _ from 'lodash';
import express from 'express';
import mdns from 'mdns';


module.exports = {
    generate(type, port, id) {
        return new Promise((resolve, reject) => {
            switch (type) {
                case 'api':
                    var server = express();


                    resolve(server.listen(port));
                    break;
                case 'jump':
                    var server = express();


                    resolve(server.listen(port));
                    break;
                case 'zero-conf':
                    resolve(mdns.createAdvertisement(mdns.tcp('http'), 4321));
                    break;
            }



        });
    }
}