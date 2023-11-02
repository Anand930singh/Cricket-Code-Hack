import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

urls = ["https://stats.espncricinfo.com/ci/engine/player/232364.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/247235.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/559235.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/506612.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/288284.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/550215.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/277912.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/311592.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/481896.html?class=11;template=results;type=bowling;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/625383.html?class=11;template=results;type=bowling;view=match"
        ]

data = []

for url in urls:
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')

    engine_table = soup.find_all('table', class_='engineTable')

    link = soup.find(class_='icc-home')
    # print(link.text)

    pattern = r'\b[A-Z][A-Za-z\s]+\s[A-Z][A-Za-z]+\b'

    Player_name = re.search(pattern, link.text).group()

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

                for cell in cells:
                    row_data.append(cell.text)
                
                data.append(row_data)

df = pd.DataFrame(data)
df.to_csv('players_data_bowlers.csv',mode='a',header=False ,index=False)
