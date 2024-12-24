
import datetime
import io
import json
import locale
from numpy import integer
import pandas as pd
import pybaseball
import requests


def convert_row_to_player_json(tr: str):
    tr_lines = tr.split('\n')
    """for i, row in enumerate(tr_lines):
        print(i, row)"""
    id = tr_lines[4][(tr_lines[4].index('\"')+1):(tr_lines[4].index('\"')+7)]
    name = tr_lines[25][tr_lines[25].find(next(filter(str.isalpha, tr_lines[25]))):tr_lines[25].index("<")-1].replace('&#x27;', '\'')
    names = name.split(',')
    name = names[1][1:]+" "+names[0]
    pitches = tr_lines[29][tr_lines[29].find(next(filter(str.isnumeric, tr_lines[29]))):tr_lines[29].index("</span>")]
    pa = '-1' if '--' in tr_lines[36] else tr_lines[36][tr_lines[36].find(next(filter(str.isnumeric, tr_lines[36]))):]
    ab = '-1' if '--' in tr_lines[43] else tr_lines[43][tr_lines[43].find(next(filter(str.isnumeric, tr_lines[43]))):]
    bip = '-1' if '--' in tr_lines[50] else tr_lines[50][tr_lines[50].find(next(filter(str.isnumeric, tr_lines[50]))):]
    hits = '-1' if '--' in tr_lines[57] else tr_lines[57][tr_lines[57].find(next(filter(str.isnumeric, tr_lines[57]))):]
    singles = '-1' if '--' in tr_lines[64] else tr_lines[64][tr_lines[64].find(next(filter(str.isnumeric, tr_lines[64]))):]
    doubles = '-1' if '--' in tr_lines[71] else tr_lines[71][tr_lines[71].find(next(filter(str.isnumeric, tr_lines[71]))):]
    triples = '-1' if '--' in tr_lines[78] else tr_lines[78][tr_lines[78].find(next(filter(str.isnumeric, tr_lines[78]))):]
    hr = '-1' if '--' in tr_lines[85] else tr_lines[85][tr_lines[85].find(next(filter(str.isnumeric, tr_lines[85]))):]
    k = '-1' if '--' in tr_lines[92] else tr_lines[92][tr_lines[92].find(next(filter(str.isnumeric, tr_lines[92]))):]
    krate = '-1' if '--' in tr_lines[99] else tr_lines[99][tr_lines[99].find(next(filter(str.isnumeric, tr_lines[99]))):]
    bb = '-1' if '--' in tr_lines[106] else tr_lines[106][tr_lines[106].find(next(filter(str.isnumeric, tr_lines[106]))):]
    bbrate = '-1' if '--' in tr_lines[113] else tr_lines[113][tr_lines[113].find(next(filter(str.isnumeric, tr_lines[113]))):]
    whiffs = '-1' if '--' in tr_lines[120] else tr_lines[120][tr_lines[120].find(next(filter(str.isnumeric, tr_lines[120]))):]
    swings = '-1' if '--' in tr_lines[127] else tr_lines[127][tr_lines[127].find(next(filter(str.isnumeric, tr_lines[127]))):]
    ba = '-1' if '--' in tr_lines[134] else tr_lines[134][(tr_lines[134].index('.')):]
    xba = '-1' if '--' in tr_lines[141] else tr_lines[141][(tr_lines[141].index('.')):]
    obp = '-1' if '--' in tr_lines[148] else tr_lines[148][(tr_lines[148].index('.')):]
    xobp = '-1' if '--' in tr_lines[155] else tr_lines[155][(tr_lines[155].index('.')):]
    slg = '-1' if '--' in tr_lines[162] else tr_lines[162][(tr_lines[162].index('.')):]
    xslg = '-1' if '--' in tr_lines[169] else  tr_lines[169][(tr_lines[169].index('.')):]
    woba = '-1' if '--' in tr_lines[176] else tr_lines[176][(tr_lines[176].index('.')):]
    xwoba = '-1' if '--' in tr_lines[183] else  tr_lines[183][(tr_lines[183].index('.')):]
    barrels = '-1' if '--' in tr_lines[190] else tr_lines[190][tr_lines[190].find(next(filter(str.isnumeric, tr_lines[190]))):]
    babip = '-1' if '--' in tr_lines[197] else tr_lines[197][(tr_lines[197].index('.')):]
    whiffrate = '-1' if '--' in tr_lines[204] else tr_lines[204][tr_lines[204].find(next(filter(str.isnumeric, tr_lines[204]))):]
    ev = '-1' if '--' in tr_lines[211] else tr_lines[211][tr_lines[211].find(next(filter(str.isnumeric, tr_lines[211]))):]
    langle = '-1' if '--' in tr_lines[218] else tr_lines[218][tr_lines[218].find(next(filter(str.isnumeric, tr_lines[218]))):]
    hhrate = '-1' if '--' in tr_lines[225] else tr_lines[225][tr_lines[225].find(next(filter(str.isnumeric, tr_lines[225]))):]
    barrelbbe = '-1' if '--' in tr_lines[232] else tr_lines[232][tr_lines[232].find(next(filter(str.isnumeric, tr_lines[232]))):]
    barrelpa = '-1' if '--' in tr_lines[239] else tr_lines[239][tr_lines[239].find(next(filter(str.isnumeric, tr_lines[239]))):]
    locale.setlocale(locale.LC_ALL, '')
    return {
            'id' : id,
            'name' : name,
            'pitches' : int(locale.atof(pitches)),
            'pa' : int(locale.atof(pa)),
            'ab' : int(locale.atof(ab)),
            'bip' : int(locale.atof(bip)),
            'hits' : int(locale.atof(hits)),
            'singles' : int(locale.atof(singles)),
            'doubles' : int(locale.atof(doubles)),
            'triples' : int(locale.atof(triples)),
            'hr' : int(locale.atof(hr)),
            'k' : int(locale.atof(k)),
            'krate' : locale.atof(krate),
            'bb' : int(locale.atof(bb)),
            'bbrate' : locale.atof(bbrate),
            'whiffs' : int(locale.atof(whiffs)),
            'swings' : int(locale.atof(swings)),
            'ba' : locale.atof(ba),
            'xba' : locale.atof(xba),
            'obp' : locale.atof(obp),
            'xobp' : locale.atof(xobp),
            'slg' : locale.atof(slg),
            'xslg' : locale.atof(xslg),
            'woba' : locale.atof(woba),
            'xwoba' : locale.atof(xwoba),
            'babip' : locale.atof(babip),
            'whiffrate' : locale.atof(whiffrate),
            'ev' : locale.atof(ev),
            'langle' : locale.atof(langle),
            'hhrate' : locale.atof(hhrate),
            'barrels' : int(locale.atof(barrels)),
            'barrelbbe' : locale.atof(barrelbbe),
            'barrelpa' : locale.atof(barrelpa)
            }

