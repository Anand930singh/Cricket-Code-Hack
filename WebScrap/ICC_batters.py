import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
from datetime import datetime

urls = [
        "https://stats.espncricinfo.com/ci/engine/player/600498.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/436757.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/379143.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/372116.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/787987.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/325026.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/959767.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/823509.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/1070173.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/642519.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/297433.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/311158.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/308967.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/34102.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/219889.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/422108.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/267192.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/277906.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/253802.html?class=11;template=results;type=batting;view=match"
    ]

api_key=[
    # "PJBH7BBMBLJ6BHMB27WFEWXTN",  #Avaneesh
    "ZDNKN86N22MS4H6KF9HHBBJ2F",  #Aayush
    "YXSFDUYGVRHE9SYXTEY4VXW88",  #Ashish
    "U2RBSW9GFFYQA8WXJJK2TBPP3",   #Anish
    "FQULW6FVZ26H9M9FE75BFGRCQ",  #Anand
    "9MSUK7RWR5RB59E27GVBFAZJC"   #Aayush 2
]

ind=0
jnd=0

def get_api_data(date, place):
    global jnd, ind
    if date and place:
        jnd=jnd+1
        parsed_date = datetime.strptime(date, "%d %b %Y")
        formatted_date = parsed_date.strftime("%Y-%m-%d")

        key=api_key[ind]
        print(key)
        api_url = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{place}/{formatted_date}/{formatted_date}?unitGroup=us&include=days&key={key}&contentType=json"
        # print(api_url)
        response = requests.get(api_url)
        if jnd>950:
            jnd=0
            ind=ind+1
        if response.status_code == 200:
                wet = response.json()
                if wet:
                    if 'days' in wet:
                        return {"temp":wet['days'][0]['temp'], "hum":wet['days'][0]['humidity'],"wind":wet['days'][0]['windspeed'],"conditions":wet['days'][0]['conditions']}
        return None

data = []

for url in urls:
    r = requests.get(url)
    print(r)
    soup = BeautifulSoup(r.text, 'html.parser')

    engine_table = soup.find_all('table', class_='engineTable')

    link = soup.find(class_='icc-home')
    # print(link.text)
    # print(link.text)
    # pattern = r'\b[A-Z][A-Za-z]+\s[A-Z][A-Za-z]+\b'
    xyz=link.text
    result_array = xyz.split(" / ")

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
                    row_data.append(result_array[2])

                date=''
                place=''
                format=''
                opposition=''
                for cell in cells:
                    if cell == cells[-1]:
                        continue
                    if cell == cells[10]:
                        date=cell.text
                    if cell == cells[9]:
                        place = cell.text
                    if cell == cells[8] and row== rows[0]:
                        continue
                    elif cell == cells[8] :
                        # print(cell.text)
                        test_count = cell.text.split(" v ")
                        # print(test_count)
                        format=test_count[0]
                        opposition=test_count[1]
                        continue
                    row_data.append(cell.text)
                if row == rows[0]:
                    row_data.append('temp')
                    row_data.append('humidity')
                    row_data.append('windspeed')
                    row_data.append('conditions')
                    row_data.append('format')
                    row_data.append('opposition')
                else:
                    wether_data=get_api_data(date,place)
                    if wether_data:
                        row_data.append(wether_data.get("temp", "N/A"))
                        row_data.append(wether_data.get("hum", "N/A"))
                        row_data.append(wether_data.get("wind", "N/A"))
                        row_data.append(wether_data.get("conditions", "N/A"))
                    else:
                        row_data.append("N/A")
                        row_data.append("N/A")
                        row_data.append("N/A")
                        row_data.append("N/A")
                    row_data.append(format)
                    row_data.append(opposition)
                
                print(row_data)
                data.append(row_data)

df = pd.DataFrame(data)
df.to_csv('players_data_batters.csv',mode='a',header=False ,index=False)