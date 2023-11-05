import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
from datetime import datetime

# urls = ["https://stats.espncricinfo.com/ci/engine/player/422108.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/219889.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/34102.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/308967.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/311158.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/36084.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/28081.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/28081.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/277906.html?class=11;template=results;type=batting;view=match",
#         "https://stats.espncricinfo.com/ci/engine/player/253802.html?class=11;template=results;type=batting;view=match"
#         ]

urls =[
    "https://stats.espncricinfo.com/ci/engine/player/253802.html?class=11;template=results;type=batting;view=match"
]

def get_api_data(date, place):
    if date and place:
        parsed_date = datetime.strptime(date, "%d %b %Y")
        formatted_date = parsed_date.strftime("%Y-%m-%d")

        api_url = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{place}/{formatted_date}/{formatted_date}?unitGroup=us&include=days&key=FQULW6FVZ26H9M9FE75BFGRCQ&contentType=json"
        print(api_url)
        response = requests.get(api_url)
        
        if response.status_code == 200:
                wet = response.json()
                if wet:
                    if 'days' in wet:
                        return {"temp":wet['days'][0]['temp'], "hum":wet['days'][0]['humidity'],"wind":wet['days'][0]['windspeed']}
        return None

data = []

for url in urls:
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')

    engine_table = soup.find_all('table', class_='engineTable')

    link = soup.find(class_='icc-home')
    # print(link.text)
    # print(link.text)
    pattern = r'\b[A-Z][A-Za-z]+\s[A-Z][A-Za-z]+\b'

    Player_name = re.search(pattern, link.text).group()

    # print(Player_name)

    for table in engine_table:
        caption = table.find('caption')
        if caption and caption.text == 'Match by match list':
            rows = table.find_all('tr')
            i = 0

            for row in rows:
                cells = row.find_all(['th', 'td'])
                row_data = []

                if i == 0:
                    # Add 'Player' to the first row
                    row_data.append('Player')
                    i = 1
                else:
                    row_data.append(Player_name)

                date=''
                place=''
                for cell in cells:
                    if cell == cells[-1]:
                        continue
                    if cell == cells[10]:
                        date=cell.text
                    if cell == cells[9]:
                        place = cell.text
                        # print(place)
                    row_data.append(cell.text)
                if row == rows[0]:
                    row_data.append('temp')
                    row_data.append('humidity')
                    row_data.append('windspeed')
                else:
                    wether_data=get_api_data(date,place)
                    if wether_data:
                        row_data.append(wether_data.get("temp", "N/A"))
                        row_data.append(wether_data.get("hum", "N/A"))
                        row_data.append(wether_data.get("wind", "N/A"))
                    else:
                        row_data.append("N/A")
                        row_data.append("N/A")
                        row_data.append("N/A")
                
                
                data.append(row_data)

df = pd.DataFrame(data)
df.to_csv('players_data_batters.csv',mode='a',header=False ,index=False)
