from flask import Blueprint, jsonify, request
import numpy as np
import pandas as pd
import requests
from thefuzz import fuzz
import json
import matplotlib.pyplot as plt
from flask_cors import CORS

friar_blueprint = Blueprint('friar_blueprint', __name__)


current_file = 'padres_july_2024.csv'

event_types = [
    0,
    'field_out',
    'strikeout',
    'single',
    'walk',
    'double',
    'home_run',
    'grounded_into_double_play',
    'force_out',
    'hit_by_pitch',
    'field_error',
    'sac_fly',
    'sac_bunt',
    'triple',
    'intent_walk',
    'double_play',
    'fielders_choice_out',
    'caught_stealing_2b',
    'fielders_choice',
    'catcher_interf'
]

hit_types = ['single',
    'triple',
    'double',
    'home_run',]

@friar_blueprint.route("/friar-zone", methods=["GET"])
def friar_data():
    df = pd.read_csv(current_file).fillna(0)
    return {"data": df.to_dict(orient="records")}

@friar_blueprint.route("/pitch-type-group-batter", methods=["GET"])
def group_by_pitch_type_batter():
    df = pd.read_csv(current_file).fillna(0)

    # Total number of events for each batter
    total_df = df[df["batter_team"]=="San Diego Padres"].groupby(["batter_name_first", "batter_name_last"])
    total_df = total_df.agg(
        total=('guid','count'),
    ).reset_index()
    #print(total_df)

    # Pitch type data for each batter, all pitches
    all_df = df[df["batter_team"]=="San Diego Padres"].groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    all_df = all_df.agg(
        chase_rate=('chase','mean'),
        count=('guid','count'),
    ).reset_index().fillna(0)
    all_df = all_df[all_df["count"] > 1]
    all_df = all_df[all_df["pitch_type"] != 0]
    #print(all_df)

    # All pitches that resulted in a swing
    swing_df = df.query('batter_team == \"San Diego Padres\" and swing == True').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    swing_df = swing_df.agg(
        swing_count=('guid','count'),
        bat_speed=('bat_speed', 'mean')
    ).reset_index()
    #print(swing_df)

    # All pitches that resulted in contact
    contact_df = df.query('batter_team == \"San Diego Padres\" and contact == True').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    contact_df = contact_df.agg(
        contact_count=('guid','count'),
        la=('hit_vertical_angle', 'mean')
    ).reset_index()
    #print(contact_df)

    # All pitches that were put in play
    inplay_df = df.query('batter_team == \"San Diego Padres\" and in_play == True').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    inplay_df = inplay_df.agg(
        inplay_count=('guid','count'),
        inplay_ev=('hit_exit_speed', 'mean')
    ).reset_index()
    #print(inplay_df)

    # All pitches that resulted in a hit
    hit_df = df[df['event_type'].isin(hit_types)]
    hit_df = hit_df.query('batter_team == \"San Diego Padres\"').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    hit_df = hit_df.agg(
        hit_count=('guid','count'),
        hit_ev=('hit_exit_speed', 'mean')
    ).reset_index()
    #print(hit_df)

    # All pitches that resulted in ground ball trajectory
    gb_df = df.query('batter_team == \"San Diego Padres\" and hit_trajectory == \"ground_ball\"').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    gb_df = gb_df.agg(
        gb_count=('guid','count'),
    ).reset_index()
    #print(gb_df)

    # All pitches that resulted in line drive trajectory
    l_df = df.query('batter_team == \"San Diego Padres\" and hit_trajectory == \"line_drive\"').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    l_df = l_df.agg(
        ld_count=('guid','count'),
    ).reset_index()
    #print(l_df)

    # All pitches that resulted in fly ball trajectory
    fb_df = df.query('batter_team == \"San Diego Padres\" and hit_trajectory == \"fly_ball\"').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    fb_df = fb_df.agg(
        fb_count=('guid','count'),
    ).reset_index()
    #print(fb_df)

    # Merge all dataframes
    mdf = pd.merge(all_df, contact_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, swing_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, inplay_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, hit_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, gb_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, l_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, fb_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, total_df, on=["batter_name_first", "batter_name_last"], how="left").fillna(0)


    mdf["BABIP"] = mdf["hit_count"]/mdf["inplay_count"] # Batting average on balls in play
    mdf["whiffrate"] = 1-mdf["contact_count"]/mdf["swing_count"] # Whiff rate, how often contact was made on a swing
    mdf["usage"] = mdf["count"]/mdf["total"] # Usage percentage for pitch type
    mdf["gbrate"] = mdf["gb_count"]/mdf["contact_count"] # Ground ball rate, how often contact resulted in a ground ball
    mdf["ldrate"] = mdf["ld_count"]/mdf["contact_count"] # Line drive rate, how often contact resulted in a line drive
    mdf["fbrate"] = mdf["fb_count"]/mdf["contact_count"] # Fly ball rate, how often contact resulted in a fly ball
    mdf["name"] = mdf["batter_name_first"]+" "+mdf["batter_name_last"]

    mdf = mdf.fillna(0)
    #print(mdf)
    #mdf.sort_values("count", axis=0, ascending=False, inplace=True)

    return {"data": mdf.to_dict(orient="records")}

