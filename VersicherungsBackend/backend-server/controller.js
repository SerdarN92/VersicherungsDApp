const request = require('request');

exports.calculatePayment = function (req, res) {
    console.log(req);

    var holidayStart = req.body.holidayStart;
    var holidayEnd = req.body.holidayEnd;
    var holidayDestination = req.body.holidayDestination;
    var rainfallTrigger = req.body.rainfallTrigger;
    var desiredInsurancePayout = req.body.desiredInsurancePayout;

    console.log('Requested offer for WeatherInsurance from ' + holidayStart + ' till ' + holidayEnd + ' at ' + holidayDestination);
    console.log('Customer requests to assure himself against at least ' + rainfallTrigger + ' liter/m² per hour each day for the payout of ' + desiredInsurancePayout + '€');
    
    var offer = ((Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4))*desiredInsurancePayout;
    console.log('The offer for a WeatherInsurance with this configuration is ' + offer + '€');

    request('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH&convert=EUR', { headers: {
        'X-CMC_PRO_API_KEY': 'ad15b824-73e1-4104-8e62-9fca036906e9'
    }}, (err, response, body) => {
        if(err) {
            console.log(err);
        }
        res.json({
            offerInEUR: offer,
            offerInETH: (offer / (JSON.parse(body).data.ETH.quote.EUR.price))
        });
    });


    
}

