from wsgiref.simple_server import make_server
from sqlalchemy import create_engine

from pyramid.config import Configurator

from models import DBSession, Base


def main(**settings):
    engine = create_engine('sqlite:///dev.db')
    Base.metadata.create_all(engine)
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_route('server', '/api/server/{uid}')
    config.add_route('servers', '/api/server')
    config.scan("views")
    config.add_static_view('www', '../www/',
                          cache_max_age=86400)
    app = config.make_wsgi_app()
    return app

if __name__ == '__main__':
    app = main()
    server = make_server('0.0.0.0', 8080, app)
    server.serve_forever()
