import pandas as pd

data = pd.read_csv('./WebScrap/players_data_batters.csv')

count=0

prev_player='AK Markram'

def calculate_innings(row):
    global prev_player,count

    if prev_player!=row['Player']:
        count=0
        prev_player=row['Player']

    if (row['Bat1']!='-' and row['Bat1']!='DNB' and row['Bat1']!='TDNB' and  row['Bat1']!='sub') and (row['Bat2']!='-' and row['Bat2']!='DNB' and row['Bat2']!='TDNB' and  row['Bat2']!='sub'):
        count=count+2   
        return count
    if (row['Bat1']!='-' and row['Bat1']!='DNB' and row['Bat1']!='TDNB' and  row['Bat1']!='sub') or (row['Bat2']!='-' and row['Bat2']!='DNB' and row['Bat2']!='TDNB' and  row['Bat2']!='sub'):
        count=count+1
        return count
    else:
        return count

data['no_of_innings'] = data.apply(calculate_innings, axis=1)

data.to_csv('./WebScrap/modified_file.csv', index=False)
