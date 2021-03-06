
const AVRGIRL = require('avrgirl-arduino');

process.on('message', function (m) {
    process.send({
        type: 'info',
        info: 'Child got message: ' + JSON.stringify(m)
    });

    let avrgirl = new AVRGIRL({
        board: m.board,//'pro-mini',
        debug: true,
        port: m.port//'/dev/cu.SLAB_USBtoUART'
    });
    hex = new Buffer(m.hex);
    process.send({
        type: 'info',
        info: 'start flash'
    });
    avrgirl.flash(hex, function (error) {
        process.send({
            type: 'info',
            info: 'end flash'
        });

        if (error) {
            process.send({
                type: 'error',
                status: -1,
                error: error.toString()
            });
        } else {
            process.send({
                type: 'compilationDone',
                status: 0
            });
        }
    });
});

process.on('uncaughtException', function (error) {
    process.send({
        type: 'error',
        error: 'uncaughtException ' + error
    });
});