

WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

Router.map(function () {
  this.route('organisation.api', {
    path: '/organisations/:organisation',
    where: 'server',
    action: function () {
      var params = this.params;
      var organisation = params.organisation.toLowerCase();
      console.log(organisation)
      var json = Organisations.find({organisation: organisation}).fetch();
       // what ever data you want to return

      if(json.length == 0){
        var  json = [{id:1,text:'Organanisation not found'}];
}
console.log(json)

      // this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
  }
});
});
