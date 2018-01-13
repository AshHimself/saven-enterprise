Meteor.methods({
    'activeUsers': function() {

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

        return activerUsersDay;
}
    });