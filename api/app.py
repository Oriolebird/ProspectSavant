import time
import pandas as pd
import requests
from flask import Flask, request
import json
from flask_cors import CORS
from thefuzz import fuzz

app = Flask(__name__)

from FriarZone import friarzone
app.register_blueprint(friarzone.friar_blueprint)
CORS(app, resources={r'/*': {'origins': '*'}})

current_file = 'minors_12_24_2024_700.csv'
current_pitchers_file = 'minors_pitchers_12_24_2024_700.csv'

@app.route('/player/<id>')
def get_player_data(id):
    df = pd.read_csv(current_file)
    pdf = pd.read_csv(current_pitchers_file)
    df_merged = pd.concat([df, pdf], ignore_index=True)
    d = json.loads(df_merged.query(f'id == {id}').to_json(orient ='records'))[0]
    return d

@app.route('/search/', methods=["POST"])
def search_player_name():
    name = request.get_json().lower()
    df = pd.read_csv(current_file)
    pdf = pd.read_csv(current_pitchers_file)
    df_merged = pd.concat([df, pdf], ignore_index=True)
    d = json.loads(df_merged.query(f'name.str.lower() == \"{name}\"').to_json(orient ='records'))
    if(len(d)==0):
        return "No such player"
    return d[0]

@app.route('/search-fuzzy/', methods=["POST"])
def search_fuzzy():
    name = request.get_json().lower()
    df = pd.read_csv(current_file)
    pdf = pd.read_csv(current_pitchers_file)
    df_merged = pd.concat([df, pdf], ignore_index=True)
    df_merged['FuzzScore'] = df_merged.apply(lambda x: fuzz.ratio(x['name'], name), axis=1)
    df_merged = df_merged.sort_values(by=['FuzzScore'], axis=0, ascending=False, na_position='last')
    print(df_merged)
    d = json.loads(df_merged.head(5).to_json(orient ='records'))
    if(len(d)==0):
        return "No such player"
    return json.dumps(d)

@app.route('/player-info/', methods=["POST"])
def get_player_info():
    r = request.get_json()
    headers = {
    "Accept-Language" : "en-US,en;q=0.5",
    "User-Agent": "Defined",
    }
    url = 'https://www.fangraphs.com'+r['playerUrlProp']
    data = requests.get(url, headers=headers).text
    lines = data.split('<')
    j = "Error"
    for i in range(len(lines)):
        if "dataCommon" in lines[i]:
            j = json.loads(lines[i][lines[i].index('{'):])
            break
    return {"stats": j['props']['pageProps']['dataStats'], "common": j['props']['pageProps']['dataCommon'], "contract": j['props']['pageProps']['dataContractStatus'], "draft": j['props']['pageProps']['dataModuleDraftInfo'] }

@app.route('/leaders/hitters/<level>')
def get_leader_data(level):
    df = pd.read_csv(current_file)
    df["p_agg"] = df[["xwoba_p",
    "xba_p",
    "xslg_p",
    "ev_p",
    "barrelbbe_p",
    "hhrate_p",
    "langle_p",
    "chaserate_p",
    "whiffrate_p",
    "krate_p",
    "bbrate_p"]].sum(axis = 1, skipna = True)/11
    df["power_agg"] = df[[
    "xslg_p",
    "ev_p",
    "barrelbbe_p",
    "hhrate_p",]].sum(axis = 1, skipna = True)/4
    df["d_agg"] = df[[
    "chaserate_p",
    "whiffrate_p",
    "krate_p",
    "bbrate_p"]].sum(axis = 1, skipna = True)/4
    df = df.fillna(0)

    return {"data": df[df["level"] == level].to_dict(orient="records")}

@app.route('/leaders/pitchers/<level>')
def get_pitcher_leader_data(level):
    df = pd.read_csv(current_pitchers_file)
    df["p_agg"] = df[["xwoba_p",
    "xba_p",
    "xslg_p",
    "ev_p",
    "barrelbbe_p",
    "hhrate_p",
    "langle_p",
    "chaserate_p",
    "whiffrate_p",
    "krate_p",
    "bbrate_p"]].sum(axis = 1, skipna = True)/11
    df["power_agg"] = df[[
    "xslg_p",
    "ev_p",
    "barrelbbe_p",
    "hhrate_p",]].sum(axis = 1, skipna = True)/4
    df["d_agg"] = df[[
    "chaserate_p",
    "whiffrate_p",
    "krate_p",
    "bbrate_p"]].sum(axis = 1, skipna = True)/4

    df["kbb_rate"]=df["krate"]-df["bbrate"]

    df = df.fillna(0)

    return {"data": df[df["level"] == level].to_dict(orient="records")}