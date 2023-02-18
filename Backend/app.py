from flask import Flask

app = Flask(__name__)


@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/test')
def test():
    return 'testing'

if __name__ == '__main__':
    app.run()