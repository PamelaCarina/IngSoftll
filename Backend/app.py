from flask import Flask
from flask import request
app = Flask(__name__)

@app.route("/")
def dashboard():
    return "Mankk skt1Completo"

@app.route("/saveEncuesta", methods=['POST'])
def saveEncuesta():
    if request.method == 'POST':
        data = request.form

@app.route("/getEncuestas", methods=['GET'])
def getEncuestas():
    return "Holi"


if __name__ == "__main__":
    app.run()