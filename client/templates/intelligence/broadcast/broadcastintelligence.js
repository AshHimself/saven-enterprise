
Template.broadcastintelligence.rendered = function() {

        var barParent = $('#sparkline-bar').closest('.card');
        var barPoints = [0, 1, 3, 2, 1, 1, 4, 1, 2, 0, 3, 1, 3, 4, 1, 0, 2, 3, 6, 3, 4, 2, 7, 5, 2, 4, 1, 2, 6, 13, 4, 2];
        var barWidth = 6;
        $('#sparkline-bar').sparkline(barPoints, {
            type: 'bar',
            height: $('#sparkline-bar').height() + 'px',
            width: '100%',
            barWidth: barWidth,
            barSpacing: (barParent.width() - (barPoints.length * barWidth)) / barPoints.length,
            barColor: 'rgba(0,0,0,.07)',
            tooltipFormat: ' <span style="color: #ccc">&#9679;</span> {{value}}</span>'
        });

   // CounterUp Plugin
    // $('.counter').each(function () {
    //     $(this).prop('Counter',0).animate({
    //         Counter: $(this).text()
    //     }, {
    //         duration: 1000,
    //         easing: 'swing',
    //         step: function (now) {
    //             $(this).text(Math.ceil(now));
    //             $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    //         }
    //     });
    // });

};



Template.broadcastintelligence.onCreated(function() {
    Session.set('barchartDataReady', false);

    Meteor.call('broadcastIntelData', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }


        Session.set('broadcastIntelData', result);


    });

    Meteor.call('barchart', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }

        var chart = new Chartist.Bar('.broadcastMonthly', result, {
            distributeSeries: true
        });

        Session.set('barchart', result);
        Session.set('barchartDataReady', true);

        var broadcasts = [];

    });

    Meteor.call('chartBroadcastTypes', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }

        var chart = new Chartist.Bar('.chartBroadcastTypes', result, {
            distributeSeries: true
        });

        Session.set('chartBroadcastTypes', result);
        Session.set('barchartDataReady', true);

        var broadcasts = [];

    });


    Meteor.call('weeklyBroadcasts', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }

 new Chartist.Line('.weeklyBroadcasts', {
  labels: result.labels,
  series: [
    result.series
  ]
}, {
  low: 0,
  showArea: true
});


        Session.set('weeklyBroadcasts', result);
        Session.set('barchartDataReady', true);

        var broadcasts = [];

    });

});

Template.broadcastintelligence.helpers({
    broadcastCounts: function() {
        var v = Session.get('broadcastIntelData');
        if (v) {
            return v;
        } else {
            return 0;
        }
    },
    barchartDataReady: function() {

        return Session.get('barchartDataReady')

    },
    currentMonth: function() {

        return moment().format('MMMM');

    },
    currentYear: function() {

        return moment().format('YYYY');

    },


});