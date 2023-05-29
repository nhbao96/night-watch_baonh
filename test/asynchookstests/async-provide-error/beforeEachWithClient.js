module.exports = {
  demoTest: function (client) {
    client.url('http://localhost')
      .assert.elementPresent('#weblogin')
      .end();
  },

  beforeEach: function(client, done) {
    client.perform(function() {
      done(new Error('Provided error beforeEachWithClient'));
    });
  }
};
