

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
  this.route('api', {
    path: '/suburbs/:postcode',
    where: 'server',
    action: function () {
      var params = this.params;
      var postcode = params.postcode;
      console.log(postcode)
      var json = Suburbs.find({postcode:postcode}).fetch(); // what ever data you want to return

      if(json.length == 0){
        var  json = [{id:1,text:'Post code not found, provide a suburb'}]
        console.log('emopy')
}
console.log(json)

      // this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
  }
});
});
