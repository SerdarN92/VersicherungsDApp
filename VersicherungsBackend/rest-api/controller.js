exports.rainfall = function (req, res) {
    var place = req.query.place;
    var holidayStart = req.query.startDate;
    var holidayEnd = req.query.endDate;
    var rainfall = Math.floor(Math.random() * 19);;

    console.log('Requested the rainfall for the place ' + place + ' from ' + holidayStart + ' till ' + holidayEnd);
    console.log('Rainfall is: ' + rainfall);

    res.json({
        rainfall: rainfall.toString()
    });
}
