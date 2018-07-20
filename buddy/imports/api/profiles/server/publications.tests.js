import {Meteor} from 'meteor/meteor';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import{assert} from 'chai';
import { Random } from 'meteor/random'
import './publications';
import {addProfile} from '../methods';
import {Profiles} from '../profiles';
describe('profiles', function() {
  let userId = null;
  beforeEach(function(){
    //use profile method to insert a profile to test
      userId = Accounts.createUser({username: Random.id(5)});
      console.log("profpub: userID when set in before hook " +userId)
      const profile = {firstName: "Briana", bio: "a silly lady"};

      addProfile.run.call({userId: userId}, {profile,
         callback: function(err,res) {
         console.log("I WANT TO BE HERE!!");
        }});
  });

  afterEach(function(){
      console.log(" profpub: you've entered profile publication after each");
      Meteor.users.remove(userId);
      Profiles.remove(userId);

  });
  it('should publish a user profile', function(done) {
      console.log("probpub: you are inside the test");
      // console.log("profile " + profile)
      console.log("profpub: userId" + userId);
      const collector = new PublicationCollector({ userId: userId });
     console.log("profpub: log collector" + JSON.stringify(collector));
     collector.collect('profiles', (collections) => {
        console.log("profpub collections " + JSON.stringify(collections));
        assert.isArray(collections.profiles, "returns array of matches");
        done();
    });
  });
});

