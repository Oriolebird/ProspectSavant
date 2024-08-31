import time
import pandas as pd
from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/player/<id>')
def get_player_data(id):
    df = pd.read_csv('minors_07_26_2024_700.csv')
    d = json.loads(df.query(f'id == {id}').to_json(orient ='records'))[0]
    return d

@app.route('/search/', methods=["POST"])
def search_player_name():
    name = request.get_json()
    print("Searching for player: ",name)
    df = pd.read_csv('minors_07_26_2024_700.csv')
    d = json.loads(df.query(f'name == \"{name}\"').to_json(orient ='records'))
    print(d)
    if(len(d)==0):
        return "No such player"
    return d[0]