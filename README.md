# Verkeersongevallen binnen Europa

Deze repository bevat de sourcecode voor een webapplicatie bestaande uit visualisaties omtrend verkeersongevallen binnen Europa. Hierbij is er een sterke focus op 3 factoren die mogenlijks een rol spelen in de ongevallencijfers: kwaliteit van het wegdek, alcoholconsumptie achter het stuur en grootte van snelheidsboetes. Wij hopen met deze applicatie een handige tool te voorzien voor beleidsmakers voor beslissingen omtrend investeringen, sensibiliseringen en wetgeving om de verkeersveiligheid in hun land te verbeteren.

De applicatie werd ontwikkeld in de context van het vak "Informatievisualisatie" [H04I2a] aan de KU Leuven. Volgende studenten zijn verantwoordelijk voor de bekomen resultaten:

- Damon Kennes
- Thomas Luyten
- Kobe Van der Linden
- Thomas Sergeys

De interface is volledig gemaakt binnen de java-script framework React. 

## Hoe de interface runnen?

Ga in de folder ```./frontend```. Installeer alle nodige javascript paketten met volgend commando:
```
npm install
```
Start vervolgens de applicatie met:
```
npm start
```
Een browser zou nu automatisch moeten openen. Indien dit niet het geval is, open zelf een browser an surf naar ```localhost:3000```. Je kunt de applicatie nu gebruiken zoals bedoeld. 

## Hoe werkt de interface?

De interface toont verschillende inzichten die we uit de data hebben gehaald. Op elk tabblad vind je een kaart van Europa. Door eroverheen te hoveren, worden de aangeduide landen gemarkeerd met een oranje kleur. Deze kleur komt ook terug in de andere grafieken, waarbij ze hetzelfde land vertegenwoordigen. Als er geen beschikbare gegevens zijn voor een bepaald land, wordt er geen kleur getoond in de grafiek. Door op een land (of punt) te klikken, wordt het land geselecteerd en krijgt het een rode kleur. Dit biedt een referentiepunt wanneer we een specifiek land willen vergelijken met andere landen of willen zien waar het land zich bevindt op de trendlijn. Bovenaan zie je drie knoppen die gebruikt kunnen worden om tussen tabbladen te wisselen.

### Road quality

![](/screenshots/road_quality.png)

### Alcohol

![](/screenshots/alcohol.png)

### Fines

![](/screenshots/fines.png)

## Data

Alle visualisatie werken op basis van volgende datasets:

- [International Traffic Safety Data and Analysis Group (IRTAD)](https://www.itf-oecd.org/IRTAD)
- [European Survey Research Association (ESRA)](https://app.powerbi.com/view?r=eyJrIjoiM2Y5MzEwYTMtMTE1Mi00MzNkLWFlOWQtNmU2ZWNiM2RhYzJlIiwidCI6IjlkMWIxYjIyLWE5ZTAtNDg1Mi1hMTEwLWZlYzRmZDc1N2M2ZSIsImMiOjh9&pageName=ReportSection9fbd3f40b24badccab99)
- [World Health Organization (WHO)](https://www.who.int/publications/i/item/9789241565684)
- [World Economic Forum (WEF)](https://www.theglobaleconomy.com/rankings/roads_quality/Europe/)
- [SpeedingEurope](https://speedingeurope.com/)