@friar_blueprint.route("/pitch-type-group-pitcher", methods=["GET"])
def group_by_pitch_type_pitcher():
    df = pd.read_csv(current_file).fillna(0)

    # Total number of events for each pitcher
    total_df = df[df["pitcher_team"]=="San Diego Padres"].groupby(["pitcher_name_first", "pitcher_name_last"])
    total_df = total_df.agg(
        total=('guid','count'),
    ).reset_index()
    #print(total_df)

    # Pitch type data for each pitcher, all pitches
    all_df = df[df["pitcher_team"]=="San Diego Padres"].groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    all_df = all_df.agg(
        count=('guid','count'),
        chase_rate=('chase','mean'),
        spin_rate=('spin_rate','mean'),
        zone_speed=('zone_speed','mean'),
        rel_speed=('rel_speed','mean'),
        max_velo=('rel_speed', 'max'),
        horz_break=('horz_break', 'mean'),
        vert_break=('vert_break', 'mean'),
        iv_break=('induced_vert_break', 'mean'),
        rel_angle=('rel_angle','mean'),
        rel_direction=('rel_direction','mean'),
        rel_side=('rel_side','mean'),
        rel_height=('rel_height','mean'),
    ).reset_index().fillna(0)
    all_df = all_df[all_df["count"] > 1]
    all_df = all_df[all_df["pitch_type"] != 0]
    #print(all_df)

    # All pitches that resulted in a swing
    swing_df = df.query('pitcher_team == \"San Diego Padres\" and swing == True').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    swing_df = swing_df.agg(
        swing_count=('guid','count'),
    ).reset_index()
    #print(swing_df)

    # All pitches that resulted in contact
    contact_df = df.query('pitcher_team == \"San Diego Padres\" and contact == True').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    contact_df = contact_df.agg(
        contact_count=('guid','count'),
        la=('hit_vertical_angle', 'mean')
    ).reset_index()
    #print(contact_df)

    # All pitches that were put in play
    inplay_df = df.query('pitcher_team == \"San Diego Padres\" and in_play == True').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    inplay_df = inplay_df.agg(
        inplay_count=('guid','count'),
        inplay_ev=('hit_exit_speed', 'mean')
    ).reset_index()
    #print(inplay_df)

    # All pitches that resulted in a hit
    hit_df = df[df['event_type'].isin(hit_types)]
    hit_df = hit_df.query('pitcher_team == \"San Diego Padres\"').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    hit_df = hit_df.agg(
        hit_count=('guid','count'),
        hit_ev=('hit_exit_speed', 'mean')
    ).reset_index()
    #print(hit_df)

    # All pitches that resulted in ground ball trajectory
    gb_df = df.query('pitcher_team == \"San Diego Padres\" and hit_trajectory == \"ground_ball\"').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    gb_df = gb_df.agg(
        gb_count=('guid','count'),
    ).reset_index()
    #print(gb_df)

    # All pitches that resulted in line drive trajectory
    l_df = df.query('pitcher_team == \"San Diego Padres\" and hit_trajectory == \"line_drive\"').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    l_df = l_df.agg(
        ld_count=('guid','count'),
    ).reset_index()
    #print(l_df)

    # All pitches that resulted in fly ball trajectory
    fb_df = df.query('pitcher_team == \"San Diego Padres\" and hit_trajectory == \"fly_ball\"').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    fb_df = fb_df.agg(
        fb_count=('guid','count'),
    ).reset_index()
    #print(fb_df)

    # Merge all dataframes
    mdf = pd.merge(all_df, contact_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, swing_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, inplay_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, hit_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, gb_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, l_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, fb_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, total_df, on=["pitcher_name_first", "pitcher_name_last"], how="left").fillna(0)


    mdf["BABIP"] = mdf["hit_count"]/mdf["inplay_count"] # Batting average on balls in play
    mdf["whiffrate"] = 1-mdf["contact_count"]/mdf["swing_count"] # Whiff rate, how often contact was made on a swing
    mdf["usage"] = mdf["count"]/mdf["total"] # Usage percentage for pitch type
    mdf["gbrate"] = mdf["gb_count"]/mdf["contact_count"] # Ground ball rate, how often contact resulted in a ground ball
    mdf["ldrate"] = mdf["ld_count"]/mdf["contact_count"] # Line drive rate, how often contact resulted in a line drive
    mdf["fbrate"] = mdf["fb_count"]/mdf["contact_count"] # Fly ball rate, how often contact resulted in a fly ball
    mdf["velo_diff"] = mdf["max_velo"]-mdf["rel_speed"] # Difference between pitch type max velocity and average velocity
    mdf["name"] = mdf["pitcher_name_first"]+" "+mdf["pitcher_name_last"]

    mdf = mdf.fillna(0)
    #print(mdf)
    #mdf.sort_values("count", axis=0, ascending=False, inplace=True)

    return {"data": mdf.to_dict(orient="records")}

