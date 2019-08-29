const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    david = new User({ name: 'david' });
    elena = new User({ name: 'elena' });
    nathaniel = new User({ name: 'nathaniel' });
    nolhan = new User({ name: 'nolhan' });
    Promise.all([
      nolhan.save(),
      joe.save(),
      elena.save(),
      nathaniel.save(),
      david.save()
    ]).then(() => done());
  });

  it('finds all users with a name of Joe', done => {
    User.find({ name: 'Joe' }).then(users => {
      assert(joe._id.toString() == users[0]._id.toString());
      done();
    });
  });

  it('finds a user with a specific id', done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === 'Joe');
      done();
    });
  });

  it('can skip and limit the result set', done => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === 'david');
        assert(users[1].name === 'elena');
        done();
      });
  });
});