def convert_chase_row_to_json(tr: str):
    tr_lines = tr.split('\n')
    """for i, row in enumerate(tr_lines):
        print(i, row)"""
    id = tr_lines[4][(tr_lines[4].index('\"')+1):(tr_lines[4].index('\"')+7)]
    chaserate = '-1' if '--' in tr_lines[31] else tr_lines[31][tr_lines[31].find(next(filter(str.isnumeric, tr_lines[31]))):tr_lines[31].index("</span>")]
    return {
            'id' : id,
            'chaserate' : locale.atof(chaserate)
            }

def convert_velo_row_to_json(tr: str):
    tr_lines = tr.split('\n')
    """for i, row in enumerate(tr_lines):
        print(i, row)"""
    id = tr_lines[4][(tr_lines[4].index('\"')+1):(tr_lines[4].index('\"')+7)]
    velo = '-1' if '--' in tr_lines[36] else tr_lines[36][tr_lines[36].find(next(filter(str.isnumeric, tr_lines[36]))):tr_lines[31].index("</span>")]
    #print(velo)
    return {
            'id' : id,
            'velo' : locale.atof(velo)
            }

def add_chase_rate_to_df(df: pd.DataFrame):
    chase_url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=&hfAB=&hfGT=R%7C&hfPR=foul%7Cfoul%5C.%5C.bunt%7Cbunt%5C.%5C.foul%5C.%5C.tip%7Cfoul%5C.%5C.pitchout%7Chit%5C.%5C.into%5C.%5C.play%7Cmissed%5C.%5C.bunt%7Cfoul%5C.%5C.tip%7Cswinging%5C.%5C.pitchout%7Cswinging%5C.%5C.strike%7Cswinging%5C.%5C.strike%5C.%5C.blocked%7C&hfZ=&hfStadium=&hfBBL=&hfNewZones=21%7C22%7C23%7C24%7C26%7C27%7C28%7C29%7C&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=batter&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=AAA%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_is..tracked=on#results'

    chase_data = requests.get(chase_url).text
    chase_data = chase_data[(chase_data.index("tbody")):(chase_data.index("/tbody"))]
    chase_data = chase_data.split('</tr>')

    chase_array = []
    i=0
    while(i<len(chase_data)-1):
        chase_array.append(convert_chase_row_to_json(chase_data[i]))
        i+=2

    cdf = pd.DataFrame(chase_array)

    df = df.merge(cdf, on='id', how='left')

    return df

