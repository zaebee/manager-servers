this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/server-add-modal.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-dialog">\n  <div class="modal-content">\n    <div class="modal-header">\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n      <h4 class="modal-title">Add Server</h4>\n    </div>\n    <div class="modal-body">\n      <form class="form-inline" role="form">\n        <div class="form-group {{^server.address}}has-error{{/server.address}}">\n          <label class="sr-only" for="server-address">Address</label>\n          <input value="{{server.address}}" class="form-control" id="server-address" placeholder="enter server address">\n        </div>\n        <div class="form-group {{^server.port}}has-error{{/server.port}}">\n          <label class="sr-only" for="server-port">Port</label>\n          <input onkeypress=\'return event.charCode >= 48 && event.charCode <= 57\' value="{{server.port}}" class="form-control" id="server-port" placeholder="enter server port">\n        </div>\n        <div class="checkbox">\n          <label>\n            <input checked="{{server.useSSL}}" type="checkbox"> Use SSL\n          </label>\n        </div>\n      </form>\n    </div>\n    <div class="modal-footer">\n      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n      <button on-click="save" type="button" class="btn btn-primary">Save server</button>\n    </div>\n  </div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->\n';

}
return __p
};

this["JST"]["assets/templates/server-list.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<table class="table table-stripped invbody-items" cellspacing="0">\n  <thead>\n    <tr>\n      <th>Address</th>\n      <th>Port</th>\n      <th>Use SSL</th>\n    </tr>\n  </thead>\n  <tbody>\n    {{#servers}}\n    <tr>\n      <td style="width: 160px;">\n        <a on-tap="destroy:{{this}}" role="button" class=\'hidden-print destroy\'></a>\n        <div on-click="edit" class="item">{{address}}</div>\n        <input intro="select" class="form-control hide" value="{{address}}" on-blur-enter="hide:{{this}}">\n      </td>\n      <td style="width: 85px;">\n        <div on-click="edit" class="port">{{port}}</div>\n        <input onkeypress=\'return event.charCode >= 48 && event.charCode <= 57\' class="form-control hide" value="{{port}}" on-blur-enter="hide:{{this}}">\n      </td>\n      <td style="width: 85px;">\n         <div class="checkbox">\n          <label>\n            {{#useSSL}}\n              <span class="label label-success">yes</span>\n            {{/useSSL}}\n            {{^useSSL}}\n              <span class="label label-danger">no</span>\n            {{/useSSL}}\n            <input type=\'checkbox\' checked=\'{{useSSL}}\' on-change="save:{{this}}">\n          </label>\n        </div>\n      </td>\n    </tr>\n    {{/servers}}\n\n    <tr>\n      <td class="hidden-print text-center" colspan="5">\n        <button on-click="add" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-plus"></i> Добавить</button>\n      </td>\n    </tr>\n\n  </tbody>\n</table>\n';

}
return __p
};