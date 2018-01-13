Template.activity.onCreated(function() {

console.log('calling bar chart 1')
        Meteor.call('barchart', null, function(error, result){
          console.log('calling bar chart 2')

        if(error){
      console.error(error.reason);
      return;
      }

        Session.set('barchart', result);
        Session.set('barchartDataReady', true);


        var broadcasts = [];

        var getBroadcastData = Session.get('barchart')
        console.log(getBroadcastData)

      });

});





Template.activity.onRendered(function() {





  var getBarChartData = Session.get('barchart')
console.log(getBarChartData)
  new Chartist.Bar('.dailyActivity', {getBarChartData}, {
    fullWidth: true,
    showArea: true,
    chartPadding: {
      right: 40
    }
  });

  new Chartist.Line('.weeklyActivity', {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'],
    series: [
      [12, 9, 7, 8, 20,30,15],
    ]
  }, {
    fullWidth: true,
    showArea: true,
    chartPadding: {
      right: 40
    }
  });

  new Chartist.Line('.monthlyActivity', {
  labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  series: [
    [10, 15, 30, 70, 20,10,30,50,200,100,50,76],

  ]
}, {
  fullWidth: true,
  showArea: true,
  chartPadding: {
    right: 40
  }
});

});
