
import datetime
import io
import pandas as pd
from pybaseball import statcast_batter
from pybaseball import playerid_lookup
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
    return {
            'id' : id,
            'name' : name,
            'pitches' : int(float(pitches)),
            'pa' : int(float(pa)),
            'ab' : int(float(ab)),
            'bip' : int(float(bip)),
            'hits' : int(float(hits)),
            'singles' : int(float(singles)),
            'doubles' : int(float(doubles)),
            'triples' : int(float(triples)),
            'hr' : int(float(hr)),
            'k' : int(float(k)),
            'krate' : float(krate),
            'bb' : int(float(bb)),
            'bbrate' : float(bbrate),
            'whiffs' : int(float(whiffs)),
            'swings' : int(float(swings)),
            'ba' : float(ba),
            'xba' : float(xba),
            'obp' : float(obp),
            'xobp' : float(xobp),
            'slg' : float(slg),
            'xslg' : float(xslg),
            'woba' : float(woba),
            'xwoba' : float(xwoba),
            'babip' : float(babip),
            'whiffrate' : float(whiffrate),
            'ev' : float(ev),
            'langle' : float(langle),
            'hhrate' : float(hhrate),
            'barrels' : int(float(barrels)),
            'barrelbbe' : float(barrelbbe),
            'barrelpa' : float(barrelpa)
            }

def convert_chase_row_to_json(tr: str):
    tr_lines = tr.split('\n')
    """for i, row in enumerate(tr_lines):
        print(i, row)"""
    id = tr_lines[4][(tr_lines[4].index('\"')+1):(tr_lines[4].index('\"')+7)]
    chaserate = '-1' if '--' in tr_lines[31] else tr_lines[31][tr_lines[31].find(next(filter(str.isnumeric, tr_lines[31]))):tr_lines[31].index("</span>")]
    return {
            'id' : id,
            'chaserate' : float(chaserate)
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

def add_percentiles_to_df(df):
    df['krate_p'] = df.krate.rank(pct=True)
    df['bbrate_p'] = df.bbrate.rank(pct=True)
    df['xba_p'] = df.xba.rank(pct=True)
    df['xslg_p'] = df.xslg.rank(pct=True)
    df['xwoba_p'] = df.xwoba.rank(pct=True)
    df['whiffrate_p'] = df.whiffrate.rank(pct=True)
    df['ev_p'] = df.ev.rank(pct=True)
    df['langle_p'] = df.langle.rank(pct=True)
    df['hhrate_p'] = df.hhrate.rank(pct=True)
    df['barrelbbe_p'] = df.barrelbbe.rank(pct=True)
    df['chaserate_p'] = df.chaserate.rank(pct=True)
    return df

df = get_player_df()

pitch_qualifier = 700
df = df.query('pitches > '+str(pitch_qualifier))

df = add_chase_rate_to_df(df)

df = add_percentiles_to_df(df)

print(df)

date = datetime.datetime.today().strftime('%m_%d_%Y')

df.to_csv('minors_'+date+'_'+str(pitch_qualifier)+'.csv', index=False) 