def add_chase_rate_to_df_a(df: pd.DataFrame):
    chase_url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=&hfAB=&hfGT=R%7C&hfPR=foul%7Cfoul%5C.%5C.bunt%7Cbunt%5C.%5C.foul%5C.%5C.tip%7Cfoul%5C.%5C.pitchout%7Chit%5C.%5C.into%5C.%5C.play%7Cmissed%5C.%5C.bunt%7Cfoul%5C.%5C.tip%7Cswinging%5C.%5C.pitchout%7Cswinging%5C.%5C.strike%7Cswinging%5C.%5C.strike%5C.%5C.blocked%7C&hfZ=&hfStadium=&hfBBL=&hfNewZones=21%7C22%7C23%7C24%7C26%7C27%7C28%7C29%7C&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=batter&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=A%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_is..tracked=on#results'

    chase_data = requests.get(chase_url).text
    chase_data = chase_data[(chase_data.index("tbody")):(chase_data.index("/tbody"))]
    chase_data = chase_data.split('</tr>')

    chase_array = []
    i=0
    while(i<len(chase_data)-1):
        chase_array.append(convert_chase_row_to_json(chase_data[i]))
        i+=2

    cdf = pd.DataFrame(chase_array)

    df = df.merge(cdf, on='id', how='left')

    return df

def add_pitcher_velo_to_df(df: pd.DataFrame):
    velo_url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=FF%7C&hfAB=&hfGT=R%7C&hfPR=&hfZ=&hfStadium=&hfBBL=&hfNewZones=&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=pitcher&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=AAA%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_stats_velocity=on&chk_is..tracked=on#results'

    velo_data = requests.get(velo_url).text
    velo_data = velo_data[(velo_data.index("tbody")):(velo_data.index("/tbody"))]
    velo_data = velo_data.split('</tr>')

    velo_array = []
    i=0
    while(i<len(velo_data)-1):
        velo_array.append(convert_velo_row_to_json(velo_data[i]))
        i+=2

    cdf = pd.DataFrame(velo_array)
    #print(cdf)

    df = df.merge(cdf, on='id', how='left')

    return df

def add_pitcher_velo_to_df_a(df: pd.DataFrame):
    velo_url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=FF%7C&hfAB=&hfGT=R%7C&hfPR=&hfZ=&hfStadium=&hfBBL=&hfNewZones=&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=pitcher&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=A%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_stats_velocity=on&chk_is..tracked=on#results'

    velo_data = requests.get(velo_url).text
    velo_data = velo_data[(velo_data.index("tbody")):(velo_data.index("/tbody"))]
    velo_data = velo_data.split('</tr>')

    velo_array = []
    i=0
    while(i<len(velo_data)-1):
        velo_array.append(convert_velo_row_to_json(velo_data[i]))
        i+=2

    cdf = pd.DataFrame(velo_array)
    #print(cdf)

    df = df.merge(cdf, on='id', how='left')

    return df

def add_pitcher_chase_rate_to_df(df: pd.DataFrame):
    chase_url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=&hfAB=&hfGT=R%7C&hfPR=foul%7Cfoul%5C.%5C.bunt%7Cbunt%5C.%5C.foul%5C.%5C.tip%7Cfoul%5C.%5C.pitchout%7Chit%5C.%5C.into%5C.%5C.play%7Cmissed%5C.%5C.bunt%7Cfoul%5C.%5C.tip%7Cswinging%5C.%5C.pitchout%7Cswinging%5C.%5C.strike%7Cswinging%5C.%5C.strike%5C.%5C.blocked%7C&hfZ=&hfStadium=&hfBBL=&hfNewZones=21%7C22%7C23%7C24%7C26%7C27%7C28%7C29%7C&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=pitcher&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=AAA%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_is..tracked=on#results'

    chase_data = requests.get(chase_url).text
    chase_data = chase_data[(chase_data.index("tbody")):(chase_data.index("/tbody"))]
    chase_data = chase_data.split('</tr>')

    chase_array = []
    i=0
    while(i<len(chase_data)-1):
        chase_array.append(convert_chase_row_to_json(chase_data[i]))
        i+=2

    cdf = pd.DataFrame(chase_array)

    df = df.merge(cdf, on='id', how='left')

    return df

def add_pitcher_chase_rate_to_df_a(df: pd.DataFrame):
    chase_url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=&hfAB=&hfGT=R%7C&hfPR=foul%7Cfoul%5C.%5C.bunt%7Cbunt%5C.%5C.foul%5C.%5C.tip%7Cfoul%5C.%5C.pitchout%7Chit%5C.%5C.into%5C.%5C.play%7Cmissed%5C.%5C.bunt%7Cfoul%5C.%5C.tip%7Cswinging%5C.%5C.pitchout%7Cswinging%5C.%5C.strike%7Cswinging%5C.%5C.strike%5C.%5C.blocked%7C&hfZ=&hfStadium=&hfBBL=&hfNewZones=21%7C22%7C23%7C24%7C26%7C27%7C28%7C29%7C&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=pitcher&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=A%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_is..tracked=on#results'

    chase_data = requests.get(chase_url).text
    chase_data = chase_data[(chase_data.index("tbody")):(chase_data.index("/tbody"))]
    chase_data = chase_data.split('</tr>')

    chase_array = []
    i=0
    while(i<len(chase_data)-1):
        chase_array.append(convert_chase_row_to_json(chase_data[i]))
        i+=2

    cdf = pd.DataFrame(chase_array)

    df = df.merge(cdf, on='id', how='left')

    return df

