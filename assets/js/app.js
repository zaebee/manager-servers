var app = app || {};

(function (app) {

  app.Server = Backbone.Model.extend({
    defaults: {
      useSSL: false
    },
    urlRoot: '/api/server',
    idAttribute: 'uid'
  });
  
  app.Servers = Backbone.Collection.extend({
    url: '/api/server',
    model: app.Server
  });
})(app);
