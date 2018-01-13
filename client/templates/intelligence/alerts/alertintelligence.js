Template.alertintelligence.onCreated(function() {
    Session.set('alertBarchartDataReady', false);

    Meteor.call('alertIntelData', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }


        Session.set('alertIntelData', result);


    });

    Meteor.call('alertBarchart', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }
        console.log(result)
        var chart = new Chartist.Bar('.alertMonthly', result, {
            distributeSeries: true
        });

        Session.set('alertBarchart', result);
        Session.set('alertBarchartDataReady', true);

        var broadcasts = [];

    });

});

Template.alertintelligence.helpers({
    alertCounts: function() {
        var v = Session.get('alertIntelData');
        if (v) {
            return v;
        } else {
            return 0;
        }
    },
    alertBarchartDataReady: function() {

        return Session.get('alertBarchartDataReady')

    },
    currentMonth: function() {

        return moment().format('MMMM');

    },
    currentYear: function() {

        return moment().format('YYYY');

    },


});