def get_player_df():
    url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=&hfAB=&hfGT=R%7C&hfPR=&hfZ=&hfStadium=&hfBBL=&hfNewZones=&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=batter&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=AAA%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_is..tracked=on&chk_stats_pa=on&chk_stats_abs=on&chk_stats_bip=on&chk_stats_hits=on&chk_stats_singles=on&chk_stats_dbls=on&chk_stats_triples=on&chk_stats_hrs=on&chk_stats_so=on&chk_stats_k_percent=on&chk_stats_bb=on&chk_stats_bb_percent=on&chk_stats_whiffs=on&chk_stats_swings=on&chk_stats_ba=on&chk_stats_xba=on&chk_stats_obp=on&chk_stats_xobp=on&chk_stats_slg=on&chk_stats_xslg=on&chk_stats_woba=on&chk_stats_xwoba=on&chk_stats_barrels_total=on&chk_stats_babip=on&chk_stats_swing_miss_percent=on&chk_stats_launch_speed=on&chk_stats_launch_angle=on&chk_stats_hardhit_percent=on&chk_stats_barrels_per_bbe_percent=on&chk_stats_barrels_per_pa_percent=on#results'
    data = requests.get(url).text
    data = data[(data.index("tbody")):(data.index("/tbody"))]
    data = data.split('</tr>')

    ja = []

    i=0
    while(i<len(data)-1):
        ja.append(convert_row_to_player_json(data[i]))
        i+=2


    df = pd.DataFrame(ja)
    return df

def get_player_df_a():
    url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=&hfAB=&hfGT=R%7C&hfPR=&hfZ=&hfStadium=&hfBBL=&hfNewZones=&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=batter&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=A%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_is..tracked=on&chk_stats_pa=on&chk_stats_abs=on&chk_stats_bip=on&chk_stats_hits=on&chk_stats_singles=on&chk_stats_dbls=on&chk_stats_triples=on&chk_stats_hrs=on&chk_stats_so=on&chk_stats_k_percent=on&chk_stats_bb=on&chk_stats_bb_percent=on&chk_stats_whiffs=on&chk_stats_swings=on&chk_stats_ba=on&chk_stats_xba=on&chk_stats_obp=on&chk_stats_xobp=on&chk_stats_slg=on&chk_stats_xslg=on&chk_stats_woba=on&chk_stats_xwoba=on&chk_stats_barrels_total=on&chk_stats_babip=on&chk_stats_swing_miss_percent=on&chk_stats_launch_speed=on&chk_stats_launch_angle=on&chk_stats_hardhit_percent=on&chk_stats_barrels_per_bbe_percent=on&chk_stats_barrels_per_pa_percent=on#results'
    data = requests.get(url).text
    data = data[(data.index("tbody")):(data.index("/tbody"))]
    data = data.split('</tr>')

    ja = []

    i=0
    while(i<len(data)-1):
        ja.append(convert_row_to_player_json(data[i]))
        i+=2


    df = pd.DataFrame(ja)
    return df

def get_pitcher_df():
    url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=&hfAB=&hfGT=R%7C&hfPR=&hfZ=&hfStadium=&hfBBL=&hfNewZones=&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=pitcher&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=AAA%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_is..tracked=on&chk_stats_pa=on&chk_stats_abs=on&chk_stats_bip=on&chk_stats_hits=on&chk_stats_singles=on&chk_stats_dbls=on&chk_stats_triples=on&chk_stats_hrs=on&chk_stats_so=on&chk_stats_k_percent=on&chk_stats_bb=on&chk_stats_bb_percent=on&chk_stats_whiffs=on&chk_stats_swings=on&chk_stats_ba=on&chk_stats_xba=on&chk_stats_obp=on&chk_stats_xobp=on&chk_stats_slg=on&chk_stats_xslg=on&chk_stats_woba=on&chk_stats_xwoba=on&chk_stats_barrels_total=on&chk_stats_babip=on&chk_stats_swing_miss_percent=on&chk_stats_launch_speed=on&chk_stats_launch_angle=on&chk_stats_hardhit_percent=on&chk_stats_barrels_per_bbe_percent=on&chk_stats_barrels_per_pa_percent=on#results'
    data = requests.get(url).text
    data = data[(data.index("tbody")):(data.index("/tbody"))]
    data = data.split('</tr>')

    ja = []

    i=0
    while(i<len(data)-1):
        ja.append(convert_row_to_player_json(data[i]))
        i+=2


    df = pd.DataFrame(ja)
    return df

