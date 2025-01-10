import time
import pandas as pd
import json



current_file = 'fangraphs-leaderboard-projections.csv'

def get_starter_data():
    df = pd.read_csv(current_file)
    df["Team"] = df["Team"].fillna("FA")
    return df.fillna(0)
def grouped_weighted_avg(values, weights, by):
    return (values * weights).groupby(by).sum() / weights.groupby(by).sum()

df = get_starter_data()
gfip = grouped_weighted_avg(values=df.FIP, weights=df.IP, by=df.Team).to_frame().rename(columns= {0: 'Avg FIP'})
gera = grouped_weighted_avg(values=df.ERA, weights=df.IP, by=df.Team).to_frame().rename(columns= {0: 'Avg ERA'})
gkbb = grouped_weighted_avg(values=df["K-BB%"], weights=df.IP, by=df.Team).to_frame().rename(columns= {0: 'Avg K-BB%'})
gkbb['Avg K-BB%'] = gkbb['Avg K-BB%']*100
print(df)
print(gfip)

top3_df = df.groupby(['Team']).head(3).sort_values(["WAR"]).groupby(['Team']).agg(
    total_war=('WAR', 'sum'),
).rename(columns= {"total_war": 'Top 3 Total WAR'})
print(top3_df)

team_df = df.groupby(['Team']).agg(
    total_war=('WAR', 'sum'),
).sort_values(["total_war"])
team_df = team_df.join(top3_df, how='left', on='Team')
team_df = team_df.join(gfip, how='left', on='Team')
team_df = team_df.join(gera, how='left', on='Team')
team_df = team_df.join(gkbb, how='left', on='Team')
print(team_df)

team_df.to_csv('rotation_ranks.csv', index=True) 

