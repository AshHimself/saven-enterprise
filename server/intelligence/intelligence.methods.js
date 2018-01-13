Meteor.methods({
    'barchart': function() {

        var start = new Date('2017-01-01T01:30:00Z');
var organisation = Meteor.user().profile.organisation;

        if (organisation == 'administrator') {
            var filter = {
                createDateTime: {
                    $gte: start
                }
            }
        } else {
            var filter = {
                createDateTime: {
                    $gte: start
                },
                organisation: organisation
            }
        }


        var barchart = Broadcasts.aggregate(
            [{
                    $match: filter
                },
                {
                    $group: {
                        _id: {
                            year: {
                                $year: "$createDateTime"
                            },
                            month: {
                                $month: "$createDateTime"
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

        console.log(barchartArray)

    },
    'broadcastIntelData': function() {

        var date = new Date();
var organisation = Meteor.user().profile.organisation;

        //Today
        if (organisation == 'administrator') {
            var todayQuery = {
                "createDateTime": {
                    $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            }
        } else {
            var todayQuery = {
                organisation: organisation,
                "createDateTime": {
                    $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            }
        }
        var today = Broadcasts.find(todayQuery).count();



        //Month
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        if (organisation.organisation == 'administrator') {
            var monthQuery = {
                "createDateTime": {
                    $gt: firstDay,
                    $lt: lastDay
                }
            }
        } else {
            var monthQuery = {
                organisation: organisation.organisation,
                "createDateTime": {
                    $gt: firstDay,
                    $lt: lastDay
                }
            }
        }
        var month = Broadcasts.find(monthQuery).count();

        //Year
        var firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
        var lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)

        if (organisation.organisation == 'administrator') {
            var yearQuery = {
                "createDateTime": {
                    $gt: firstDayOfYear,
                    $lt: lastDayOfYear
                }
            }
        } else {
            var yearQuery = {
                organisation: organisation.organisation,
                "createDateTime": {
                    $gt: firstDayOfYear,
                    $lt: lastDayOfYear
                }
            }
        }

        var year = Broadcasts.find(yearQuery).count();

        return {
            today: today,
            month: month,
            year: year
        }


    },
    'chartBroadcastTypes': function() {

        var organisation = Meteor.user().profile.organisation;

        if (organisation == 'administrator') {
            var filter = {
                'reportType': { '$ne': 'Burglary (Sample)' }
            }
        } else {
            var filter = {
                organisation: organisation,
                'reportType': { '$ne': 'Burglary (Sample)' }
            }
        }

        var barchart = Broadcasts.aggregate(
            [{
                    $match: filter
                },
                {
                    $group: {
                        _id: "$reportType",
                        count: {
                            $sum: 1
                        }
                    }
                }, {
                    "$sort": {
                        "_id.type": 1
                    }
                },
            ])
        var reportTypeArray = [];

        barchart.forEach(function(item) {
            reportTypeArray.push({
                'type': item._id,
                'val': item.count
            });

        })

        var labels = [];
        var series = [];
        //build array for chartist.. i am sure there is a better way to do this but #YOLO
        reportTypeArray.forEach(function(item) {
            labels.push(item.type);
            series.push(item.val);
        })

        var barchartArray = {
            'labels': labels,
            'series': series
        }

        return barchartArray;

    },
    'weeklyBroadcasts': function() {

        var organisation = Meteor.user().profile.organisation;

        var curr = new Date;
        var firstday = moment().startOf('week').toDate();
        var lastday = moment().endOf('week').toDate();


        if (organisation.organisation == 'administrator') {
            var filter = {
                createDateTime: {
                    $gt: firstday,
                    $lt: lastday
                }
            }
        } else {
            var filter = {
                createDateTime: {
                    $gt: firstday,
                    $lt: lastday
                },
                organisation: organisation
            }
        }


        var barchart = Broadcasts.aggregate([
{
                    $match: {createDateTime: {
                    $gt: firstday,
                    $lt: lastday
                }}
                },
  { 
      $group: {
      _id: {
        $add: [
         { $dayOfYear: "$createDateTime"}, 
         { $multiply: 
           [400, {$year: "$createDateTime"}]
         }
      ]},   
      total: { $sum: 1 },
      first: {$min: "$createDateTime"}
    }
  },
  { $sort: {_id: -1} },
  { $limit: 15 },
  { $project: { date: "$first", total: 1, _id: 0} }
])


        var weekArray = [];

        barchart.forEach(function(item) {
            var dayName = moment(
                item.date, // Desired day
                'dddd' // Tells MomentJs the number is a reference to month
            ).format('dddd')
            //  locations.push({"lat":item.loc.coordinates[1], "lng":item.loc.coordinates[0]});
            weekArray.push({
                'day': dayName,
                'val': item.total
            });
        })





        var total = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        //SOURCE: https://stackoverflow.com/questions/31896467/javascript-missing-logic-when-array-iterate-for-missing-value
        // Current months array
        var currentWeek = [];
        barchart.forEach(function(item) {
            var day = moment(
                item.date, // Desired month
                'dddd' // Tells MomentJs the number is a reference to month
            ).format('dddd')
            currentWeek.push(day);
        });

        // iterating over months
        for (var i = 0; i < total.length; i++) {

            // checking if month is absent
            if (currentWeek.indexOf(total[i]) === -1) { //logic here to see absent month.

                weekArray.push({
                    "day": total[i],
                    "val": 0,
                    "order": i
                })
            } else {
                weekArray[currentWeek.indexOf(total[i])].order = i; // adding order
            }
        }

        weekArray.sort(function(a, b) {
            return a.order - b.order;
        });


        var labels = [];
        var series = [];
        //build array for chartist.. i am sure there is a better way to do this but #YOLO
        weekArray.forEach(function(item) {
            labels.push(item.day);
            series.push(item.val);
        })

        var barchartArray = {
            'labels': labels,
            'series': series
        }

console.log(barchartArray)


        return barchartArray;

        

    },

});