from pyramid.renderers import get_renderer
from pyramid.view import view_config, view_defaults
import transaction

from models import DBSession, Server


SERVERS = [
    {
        'id': 1,
        'address': '0.0.0.0',
        'port': 80,
        'useSSL': False,
    },
    {
        'id': 2,
        'address': '127.0.0.1',
        'port': 80,
        'useSSL': False,
    },
    {
        'id': 3,
        'address': '192.168.1.100',
        'port': 80,
        'useSSL': True,
    },
    {
        'id': 4,
        'address': '192.168.1.100',
        'port': 8000,
        'useSSL': False,
    },
]


def site_layout():
    renderer = get_renderer("templates/layout.pt")
    layout = renderer.implementation().macros['layout']
    return layout


@view_config(renderer="templates/index.pt")
def index_view(request):
    return {"layout": site_layout(),
            "page_title": "Server List Manager"}



@view_defaults(route_name='server')
class ServerView(object):
    def __init__(self, request):
        self.request = request

    @view_config(request_method='GET', renderer="json")
    def get(self):
        uid = self.request.matchdict['uid']
        server = DBSession.query(Server).filter_by(uid=uid).one()
        return {
            'uid': server.uid,
            'address': server.address,
            'port': server.port,
            'useSSL': server.useSSL
        }

    @view_config(request_method='POST', renderer="json")
    def post(self):
        return {}

    @view_config(request_method='PUT', renderer="json")
    def put(self):
        uid = self.request.matchdict['uid']
        server = DBSession.query(Server).filter_by(uid=uid).one()
        data = self.request.json
        with transaction.manager:
            for k,v in data.items():
                setattr(server, k, v)
            DBSession.merge(server)
        return {
            'uid': server.uid,
            'address': server.address,
            'port': server.port,
            'useSSL': server.useSSL
        }

    @view_config(request_method='DELETE', renderer="json")
    def delete(self):
        uid = self.request.matchdict['uid']
        server = DBSession.query(Server).filter_by(uid=uid).one()
        with transaction.manager:
            DBSession.delete(server)
        return {'deleted': True}

    @view_config(route_name='servers', request_method='GET', renderer="json")
    def get_servers(self):
        servers = DBSession.query(Server).all()
        def serialize():
            for server in servers:
                yield {
                    'uid': server.uid,
                    'address': server.address,
                    'port': server.port,
                    'useSSL': server.useSSL,
                }
        return list(serialize())

    @view_config(route_name='servers', request_method='POST', renderer="json")
    def add_servers(self):
        data = self.request.json
        with transaction.manager:
            server = Server(**data)
            DBSession.add(server)
            DBSession.flush()
            qs = DBSession.query(Server)
            qs.session.refresh(server)
            return {
                'uid': server.uid,
                'address': server.address,
                'port': server.port,
                'useSSL': server.useSSL
            }
