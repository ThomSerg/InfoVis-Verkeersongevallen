# InfoVis Verkeersongevallen

### Feedback
- opletten met kaart, misschien dat er niet zo veel ruimtelijke inzichten kunnen zijn
	- is het wel interesant om regios met elkaar te vergelijken
- dataset al vaker gebruikt door eerdere studenten
	- hebben problemen gehad met wat nu van inzichten
	- zeker interessant op proberen te mengen met andere datastes om nieuwe inzichten te bekomen
	- zeker eens kijken naar meer recente problemen -> elektrische fietsen
- zeker interessant om naar de tijd te kijken, moment van de week, ....
- met relatieve data werken
- heatmap voor kalender is zeker iets nieuws voor prof
- zeker goed meer gedetaileerdere grafieken aan de zijkant (is een feedback die de prof vaak geeft)
- eerst goed nadenken wie dat de doelgroep is
	- visualisatie wordt misschien te uitgebreid voor een gewone gebruiker, eerder voor data scientist
- wat zijn de inzichten die we willen tonen
	- opletten dat we niet te veel focussen op een mooie vis en de inzichten verwaarlozen
- drag-and-drop is tijdverspilling (beter aan vis werken)
- link met snelheidszones (vond prof heel goed idee)
	- want in media vaak voorstel max snelheid verlagen
- spelen met kracht van linking en hovering
- vergelijking regios
	- zeker goed extra grafieken naast hoofd vis om vergelijkingen inzicht te geven

#### 17/04
proberen om patronen in data te linken met artikels, ... -> verklaren waarom patroon zien

toenamen aantal ongevallen 2021
- reden achter deze toename onderzoeken, wat zijn de factoren
- welke factoren zijn mee veranderd

hypothese invloed corona
- wanneer gingen de nachtclubs terug open
- waar ligt de piek in de data en waarom
wat is er veranderd, wanneer is het veranderd

-> proberen een soort contextualisering van de data te maken, moeten geen harde links zijn

proberen wat ideeen op te doen uit voorbeeldvisualisaties

proberen een visualisatie te maken rond een uitspraak in het nieuws (vb bepaalde stijding verklaren)

interessanter om een héél specifieke doelgroep te hebben, duidelijk wat ze met de data moeten doen

moeten niet persé véél visualisaties zijn
- twee sterk inzichtelijke en met elkaar gelinkte visualisaties is ook goed (KISS)

doelgroep
- advies aan overheden
- welke campagnes voeren?
-> starten met de inzichten, hier een visualisatie rond maken


presentatie
- idee
- inspiratie
- inzichten met prototype
- ruwe grafieken
- hoe afgeweken van origineel ontwerp

verslag
- redenering laten zien van waar de design keuzes zijn gekomen
- laten zien welke afwegingen zijn gemaakt
- iteratief designproces laten zien

### Datasets

- Verkeersslachtoffers [2005-2021]
    - interessante features
        - dag van de week
        - vervoersmiddel (met fiets)
        - type weg
        - moment van de dag
        - leeftijd
        - geslacht
        - gemeente
    - links: 
        - https://statbel.fgov.be/nl/open-data/verkeersslachtoffers-2021
        - ...
        - https://statbel.fgov.be/nl/open-data/verkeersslachtoffers-2005

- Verkeersongevallen [2005-2021]
    - interessante features:
        - uur, datum en dag van de week
        - type botsing
        - belichting
        - type weg
        - gemeente
    - links:
        - https://statbel.fgov.be/nl/open-data/verkeersslachtoffers-2021
        - ...
        - https://statbel.fgov.be/nl/open-data/verkeersslachtoffers-2005

- Verkeersongevallen per type voertuig [2017-2021]
    - opmerkingen:
        - erg gefocust op het motorvoertuig
    - interessante features:
        - dag/nacht
        - week/weekend
        - maand
        - type voertuig (A & B)
        - leeftijd voertuig
        - brandstoftype
        - aantal cilinders
        - cc
        - persoonlijke/bedrijfswagen
        - provinsie
        - weer
        - wegconditie
        - belichting
        - wegtype
        - classificering slachtoffers
        - type aanrijding

    - links:
        - https://statbel.fgov.be/nl/open-data/verkeersongevallen-type-voertuig-2021
        - ...
        - https://statbel.fgov.be/nl/open-data/verkeersongevallen-type-voertuig-2017

