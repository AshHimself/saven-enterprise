MyAppExporter = {
	exportBroadcasts: function() {
		var self = this;
		    $('.download').prop("disabled", true);
 $('.download').html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw left" stlye="font-size:24px"></i> Export');

		Meteor.call("exportBroadcasts", function(error, data) {
			$('.download').prop("disabled",false);
				$('.download').html('<i class="material-icons left">cloud_download</i>Export');
			if ( error ) {
				return false;
			}
			
			var csv = Papa.unparse(data);
			self._downloadCSV(csv);
		});
	}, 
	_downloadCSV: function(csv) {
		var blob = new Blob([csv]);
		var a = window.document.createElement("a");
	    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
	    a.download = "broadcasts.csv";
	    document.body.appendChild(a);
	    a.click();
	    document.body.removeChild(a);
	}
}