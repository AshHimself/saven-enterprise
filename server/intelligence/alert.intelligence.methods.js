Meteor.methods({
    'alertBarchart': function() {

        var organisation = Userfields.findOne({
            user_id: this.userId
        }, {
            fields: {
                'organisation': 1
            }
        });

        var start = new Date('2017-01-01T01:30:00Z');
        var barchart = Locations.aggregate(
            [{
                    $match: {
                      eventType:'initialDuressRequest',
                        dateTime: {
                            $gte: start
                        },
                        organisation: organisation.organisation
                    }
                },
                {
                    $group: {
                        _id: {
                            year: {
                                $year: "$dateTime"
                            },
                            month: {
                                $month: "$dateTime"
                            }
                        },
                        count: {
                            $sum: 1
                        }
                    }
                }, {
                    "$sort": {
                        "_id.month": 1
                    }
                },
            ])

        var year = [];

        barchart.forEach(function(item) {
            var monthName = moment(
                item._id.month, // Desired month
                'MM' // Tells MomentJs the number is a reference to month
            ).format('MMM')
            //  locations.push({"lat":item.loc.coordinates[1], "lng":item.loc.coordinates[0]});
            year.push({
                'month': monthName,
                'val': item.count
            });


        })

        var total = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        //SOURCE: https://stackoverflow.com/questions/31896467/javascript-missing-logic-when-array-iterate-for-missing-value
        // Current months array
        var currentMonth = [];
        barchart.forEach(function(item) {
            var month = moment(
                item._id.month, // Desired month
                'MM' // Tells MomentJs the number is a reference to month
            ).format('MMM')
            currentMonth.push(month);
        });

        // iterating over months
        for (var i = 0; i < total.length; i++) {

            // checking if month is absent
            if (currentMonth.indexOf(total[i]) === -1) { //logic here to see absent month.

                year.push({
                    "month": total[i],
                    "val": 0,
                    "order": i
                })
            } else {
                year[currentMonth.indexOf(total[i])].order = i; // adding order
            }
        }

        year.sort(function(a, b) {
            return a.order - b.order;
        });

        var labels = [];
        var series = [];
        //build array for chartist.. i am sure there is a better way to do this but #YOLO
        year.forEach(function(item) {
            labels.push(item.month);
            series.push(item.val);
        })

        var barchartArray = {
            'labels': labels,
            'series': series
        }
        return barchartArray;

    },
    'alertIntelData': function() {

        var date = new Date();
        var organisation = Userfields.findOne({
            user_id: this.userId
        }, {
            fields: {
                'organisation': 1
            }
        });
        var org = organisation.organisation;

        //Today
        var today = Locations.find({
            eventType:'initialDuressRequest',
            organisation: org,
            "dateTime": {
                $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        }).count();



        //Month
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var month = Locations.find({
          eventType:'initialDuressRequest',
          organisation: org,
          "dateTime": {
                $gt: firstDay,
                $lt: lastDay
            }
        }).count();

        //Year
        var firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
        var lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)
        var year = Locations.find({
          eventType:'initialDuressRequest',
          organisation: org,
          "dateTime": {
                $gt: firstDayOfYear,
                $lt: lastDayOfYear
            }
        }).count();

return {today:today, month:month, year:year}


    }


});

Meteor.methods({
    getAlertsMethod: function(data) {


        var organisation = Userfields.findOne({
            user_id: this.userId
        }, {
            fields: {
                'organisation': 1
            }
        });
        var org = organisation.organisation;
        var firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
        var lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)

        return Locations.find({
          eventType:'initialDuressRequest',
          organisation: org,
          "dateTime": {
                $gt: firstDayOfYear,
                $lt: lastDayOfYear
            }
        }).fetch();


    }
});