def get_pitcher_df_a():
    url = 'https://baseballsavant.mlb.com/statcast-search-minors?hfPT=&hfAB=&hfGT=R%7C&hfPR=&hfZ=&hfStadium=&hfBBL=&hfNewZones=&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=pitcher&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&hfMo=&hfTeam=&home_road=&hfRO=&position=&hfInn=&hfBBT=&hfFlag=is%5C.%5C.tracked%7Cis%5C.%5C.remove%5C.%5C.bunts%7C&hfLevel=A%7C&metric_1=&hfTeamAffiliate=&hfOpponentAffiliate=&group_by=name&min_pitches=0&min_results=0&min_pas=0&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&chk_is..tracked=on&chk_stats_pa=on&chk_stats_abs=on&chk_stats_bip=on&chk_stats_hits=on&chk_stats_singles=on&chk_stats_dbls=on&chk_stats_triples=on&chk_stats_hrs=on&chk_stats_so=on&chk_stats_k_percent=on&chk_stats_bb=on&chk_stats_bb_percent=on&chk_stats_whiffs=on&chk_stats_swings=on&chk_stats_ba=on&chk_stats_xba=on&chk_stats_obp=on&chk_stats_xobp=on&chk_stats_slg=on&chk_stats_xslg=on&chk_stats_woba=on&chk_stats_xwoba=on&chk_stats_barrels_total=on&chk_stats_babip=on&chk_stats_swing_miss_percent=on&chk_stats_launch_speed=on&chk_stats_launch_angle=on&chk_stats_hardhit_percent=on&chk_stats_barrels_per_bbe_percent=on&chk_stats_barrels_per_pa_percent=on#results'
    data = requests.get(url).text
    data = data[(data.index("tbody")):(data.index("/tbody"))]
    data = data.split('</tr>')

    ja = []

    i=0
    while(i<len(data)-1):
        ja.append(convert_row_to_player_json(data[i]))
        i+=2


    df = pd.DataFrame(ja)
    return df

def add_hitting_percentiles_to_df(df):
    df['krate_p'] = df.krate.rank(pct=True, ascending=False)
    df['bbrate_p'] = df.bbrate.rank(pct=True)
    df['xba_p'] = df.xba.rank(pct=True)
    df['xslg_p'] = df.xslg.rank(pct=True)
    df['xwoba_p'] = df.xwoba.rank(pct=True)
    df['whiffrate_p'] = df.whiffrate.rank(pct=True, ascending=False)
    df['ev_p'] = df.ev.rank(pct=True)
    df['langle_p'] = df.langle.rank(pct=True)
    df['hhrate_p'] = df.hhrate.rank(pct=True)
    df['barrelbbe_p'] = df.barrelbbe.rank(pct=True)
    df['chaserate_p'] = df.chaserate.rank(pct=True, ascending=False)
    df['wbsr_pa_p'] = df.wbsr_pa.rank(pct=True)
    df['spd_p'] = df.spd.rank(pct=True)
    df['pull_p'] = df.pull.rank(pct=True)
    return df

def add_pitching_percentiles_to_df(df):
    df['krate_p'] = df.krate.rank(pct=True)
    df['bbrate_p'] = df.bbrate.rank(pct=True, ascending=False)
    df['xba_p'] = df.xba.rank(pct=True, ascending=False)
    df['xslg_p'] = df.xslg.rank(pct=True, ascending=False)
    df['xwoba_p'] = df.xwoba.rank(pct=True, ascending=False)
    df['whiffrate_p'] = df.whiffrate.rank(pct=True)
    df['ev_p'] = df.ev.rank(pct=True, ascending=False)
    df['langle_p'] = df.langle.rank(pct=True, ascending=False)
    df['hhrate_p'] = df.hhrate.rank(pct=True, ascending=False)
    df['barrelbbe_p'] = df.barrelbbe.rank(pct=True, ascending=False)
    df['chaserate_p'] = df.chaserate.rank(pct=True)
    return df

def add_hitter_prospect_scores(df):
    df['pscore'] = df['age_p']*((df['xwoba_p']*10)+df['barrelbbe_p']*5+df['ev_p']*7+df['krate_p']*2+df['bbrate_p']*4+(df['hhrate_p']*4)+(df['spd_p']*5)+(df['wbsr_pa_p']*5))
    return df

def add_pitcher_prospect_scores(df):
    df['pscore'] = df['age_p']*((df['velo_p']*10)+(df['xwoba_p']*10)+(df['krate_p']*10)+(df['bbrate_p']*5)+(df['whiffrate_p']*4)+(df['chaserate_p']*4)+(df['hhrate_p']*2)+(df['barrelbbe_p']*5))
    return df

