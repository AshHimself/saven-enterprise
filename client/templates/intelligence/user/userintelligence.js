Template.userintelligence.onRendered(function() {

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


    
var data = {
  labels: ['Guardian','User'],
  series: [20, 15]
};

var options = {
  labelInterpolationFnc: function(value) {
    return value[0]
  }
};


new Chartist.Pie('.userType', data);

});

Template.userintelligence.onCreated(function() {





    Session.set('barchartDataReady', false);

    Meteor.call('userIntelData', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }


        Session.set('userIntelData', result);

    });

    Meteor.call('userBarchart', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }
        
        var chart = new Chartist.Bar('.userMonthly', result, {
            distributeSeries: true
        });

        Session.set('barchart', result);
        Session.set('barchartDataReady', true);

        var broadcasts = [];

    });

});

Template.userintelligence.helpers({
    userIntelData: function() {
        var v = Session.get('userIntelData');
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
