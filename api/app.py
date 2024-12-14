import time
import pandas as pd
import requests
from flask import Flask, request
import json

app = Flask(__name__)

current_file = 'minors_12_10_2024_700.csv'
current_pitchers_file = 'minors_pitchers_12_10_2024_700.csv'

@app.route('/player/<id>')
def get_player_data(id):
    df = pd.read_csv(current_file)
    pdf = pd.read_csv(current_pitchers_file)
    df_merged = df.append(pdf, ignore_index=True)
    print(df_merged)
    d = json.loads(df_merged.query(f'id == {id}').to_json(orient ='records'))[0]
    return d

@app.route('/search/', methods=["POST"])
def search_player_name():
    name = request.get_json()
    print("Searching for player: ",name)
    df = pd.read_csv(current_file)
    pdf = pd.read_csv(current_pitchers_file)
    df_merged = df.append(pdf, ignore_index=True)
    d = json.loads(df_merged.query(f'name == \"{name}\"').to_json(orient ='records'))
    print(d)
    if(len(d)==0):
        return "No such player"
    return d[0]

@app.route('/player-info/', methods=["POST"])
def get_player_info():
    r = request.get_json()
    print("R: ", r)
    url = 'https://www.fangraphs.com'+r['playerUrlProp']
    print(url)
    data = requests.get(url).text
    lines = data.split('<')
    j = "Error"
    for i in range(len(lines)):
        if "dataCommon" in lines[i]:
            j = json.loads(lines[i][lines[i].index('{'):])
            break
    return {"stats": j['props']['pageProps']['dataStats'], "common": j['props']['pageProps']['dataCommon'], "contract": j['props']['pageProps']['dataContractStatus'], "draft": j['props']['pageProps']['dataModuleDraftInfo'] }

@app.route('/leaders/hitters')
def get_leader_data():
    df = pd.read_csv(current_file)
    print(df.to_dict("records"))
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

    print(df)
    df = df.fillna(0)

    return {"data": df.to_dict(orient="records")}

@app.route('/leaders/pitchers')
def get_pitcher_leader_data():
    df = pd.read_csv(current_pitchers_file)
    print(df.to_dict("records"))
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

    print(df)
    df = df.fillna(0)

    return {"data": df.to_dict(orient="records")}