@friar_blueprint.route("/search-fuzzy-friar", methods=["POST"])
def search_fuzzy():
    name = request.get_json().lower()
    df = pd.read_csv(current_file)
    bdf = df.query('batter_team == \"San Diego Padres\"')
    pdf = df.query('pitcher_team == \"San Diego Padres\"')
    bdf["name"] = bdf["batter_name_first"]+" "+bdf["batter_name_last"]
    pdf["name"] = pdf["pitcher_name_first"]+" "+pdf["pitcher_name_last"]
    df = pd.concat([bdf, pdf])
    df = df.drop_duplicates(subset=['name'])
    df['FuzzScore'] = df.apply(lambda x: fuzz.ratio(x['name'], name), axis=1)
    df = df.sort_values(by=['FuzzScore'], axis=0, ascending=False, na_position='last')
    #print(df)
    d = json.loads(df.head(5).to_json(orient ='records'))
    if(len(d)==0):
        return "No such player"
    return json.dumps(d)

@friar_blueprint.route("/friar-type/<id>")
def friar_type(id):
    df = pd.read_csv(current_file)
    bdf = df.query('batter_team == \"San Diego Padres\"')
    pdf = df.query('pitcher_team == \"San Diego Padres\"')
    bdf["name"] = bdf["batter_name_first"]+"-"+bdf["batter_name_last"]
    pdf["name"] = pdf["pitcher_name_first"]+"-"+pdf["pitcher_name_last"]

    if id in bdf['name'].values:
        playerType = "batter"
    elif id in pdf['name'].values:
        playerType = "pitcher"
    else:
        playerType = ""


    return {"type":playerType}

@friar_blueprint.route("/friar-batter-swing/<id>")
def friar_batter_swing(id):
    df = pd.read_csv(current_file)
    df = df.query('batter_team == \"San Diego Padres\" and swing == True and bat_speed > 50')
    df["name"] = df["batter_name_first"]+"-"+df["batter_name_last"]
    #print("NAMES", df["name"])
    df = df.query(f'name == \"{id}\"')
    #print("AAA", df)
    df = df.fillna('0')
    counts, bins = np.histogram(df['bat_speed'], bins=20)

    # Format data for JSON
    histogram_data = [
    {"bin": f"{bins[i]:.2f} - {bins[i+1]:.2f}", "count": int(counts[i])}
    for i in range(len(counts))
    ]


    return jsonify(histogram_data)

