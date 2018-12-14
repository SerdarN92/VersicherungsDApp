module.exports = function(app) {
    var controller = require('./controller');

    app.route('/calculatePayment')
        .post(controller.calculatePayment);

}