- Verkeersongevallen samenvattend [1955-2021]
    - opmerkingen:
        - is zeer samenvattend, verschillende geaggregeerde vieuws, geen toegang tot echte data
    - interessante features
        - sinds 1955
        - per provincie
        - week/weekend
        - overdag/'s nachts
        - per leeftijd
        - per type weggebruiker
    - links:
        - https://statbel.fgov.be/nl/themas/mobiliteit/verkeer/verkeersongevallen#figures (onderaan)

- Fietsongevallen Brugge [2013-2018]
    - interessante features
        - datum en uur
        - straat en huisnummer of exacte coordinaten
        - dag/nacht
    - links:
        - https://www.brugge.be/open-data-mobiliteit#fietsongev13-15
        - https://www.brugge.be/open-data-mobiliteit#fietsongev14-16
        - https://www.brugge.be/open-data-mobiliteit#fietsongev17-18
    - bijhorende datasets:
        - snelheidszones
            - https://www.brugge.be/open-data-mobiliteit#zone30
            - https://www.brugge.be/open-data-mobiliteit#zone70
            - https://www.brugge.be/open-data-mobiliteit#zone90
        - verkeersongevallen:
            - https://www.brugge.be/open-data-mobiliteit#verkeersongevallen-13-15
            - https://www.brugge.be/open-data-mobiliteit#verkeersongevallen-14-16
            - https://www.brugge.be/open-data-mobiliteit#verkeersongevallen-17-18

- Fietstellingen [2019-2023]
    - interessante features
        - gemeentes / steden
        - exact moment van het passeren van een fietser voorbij telpunt 
        - richting van de fietser
    - links:
        - https://opendata.apps.mow.vlaanderen.be/fietstellingen/index.html  

- Eurostat verkeersongevallen
    - links:
        - https://ec.europa.eu/eurostat/web/main/search/-/search/estatsearchportlet_WAR_estatsearchportlet_INSTANCE_bHVzuvn1SZ8J?p_auth=BZhpIR3O&text=Persons+killed+in+road+accidents+by+type+of+road+%28source%3A+CARE%29&_estatsearchportlet_WAR_estatsearchportlet_INSTANCE_bHVzuvn1SZ8J_collection=&_estatsearchportlet_WAR_estatsearchportlet_INSTANCE_bHVzuvn1SZ8J_theme=

- ESRA (E-Survey of Road users' Attitudes)
    - links:
        - pdf report: https://www.vias.be/publications/ESRA%202%20A%20global%20look%20at%20road%20safety/A%20global%20look%20at%20road%20safety%20-%20Synthesis%20from%20the%20ESRA2%20survey%20in%2048%20countries.pdf
        - Vias institute: https://www.vias.be/en/research/networks/international-networks/#question-2
        - Belgium in perspective: https://www.vias.be/publications/Belgi%C3%AB%20in%20Europees%20perspectief%20-%20Een%20systematische%20vergelijking%20van%20indicatoren%20voor%20verkeersveiligheid/Belgium_in_a_european_perspective.pdf
        - interactive dashboard: https://app.powerbi.com/view?r=eyJrIjoiM2Y5MzEwYTMtMTE1Mi00MzNkLWFlOWQtNmU2ZWNiM2RhYzJlIiwidCI6IjlkMWIxYjIyLWE5ZTAtNDg1Mi1hMTEwLWZlYzRmZDc1N2M2ZSIsImMiOjh9&pageName=ReportSection9fbd3f40b24badccab99
        - other publications: https://www.esranet.eu/en/publications/#europe


- FERSI road safety information
    collectie aan bronnen, websites voor europese road safety
    - links: 
        - https://fersi.org/road-safety-technical-information/