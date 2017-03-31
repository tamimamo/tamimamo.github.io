var Bourne, Similars, _, async;

_ = require('underscore');

async = require('async');

Bourne = require('bourne');

//compute the similarity index
module.exports = Similars = (function() {
  function Similars(engine) {
    this.engine = engine;
    this.db = new Bourne('./db-similars.json');
  }

  Similars.prototype.byUser = function(username, done) {
    return this.db.findOne({
      username: username
    }, (function(_this) {
      return function(err, arg) {
        var others;
        others = arg.others;
        if (err != null) {
          return done(err);
        }
        return done(null, others);
      };
    })(this));
  };

  Similars.prototype.update = function(username, done) {
    return async.auto({
      userLikes: (function(_this) {
        return function(done) {
          return _this.engine.likes.itemsByUser(username, done);
        };
      })(this),
      userDislikes: (function(_this) {
        return function(done) {
          return _this.engine.dislikes.itemsByUser(username, done);
        };
      })(this)
    }, (function(_this) {
      return function(err, arg) {
        var products, userDislikes, userLikes;
        userLikes = arg.userLikes, userDislikes = arg.userDislikes;
        if (err != null) {
          return done(err);
        }
       items = _.flatten([userLikes, userDislikes]);
        return async.map(items, function(product, done) {
          return async.map([_this.engine.likes, _this.engine.dislikes], function(rater, done) {
            return rater.usersByItem(product, done);
          }, done);
        }, function(err, others) {
          if (err != null) {
            return done(err);
          }
          others = _.without(_.unique(_.flatten(others)), username);
          return _this.db["delete"]({
            username: username
          }, function(err) {
            if (err != null) {
              return done(err);
            }
            return async.map(others, function(other, done) {
              return async.auto({
                otherLikes: function(done) {
                  return _this.engine.likes.itemsByUser(other, done);
                },
                otherDislikes: function(done) {
                  return _this.engine.dislikes.itemsByUser(other, done);
                }
              }, function(err, arg1) {
                var otherDislikes, otherLikes;
                otherLikes = arg1.otherLikes, otherDislikes = arg1.otherDislikes;
                if (err != null) {
                  return done(err);
                }
                return done(null, {
                  username: other,
                  similarity: (_.intersection(userLikes, otherLikes).length + _.intersection(userDislikes, otherDislikes).length - _.intersection(userLikes, otherDislikes).length - _.intersection(userDislikes, otherLikes).length) / _.union(userLikes, otherLikes, userDislikes, otherDislikes).length
                });
              });
            }, function(err, others) {
              if (err != null) {
                return next(err);
              }
              return _this.db.insert({
                username: username,
                others: others
              }, done);
            });
          });
        });
      };
    })(this));
  };

  return Similars;

})();

// ---
// generated by coffee-script 1.9.2