def add_player_info(name):
    headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9,en-GB;q=0.8',
        'authorization': 'Bearer search-cty1wzhqd1pqueai45ccxh7y',
        'content-type': 'application/json',
        'dnt': '1',
        'origin': 'https://www.fangraphs.com',
        'priority': 'u=1, i',
        'referer': 'https://www.fangraphs.com/',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'x-elastic-client-meta': 'ent=8.13.0-legacy,js=browser,t=8.13.0-legacy,ft=universal',
        'x-swiftype-client': 'elastic-app-search-javascript',
        'x-swiftype-client-version': '8.13.0',
    }

    json_data = {
        'query': name,
        'search_fields': {
            'name': {},
            'namekorean': {},
        },
        'result_fields': {
            'id': {
                'raw': {},
            },
            'name': {
                'raw': {},
            },
            'firstname': {
                'raw': {},
            },
            'lastname': {
                'raw': {},
            },
            'namekorean': {
                'raw': {},
            },
            'debut_season': {
                'raw': {},
            },
            'last_season': {
                'raw': {},
            },
            'birthdate': {
                'raw': {},
            },
            'international': {
                'raw': {},
            },
            'url': {
                'raw': {},
            },
        },
    }

    response = requests.post(
        'https://85798c555f18463c9d3ec7d18778c367.ent-search.us-east1.gcp.elastic-cloud.com/api/as/v1/engines/fangraphs/search.json',
        headers=headers,
        json=json_data,
    )
    print("RESPONSE: ",response.text)
    search_json = json.loads(response.text)

    results = search_json["results"]
    results = [r for r in results if(r['name']['raw'].lower() == name.lower())] 
    print("RESULTS: ", results)
    url=""
    if len(results) > 1:
        results.sort(key = lambda json: json['_meta']['score'], reverse=True)
        url = results[0]['url']['raw']
    else:
        url = results[0]['url']['raw']

    url = 'https://www.fangraphs.com'+url
    print(url)
    data = requests.get(url).text
    lines = data.split('<')
    j = "Error"
    for i in range(len(lines)):
        if "dataCommon" in lines[i]:
            j = json.loads(lines[i][lines[i].index('{'):])
            break
    if j == "Error":
        print("Error for player ", name)
        return {}, {}, "", "", "", "", "", "", "", "", "", ""
    
    #SPEED CALCULATION
    stats = j["props"]["pageProps"]["dataStats"]["data"] 
    print("Stats1: ", stats)
    stats = list(filter(lambda x: "Season" in x and "AbbLevel" in x and "2024" in x["Season"] and "AAA" in x["AbbLevel"], stats))
    print("Stats: ", stats)
    pull = stats[0]["Pull%"] if len(stats)>0 and "Pull%" in stats[0]  else 0
    spd = stats[0]["Spd"] if len(stats)>0 and "Spd" in stats[0]  else 0
    wbsr = stats[0]["wBsR"] if len(stats)>0 and "wBsR" in stats[0] else 0
    print("Check3: ", pull, spd, wbsr)

    #FV
    fv = j["props"]["pageProps"]["dataCommon"]["prospect"][0]["cFV"] if "prospect" in j["props"]["pageProps"]["dataCommon"] and len(j["props"]["pageProps"]["dataCommon"]["prospect"])>0 else 0

    print("DATACOMMON ", j["props"]["pageProps"]["dataCommon"])
    info = j["props"]["pageProps"]["dataCommon"]["playerInfo"]
    if "teamInfo" in j["props"]["pageProps"]["dataCommon"]:
        team = j["props"]["pageProps"]["dataCommon"]["teamInfo"]
        #print("RETURNS: ", info, team, info["PlayerId"], info["MLBAMId"], info["MinorMasterId"], info["Bats"], info["Throws"], info["Position"], info["UPURL"], team["MLB_FullName"], team["MLB_ShortName"], team["MLB_AbbName"])
        return info, team, info["PlayerId"], info["MLBAMId"], info["MinorMasterId"], info["AgeYears"], info["AgeDisplayOld"], info["Bats"], info["Throws"], info["Position"], info["UPURL"], (team["MLB_FullName"]), team["MLB_ShortName"], team["MLB_AbbName"], spd, pull, wbsr, fv
    else:
        return info, "{}", info["PlayerId"], info["MLBAMId"], info["MinorMasterId"], info["AgeYears"], info["AgeDisplayOld"], info["Bats"], info["Throws"], info["Position"], info["UPURL"], "FA", "FA", "FA", 0, 0, 0, 0

