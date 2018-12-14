module.exports = function(app) {
    var controller = require('./controller');

    app.route('/rainfall')
        .get(controller.rainfall);

}
