# manager application

INSTALL
=======

1. install dependencies and activate virtualenv
`virtualenv .env --distribute`
`source .env/bin/activate`
`pip install -r req.txt`


2. build frontend assets for develop mode
`grunt build` or for production mode `grunt buildProd`


3. run application
`python api/application.py`