def add_player_info_a(name):
    headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9,en-GB;q=0.8',
        'authorization': 'Bearer search-cty1wzhqd1pqueai45ccxh7y',
        'content-type': 'application/json',
        'dnt': '1',
        'origin': 'https://www.fangraphs.com',
        'priority': 'u=1, i',
        'referer': 'https://www.fangraphs.com/',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'x-elastic-client-meta': 'ent=8.13.0-legacy,js=browser,t=8.13.0-legacy,ft=universal',
        'x-swiftype-client': 'elastic-app-search-javascript',
        'x-swiftype-client-version': '8.13.0',
    }

    json_data = {
        'query': name,
        'search_fields': {
            'name': {},
            'namekorean': {},
        },
        'result_fields': {
            'id': {
                'raw': {},
            },
            'name': {
                'raw': {},
            },
            'firstname': {
                'raw': {},
            },
            'lastname': {
                'raw': {},
            },
            'namekorean': {
                'raw': {},
            },
            'debut_season': {
                'raw': {},
            },
            'last_season': {
                'raw': {},
            },
            'birthdate': {
                'raw': {},
            },
            'international': {
                'raw': {},
            },
            'url': {
                'raw': {},
            },
        },
    }

    response = requests.post(
        'https://85798c555f18463c9d3ec7d18778c367.ent-search.us-east1.gcp.elastic-cloud.com/api/as/v1/engines/fangraphs/search.json',
        headers=headers,
        json=json_data,
    )
    print("RESPONSE: ",response.text)
    search_json = json.loads(response.text)

    results = search_json["results"]
    results = [r for r in results if(r['name']['raw'].lower() == name.lower())] 
    print("RESULTS: ", results)
    url=""
    if len(results) > 1:
        results.sort(key = lambda json: json['_meta']['score'], reverse=True)
        url = results[0]['url']['raw']
    else:
        url = results[0]['url']['raw']

    url = 'https://www.fangraphs.com'+url
    print(url)
    data = requests.get(url).text
    lines = data.split('<')
    j = "Error"
    for i in range(len(lines)):
        if "dataCommon" in lines[i]:
            j = json.loads(lines[i][lines[i].index('{'):])
            break
    if j == "Error":
        print("Error for player ", name)
        return {}, {}, "", "", "", "", "", "", "", "", "", ""
    
    #SPEED CALCULATION
    stats = j["props"]["pageProps"]["dataStats"]["data"] 
    print("Stats1: ", stats)
    stats = list(filter(lambda x: "Season" in x and "AbbLevel" in x and "2024" in x["Season"] and "A" in x["AbbLevel"], stats))
    print("Stats: ", stats)
    pull = stats[0]["Pull%"] if len(stats)>0 and "Pull%" in stats[0]  else 0
    spd = stats[0]["Spd"] if len(stats)>0 and "Spd" in stats[0]  else 0
    wbsr = stats[0]["wBsR"] if len(stats)>0 and "wBsR" in stats[0] else 0

    #FV
    fv = j["props"]["pageProps"]["dataCommon"]["prospect"][0]["cFV"] if "prospect" in j["props"]["pageProps"]["dataCommon"] and len(j["props"]["pageProps"]["dataCommon"]["prospect"])>0 else 0

    print("DATACOMMON ", j["props"]["pageProps"]["dataCommon"])
    info = j["props"]["pageProps"]["dataCommon"]["playerInfo"]
    if "teamInfo" in j["props"]["pageProps"]["dataCommon"]:
        team = j["props"]["pageProps"]["dataCommon"]["teamInfo"]
        #print("RETURNS: ", info, team, info["PlayerId"], info["MLBAMId"], info["MinorMasterId"], info["Bats"], info["Throws"], info["Position"], info["UPURL"], team["MLB_FullName"], team["MLB_ShortName"], team["MLB_AbbName"])
        return info, team, info["PlayerId"], info["MLBAMId"], info["MinorMasterId"], info["AgeYears"], info["AgeDisplayOld"], info["Bats"], info["Throws"], info["Position"], info["UPURL"], (team["MLB_FullName"]), team["MLB_ShortName"], team["MLB_AbbName"], spd, pull, wbsr, fv
    else:
        return info, "{}", info["PlayerId"], info["MLBAMId"], info["MinorMasterId"], info["AgeYears"], info["AgeDisplayOld"], info["Bats"], info["Throws"], info["Position"], info["UPURL"], "FA", "FA", "FA", 0, 0, 0, 0


df = get_player_df()

pitch_qualifier = 700
df = df.query('pitches > '+str(pitch_qualifier))

df = add_chase_rate_to_df(df)

pdf = get_pitcher_df()

pitch_qualifier_p = 700
pdf = pdf.query('pitches > '+str(pitch_qualifier_p))

pdf = add_pitcher_chase_rate_to_df(pdf)
pdf = add_pitcher_velo_to_df(pdf)

pdf = add_pitching_percentiles_to_df(pdf)
pdf['velo_p'] = pdf.velo.rank(pct=True)

df_a = get_player_df_a()

pitch_qualifier = 400
df_a = df_a.query('pitches > '+str(pitch_qualifier))

df_a = add_chase_rate_to_df_a(df_a)

pdf_a = get_pitcher_df_a()

pitch_qualifier_p = 400
pdf_a = pdf_a.query('pitches > '+str(pitch_qualifier_p))

pdf_a = add_pitcher_chase_rate_to_df_a(pdf_a)
pdf_a = add_pitcher_velo_to_df_a(pdf_a)

pdf_a = add_pitching_percentiles_to_df(pdf_a)
pdf_a['velo_p'] = pdf_a.velo.rank(pct=True)



