({
	// Use RecordView (edit element) or CreateView (new element) 
	extendsFrom: 'CreateView',
	initialize: function(options) {
		var self = this;

		this._super('initialize', [options]);

		// Set an event to trigger the function to auto-populate the data, for example, this is triggered when the value of some field channges
		// check the events available here -> https://support.sugarcrm.com/Documentation/Sugar_Developer/Sugar_Developer_Guide_8.3/User_Interface/Events/
		self.model.on('change:some_field',_.bind(self._populateData, self));
		
	},

	_populateData: function(){
		var self = this;
		// Read the value of the field and save it into a variable, you can use the self.model.get directly too
		var record = self.model.get('some_field');

		// If the value of the field is not empty i run the rest of the code to get the data to populate the related field
		if(self.model.get('some_field')){

			// Build the url to Call to the API to get the data of the shipping account, use the module / filters that you want
			// app.api.buildURL('Module/:record', {}, {});
	        var url = app.api.buildURL('Module/'+record, 'read',{},{});

	        //Make the call to get the data
	        app.api.call('read', url, {}, {

	            success: function(data){
	            	//validate that you have data and response was not empy
	                if(data){

	                    //Use the instruction self.model.set('some_field', data) to populate the field
	                    self.model.set('field1', data.data1);
	                    self.model.set('field2', data.data2);
	                    self.model.set('field3', data.data3);
	                }
	            },
	        });
	    }
	},
})
