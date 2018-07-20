import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Profiles} from '../profiles';


Meteor.publish('profiles', function profilesPublication() {
    console.log("inside the publication now");
    return Profiles.find({
            userId: this.userId ,
        });
  });
//goal is to use cultofcoders:grapher to get linked documents and expose them
  Meteor.publish('buddies', function eventBuddiesPublication(){
      const buddyLink = Profiles.getLink(profileId, 'events');
      return buddyLink.find().fetch();
  })