@friar_blueprint.route("/friar-batter-data/<id>")
def friar_batter_data(id):
    df = pd.read_csv(current_file).fillna(0)
    df["name"] = df["batter_name_first"]+"-"+df["batter_name_last"]
    df = df.query(f'name == \"{id}\"')

    # Total number of events for each batter
    total_df = df[df["batter_team"]=="San Diego Padres"].groupby(["batter_name_first", "batter_name_last"])
    total_df = total_df.agg(
        total=('guid','count'),
    ).reset_index()
    #print(total_df)

    # Pitch type data for each batter, all pitches
    all_df = df[df["batter_team"]=="San Diego Padres"].groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    all_df = all_df.agg(
        chase_rate=('chase','mean'),
        count=('guid','count'),
    ).reset_index().fillna(0)
    all_df = all_df[all_df["count"] > 1]
    all_df = all_df[all_df["pitch_type"] != 0]
    #print(all_df)

    # All pitches that resulted in a swing
    swing_df = df.query('batter_team == \"San Diego Padres\" and swing == True').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    swing_df = swing_df.agg(
        swing_count=('guid','count'),
        bat_speed=('bat_speed', 'mean')
    ).reset_index()
    #print(swing_df)

    # All pitches that resulted in contact
    contact_df = df.query('batter_team == \"San Diego Padres\" and contact == True').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    contact_df = contact_df.agg(
        contact_count=('guid','count'),
        la=('hit_vertical_angle', 'mean')
    ).reset_index()
    #print(contact_df)

    # All pitches that were put in play
    inplay_df = df.query('batter_team == \"San Diego Padres\" and in_play == True').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    inplay_df = inplay_df.agg(
        inplay_count=('guid','count'),
        inplay_ev=('hit_exit_speed', 'mean')
    ).reset_index()
    #print(inplay_df)

    # All pitches that resulted in a hit
    hit_df = df[df['event_type'].isin(hit_types)]
    hit_df = hit_df.query('batter_team == \"San Diego Padres\"').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    hit_df = hit_df.agg(
        hit_count=('guid','count'),
        hit_ev=('hit_exit_speed', 'mean')
    ).reset_index()
    #print(hit_df)

    # All pitches that resulted in ground ball trajectory
    gb_df = df.query('batter_team == \"San Diego Padres\" and hit_trajectory == \"ground_ball\"').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    gb_df = gb_df.agg(
        gb_count=('guid','count'),
    ).reset_index()
    #print(gb_df)

    # All pitches that resulted in line drive trajectory
    l_df = df.query('batter_team == \"San Diego Padres\" and hit_trajectory == \"line_drive\"').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    l_df = l_df.agg(
        ld_count=('guid','count'),
    ).reset_index()
    #print(l_df)

    # All pitches that resulted in fly ball trajectory
    fb_df = df.query('batter_team == \"San Diego Padres\" and hit_trajectory == \"fly_ball\"').groupby(["batter_name_first", "batter_name_last", "pitch_type"])
    fb_df = fb_df.agg(
        fb_count=('guid','count'),
    ).reset_index()
    #print(fb_df)

    # Merge all dataframes
    mdf = pd.merge(all_df, contact_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, swing_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, inplay_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, hit_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, gb_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, l_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, fb_df, on=["batter_name_first", "batter_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, total_df, on=["batter_name_first", "batter_name_last"], how="left").fillna(0)


    mdf["BABIP"] = mdf["hit_count"]/mdf["inplay_count"] # Batting average on balls in play
    mdf["whiffrate"] = 1-mdf["contact_count"]/mdf["swing_count"] # Whiff rate, how often contact was made on a swing
    mdf["usage"] = mdf["count"]/mdf["total"] # Usage percentage for pitch type
    mdf["gbrate"] = mdf["gb_count"]/mdf["contact_count"] # Ground ball rate, how often contact resulted in a ground ball
    mdf["ldrate"] = mdf["ld_count"]/mdf["contact_count"] # Line drive rate, how often contact resulted in a line drive
    mdf["fbrate"] = mdf["fb_count"]/mdf["contact_count"] # Fly ball rate, how often contact resulted in a fly ball
    mdf["name"] = mdf["batter_name_first"]+" "+mdf["batter_name_last"]

    mdf = mdf.fillna(0)
    #print(mdf)
    #mdf.sort_values("count", axis=0, ascending=False, inplace=True)

    return {"data": mdf.to_dict(orient="records")}

@friar_blueprint.route("/friar-pitcher-data/<id>")
def friar_pitcher_data(id):
    df = pd.read_csv(current_file).fillna(0)
    df["name"] = df["pitcher_name_first"]+"-"+df["pitcher_name_last"]
    df = df.query(f'name == \"{id}\"')


    # Total number of events for each pitcher
    total_df = df[df["pitcher_team"]=="San Diego Padres"].groupby(["pitcher_name_first", "pitcher_name_last"])
    total_df = total_df.agg(
        total=('guid','count'),
    ).reset_index()
    #print(total_df)

    # Pitch type data for each pitcher, all pitches
    all_df = df[df["pitcher_team"]=="San Diego Padres"].groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    all_df = all_df.agg(
        count=('guid','count'),
        chase_rate=('chase','mean'),
        spin_rate=('spin_rate','mean'),
        zone_speed=('zone_speed','mean'),
        rel_speed=('rel_speed','mean'),
        max_velo=('rel_speed', 'max'),
        horz_break=('horz_break', 'mean'),
        vert_break=('vert_break', 'mean'),
        iv_break=('induced_vert_break', 'mean'),
        rel_angle=('rel_angle','mean'),
        rel_direction=('rel_direction','mean'),
        rel_side=('rel_side','mean'),
        rel_height=('rel_height','mean'),
    ).reset_index().fillna(0)
    all_df = all_df[all_df["count"] > 1]
    all_df = all_df[all_df["pitch_type"] != 0]
    #print(all_df)

    # All pitches that resulted in a swing
    swing_df = df.query('pitcher_team == \"San Diego Padres\" and swing == True').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    swing_df = swing_df.agg(
        swing_count=('guid','count'),
    ).reset_index()
    #print(swing_df)

    # All pitches that resulted in contact
    contact_df = df.query('pitcher_team == \"San Diego Padres\" and contact == True').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    contact_df = contact_df.agg(
        contact_count=('guid','count'),
        la=('hit_vertical_angle', 'mean')
    ).reset_index()
    #print(contact_df)

    # All pitches that were put in play
    inplay_df = df.query('pitcher_team == \"San Diego Padres\" and in_play == True').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    inplay_df = inplay_df.agg(
        inplay_count=('guid','count'),
        inplay_ev=('hit_exit_speed', 'mean')
    ).reset_index()
    #print(inplay_df)

    # All pitches that resulted in a hit
    hit_df = df[df['event_type'].isin(hit_types)]
    hit_df = hit_df.query('pitcher_team == \"San Diego Padres\"').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    hit_df = hit_df.agg(
        hit_count=('guid','count'),
        hit_ev=('hit_exit_speed', 'mean')
    ).reset_index()
    #print(hit_df)

    # All pitches that resulted in ground ball trajectory
    gb_df = df.query('pitcher_team == \"San Diego Padres\" and hit_trajectory == \"ground_ball\"').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    gb_df = gb_df.agg(
        gb_count=('guid','count'),
    ).reset_index()
    #print(gb_df)

    # All pitches that resulted in line drive trajectory
    l_df = df.query('pitcher_team == \"San Diego Padres\" and hit_trajectory == \"line_drive\"').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    l_df = l_df.agg(
        ld_count=('guid','count'),
    ).reset_index()
    #print(l_df)

    # All pitches that resulted in fly ball trajectory
    fb_df = df.query('pitcher_team == \"San Diego Padres\" and hit_trajectory == \"fly_ball\"').groupby(["pitcher_name_first", "pitcher_name_last", "pitch_type"])
    fb_df = fb_df.agg(
        fb_count=('guid','count'),
    ).reset_index()
    #print(fb_df)

    # Merge all dataframes
    mdf = pd.merge(all_df, contact_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, swing_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, inplay_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, hit_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, gb_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, l_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, fb_df, on=["pitcher_name_first", "pitcher_name_last", "pitch_type"], how="left").fillna(0)
    mdf = pd.merge(mdf, total_df, on=["pitcher_name_first", "pitcher_name_last"], how="left").fillna(0)


    mdf["BABIP"] = mdf["hit_count"]/mdf["inplay_count"] # Batting average on balls in play
    mdf["whiffrate"] = 1-mdf["contact_count"]/mdf["swing_count"] # Whiff rate, how often contact was made on a swing
    mdf["usage"] = mdf["count"]/mdf["total"] # Usage percentage for pitch type
    mdf["gbrate"] = mdf["gb_count"]/mdf["contact_count"] # Ground ball rate, how often contact resulted in a ground ball
    mdf["ldrate"] = mdf["ld_count"]/mdf["contact_count"] # Line drive rate, how often contact resulted in a line drive
    mdf["fbrate"] = mdf["fb_count"]/mdf["contact_count"] # Fly ball rate, how often contact resulted in a fly ball
    mdf["velo_diff"] = mdf["max_velo"]-mdf["rel_speed"] # Difference between pitch type max velocity and average velocity
    mdf["name"] = mdf["pitcher_name_first"]+" "+mdf["pitcher_name_last"]

    mdf = mdf.fillna(0)
    #print(mdf)
    #mdf.sort_values("count", axis=0, ascending=False, inplace=True)

    return {"data": mdf.to_dict(orient="records")}

@friar_blueprint.route("/friar-pitcher-pitches/<id>")
def friar_pitcher_pitches(id):
    df = pd.read_csv(current_file)
    df = df.query('pitcher_team == \"San Diego Padres\"')
    df["name"] = df["pitcher_name_first"]+"-"+df["pitcher_name_last"]
    df = df.query(f'name == \"{id}\"')
    df = df[['pitch_type', 'horz_break', 'induced_vert_break', 'rel_side', 'rel_height']].fillna(0)
    df = df.query('rel_side != 0')

    return {"data": df.to_dict(orient="records")}

