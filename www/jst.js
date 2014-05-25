this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/server-list.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<table class="table table-stripped invbody-items" cellspacing="0">\n  <thead>\n    <tr>\n      <th>Address</th>\n      <th>Port</th>\n      <th>Use SSL</th>\n    </tr>\n  </thead>\n  <tbody>\n    {{#servers}}\n    <tr>\n      <td style="width: 160px;">\n        <a on-tap="destroy:{{this}}" role="button" class=\'hidden-print destroy\'></a>\n        <div on-click="edit" class="item">{{address}}</div>\n        <input intro="select" class="form-control hide" value="{{address}}" on-blur-enter="hide:{{this}}">\n      </td>\n      <td style="width: 85px;">\n        <div on-click="edit" class="port">{{port}}</div>\n        <input class="form-control hide" value="{{port}}" on-blur-enter="hide:{{this}}">\n      </td>\n      <td style="width: 85px;">\n         <div class="checkbox">\n          <label>\n            {{#useSSL}}\n              <span class="label label-success"><i class="glyphicon glyphicon-plus"></i></span>\n            {{/useSSL}}\n            {{^useSSL}}\n              <span class="label label-danger"><i class="glyphicon glyphicon-minus"></i></span>\n            {{/useSSL}}\n            <input type=\'checkbox\' checked=\'{{useSSL}}\' on-change="save:{{this}}">\n          </label>\n        </div>\n      </td>\n    </tr>\n    {{/servers}}\n\n    <tr>\n      <td class="hidden-print text-center" colspan="5">\n        <button on-click="add" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-plus"></i> Добавить</button>\n      </td>\n    </tr>\n\n  </tbody>\n</table>\n';

}
return __p
};