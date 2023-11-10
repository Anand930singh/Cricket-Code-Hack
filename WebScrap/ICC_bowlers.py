import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

urls = [
        "https://stats.espncricinfo.com/ci/engine/player/600498.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/436757.html?class=11;template=results;type=batting;view=match",
        "https://stats.espncricinfo.com/ci/engine/player/321777.html?class=11;template=results;type=batting;view=match",
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

data = []

for url in urls:
    print(url)
    r = requests.get(url)
    print(r)
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
                print(row_data)
                data.append(row_data)

df = pd.DataFrame(data)
df.to_csv('players_data_bowlers.csv',mode='a',header=False ,index=False)
