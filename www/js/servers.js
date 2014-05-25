var app = app || {};

(function (app) {
  app.servers = new Ractive({
    el: '.server-list',
    template: JST['assets/templates/server-list.html'](),
    data: {
      servers: new app.Servers, // наша Backbone коллекция

    },
    adaptors: [ 'Backbone' ],
    transitions: {
      select: function ( t ) {
        setTimeout( function () {
          t.node.select();
          t.complete();
        }, 200 );
      }
    }
  });

  app.servers.on({

    // Обрабатываем нажатие на кнопку создания таска
    // в шаблоне `on-click="add"`
    add: function ( event ) {
      var servers = this.get('servers');
      var server = new app.Server({
        address: '0.0.0.0',
        port: '80',
        useSSL: false,
      });
      servers.add(server);
      server.save();
    },

    save: function ( event, server ) {
      setTimeout(function(){
        server.save();
      }, 150);
    },

    // удаляем таск с сервера тоже
    // в шаблоне `on-tap="destroy:{{this}}"`
    destroy: function ( event, server ) {
      server.destroy();
    },

    // показываем инпут для редактирования свойств таска
    // в шаблоне `on-click="edit"`
    edit: function ( event ) {
      $(event.node).hide();
      $(event.node).next().removeClass('hide').focus().select();
    },

    // сохраняем такс после изменения какого-либо поля
    // в шаблоне `on-blur-enter="hide"`
    hide: function ( event, server ) {
      $(event.node).addClass('hide');
      $(event.node).prev().show();
      server.save();
    },
  });

  app.servers.data.servers.fetch();

})(app);
