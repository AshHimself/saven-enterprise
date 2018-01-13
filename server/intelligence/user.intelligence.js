Meteor.methods({
    'userBarchart': function() {

        var organisation = Meteor.user().profile.organisation;

        var start = new Date('2017-01-01T01:30:00Z');
        var barchart = Meteor.users.aggregate(
            [{
                    $match: {
                        createdAt: {
                            $gte: start
                        },
                        // 'profile.organisation': organisation
                    }
                },
                {
                    $group: {
                        _id: {
                            year: {
                                $year: "$createdAt"
                            },
                            month: {
                                $month: "$createdAt"
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

        console.log(barchart)

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
    'userIntelData': function() {

        var date = new Date();
        var organisation = Meteor.user().profile.organisation;
        //Today
        var today = Meteor.users.find({
            'profile.organisation': organisation,
            "createdAt": {
                $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        }).count();



        //Month
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var month = Meteor.users.find({
            'profile.organisation': organisation,
            "createdAt": {
                $gt: firstDay,
                $lt: lastDay
            }
        }).count();

        //Year
        var firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
        var lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)
        var year = Meteor.users.find({
            'profile.organisation': organisation,
            "createdAt": {
                $gt: firstDayOfYear,
                $lt: lastDayOfYear
            }
        }).count();

        //Active Today
        var activerUsersDay = Savenlogger.aggregate(
            [{
                    $match: {
                        dateTime: {
                            $gte: new Date(Date.now() - 24 * 60 * 60 * 1000)

                        }
                    }
                },
                { $unwind: "$user_id" },
                {
                    $match: {
                        $or: [{
                                'event': 'resumeEvent'
                            },
                            {
                                'event': 'loginEvent'
                            }
                        ]
                    }
                },
                {
                    $group: {
                        "_id": null,

                        "number": {
                            $sum: 1
                        }
                    }
                }
            ]);

        //Active Month
        var activerUsersMonth = Savenlogger.aggregate(
            [{
                    $match: {
                        dateTime: {
                            $gt: firstDay,
                            $lt: lastDay

                        }
                    }
                },
                { $unwind: "$user_id" },
                {
                    $match: {
                        $or: [{
                                'event': 'resumeEvent'
                            },
                            {
                                'event': 'loginEvent'
                            }
                        ]
                    }
                },
                {
                    $group: {
                        "_id": null,

                        "number": {
                            $sum: 1
                        }
                    }
                }
            ]);

        var activerUsersYear = Savenlogger.aggregate(
            [{
                    $match: {
                        dateTime: {
                            $gt: firstDayOfYear,
                            $lt: lastDayOfYear
                        }
                    }
                },
                { $unwind: "$user_id" },
                {
                    $match: {
                        $or: [{
                                'event': 'resumeEvent'
                            },
                            {
                                'event': 'loginEvent'
                            }
                        ]
                    }
                },
                {
                    $group: {
                        "_id": null,

                        "number": {
                            $sum: 1
                        }
                    }
                }
            ]);



        return {
            today: today,
            month: month,
            year: year,
            activeUsersDay: activerUsersDay[0].number,
            activeUsersMonth: activerUsersMonth[0].number,
            activeUsersYear: activerUsersYear[0].number
        }


    }


});

Meteor.methods({
    getUsersMethod: function(data) {


        var organisation = Meteor.user().profile.organisation;

        var firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
        var lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)

        return Locations.find({
            eventType: 'initialDuressRequest',
            organisation: org,
            " ": {
                $gt: firstDayOfYear,
                $lt: lastDayOfYear
            }
        }).fetch();


    }
});