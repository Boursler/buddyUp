Meteor.publish('apiCall', function(queryUrl) {

    console.log("I am here with queryURL " + queryUrl);

    
    var self = this;

    try {

        if (typeof(queryUrl)!= "undefined") {
            var response = HTTP.get('http://api.eventful.com/json/events/search?...&ex_category=attractions,comedy,co' +
            'mmunity,family_fun_kids,movies_film,performing_arts,schools_alumni,support,techn' +
            'ology&include=categories&app_key=ZXSCNrSnm9RvFVNk' + queryUrl );

           
        }
        else {
            var response = HTTP.get('http://api.eventful.com/json/events/search?...&ex_category=attractions,comedy,co' +
            'mmunity,family_fun_kids,movies_film,performing_arts,schools_alumni,support,techn' +
            'ology&include=categories&app_key=ZXSCNrSnm9RvFVNk&date=Next Week');
        
        }
            
        console.log(response.data)

        _.each(response.data.events.event, function(item) {
            var data = item;
            var len = 1000;

         

            var event = {
                eventfulID: data.id,
                postalCode: data.postalCode,
                date:data.postalCode,
                address: data.address,
                url: data.url,
                categories: data.categories.category[0].id,
                title: data.title,
             
                
            }

            console.log('loging event'+ event);

            
            self.added('eventfull', event.id, event);
        });

        self.ready();
    } catch (error) {
        console.log(error);
    }
});

Meteor.methods({ 
    isUrl: function(url) {
        if (url.indexOf('http') > -1) { return true; }
        return false;
    }
});