"""id_df = pd.read_csv('player_ids.csv').fillna(0)[['MLBID', 'BATS', 'THROWS', 'TEAM', 'BIRTHDATE', 'LG', 'POS', 'IDFANGRAPHS', 'BREFID']]
print(id_df.columns)
df['id']=df['id'].astype(int)
pdf['id']=pdf['id'].astype(int)
id_df['MLBID']=id_df['MLBID'].astype(int)
print(id_df)
df = df.merge(id_df, how="left", left_on="id", right_on="MLBID")
pdf = pdf.merge(id_df, how="left", left_on="id", right_on="MLBID")"""

df["player_info"], df["team_info"], df["PlayerID"], df["MLBAMId"], df["MinorMasterId"], df["age"], df["AgeDisplayOld"], df["Bats"], df["Throws"], df["Position"], df["UPURL"], df["MLB_FullName"], df["MLB_ShortName"], df["MLB_AbbName"], df["spd"], df["pull"] , df["wbsr"], df["fv"] = zip(*df["name"].apply(add_player_info))
pdf["player_info"], pdf["team_info"], pdf["PlayerID"],pdf["MLBAMId"], pdf["MinorMasterId"], pdf["age"], pdf["AgeDisplayOld"], pdf["Bats"], pdf["Throws"], pdf["Position"], pdf["UPURL"], pdf["MLB_FullName"], pdf["MLB_ShortName"], pdf["MLB_AbbName"], pdf["spd"], pdf["pull"], pdf["wbsr"], pdf["fv"] = zip(*pdf["name"].apply(add_player_info))
df_a["player_info"], df_a["team_info"], df_a["PlayerID"], df_a["MLBAMId"], df_a["MinorMasterId"], df_a["age"], df_a["AgeDisplayOld"], df_a["Bats"], df_a["Throws"], df_a["Position"], df_a["UPURL"], df_a["MLB_FullName"], df_a["MLB_ShortName"], df_a["MLB_AbbName"], df_a["spd"], df_a["pull"], df_a["wbsr"], df_a["fv"] = zip(*df_a["name"].apply(add_player_info_a))
pdf_a["player_info"], pdf_a["team_info"], pdf_a["PlayerID"],pdf_a["MLBAMId"], pdf_a["MinorMasterId"], pdf_a["age"], pdf_a["AgeDisplayOld"], pdf_a["Bats"], pdf_a["Throws"], pdf_a["Position"], pdf_a["UPURL"], pdf_a["MLB_FullName"], pdf_a["MLB_ShortName"], pdf_a["MLB_AbbName"], pdf_a["spd"], pdf_a["pull"], pdf_a["wbsr"], pdf_a["fv"] = zip(*pdf_a["name"].apply(add_player_info_a))

df["wbsr_pa"] = df["wbsr"]/df["pa"]
df_a["wbsr_pa"] = df_a["wbsr"]/df_a["pa"]

df = add_hitting_percentiles_to_df(df)
df_a = add_hitting_percentiles_to_df(df_a)


def add_age_days(age):
    a = age.split(' ')
    #"26 years, 6 months, 17 days"
    days = int(a[0])*365 + int(a[2])*30 + int(a[4])
    return days

df['age_days'] = df['AgeDisplayOld'].apply(add_age_days)
df['age_p'] = df.age_days.rank(pct=True, ascending=False)
pdf['age_days'] = pdf['AgeDisplayOld'].apply(add_age_days)
pdf['age_p'] = pdf.age_days.rank(pct=True, ascending=False)
print(pdf['age_p'])
df = add_hitter_prospect_scores(df)
pdf = add_pitcher_prospect_scores(pdf)
df['score_p'] = df.pscore.rank(pct=True, ascending=True)
pdf['score_p'] = pdf.pscore.rank(pct=True, ascending=True)

df_a['age_days'] = df_a['AgeDisplayOld'].apply(add_age_days)
df_a['age_p'] = df_a.age_days.rank(pct=True, ascending=False)
pdf_a['age_days'] = pdf_a['AgeDisplayOld'].apply(add_age_days)
pdf_a['age_p'] = pdf_a.age_days.rank(pct=True, ascending=False)
print(pdf_a['age_p'])
df_a = add_hitter_prospect_scores(df_a)
pdf_a = add_pitcher_prospect_scores(pdf_a)
df_a['score_p'] = df_a.pscore.rank(pct=True, ascending=True)
pdf_a['score_p'] = pdf_a.pscore.rank(pct=True, ascending=True)

df['level'] = "AAA"
pdf['level'] = "AAA"

df_a['level'] = "A"
pdf_a['level'] = "A"

df = pd.concat([df, df_a])
pdf = pd.concat([pdf, pdf_a])

print(df)
print(pdf)

date = datetime.datetime.today().strftime('%m_%d_%Y')

df.to_csv('minors_'+date+'_'+str(700)+'.csv', index=False) 

pdf.to_csv('minors_pitchers_'+date+'_'+str(700)+'.csv', index=False) 





