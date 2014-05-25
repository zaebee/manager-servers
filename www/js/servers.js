var app = app || {};

(function (app) {
  app.server = new Ractive({
    el: '.modal',
    template: JST['assets/templates/server-add-modal.html'](),
    data: {
      server: new app.Server
    },
    adapt: [ 'Backbone' ],
    transitions: {
      select: function ( t ) {
        setTimeout( function () {
          t.node.select();
          t.complete();
        }, 200 );
      }
    }
  });

  app.servers = new Ractive({
    el: '.server-list',
    template: JST['assets/templates/server-list.html'](),
    data: {
      servers: new app.Servers, // наша Backbone коллекция

    },
    adapt: [ 'Backbone' ],
    transitions: {
      select: function ( t ) {
        setTimeout( function () {
          t.node.select();
          t.complete();
        }, 200 );
      }
    }
  });

  app.server.on({
    save: function ( event ) {
      var servers = app.servers.data.servers;
      var server = this.data.server;
      if (server.get('address') && server.get('port')) {
        servers.add(server);
        server.save();
        this.set('server', new app.Server);
        $(this.el).modal('hide');
      }
    },
  });

  app.servers.on({

    // Обрабатываем нажатие на кнопку создания таска
    // в шаблоне `on-click="add"`
    add: function ( event ) {
      $('#addServerModal').modal('show');
      return;
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
