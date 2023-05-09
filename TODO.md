# Algemene Feedback 08/05

## Kaart
op kaart proberen twee elementen tegelijk weer te geven
- aantal ongevallen en strengheid maatregelen
- welke visuele elementen hiervoor gebruiken?

hover linking in twee richtingen met kaart
- van kaart naar andere visualisaties
- van andere visualisaties naar kaart

goed nadenken welke kleuren tonen op de kaart
- een heatmap, deze updaten bij selectie
- kaart meer laten doen dan gewoon techniek voor selectie
- best geen categorische kleuren, steeds een betekenisvolle heatmap

---

## Tabbladen

consistentie over tabbladen heen
- consistent houden over de tabbladen heen
- altijd heatmap van aantal ongevallen laten zien
- enkel aanpassen als iets hoveren / selecteren

beter toch nog werken met tabbladen
- logischer voor linking
- zeker goed uitgewerkt
	- visualisatie
	- linking
	- goede context

---

## Algemeen
20% op context en duidelijkheid

opletten met welke richting we de causaliteiten leggen

boetes
- heel interessant inzicht

best nog een aantal keren laten itereren over inzichten

proberen te focussen op één of twee inzichten
- de duidelijkste
- linking afwerken
- echt goed uitwerken

---

## Charts


### 1) Boxplots

weten niet zeker ofdat boxplots zo goed werken
- valt te zien wat we willen zeggen

[I’ve Stopped Using Box Plots. Should You? | Nightingale (nightingaledvs.com)](https://nightingaledvs.com/ive-stopped-using-box-plots-should-you/#:~:text=The%20design%20of%20traditional%20box,read%20and%20prone%20to%20misinterpretation.)
-> zien ofdat we boxplots echt nodig hebben

### 2) Pie charts

liever stacked barchart dan piechart
- pakt veel minder plaats in

### 3) Scatter plot
zeker trendlijn toevoegen

---

## Thema's

### 1) Alcohol

bij alcohol
- misschien beter dropdown/extra tabblad/toggle button dan twee kolommen
- eindgebruiker is toch expert, dat ze moeten zoeken voor inzichten is niet zo'n groot probleem
=> enkel dingen samen tonen die ook echt samen horen

- [ ] toggle iedereen / ouder / jonger
- [ ] inzicht hoe minder mag mogen gedronken, hoe minder er mensen boven de limiet op de baan gaan

kaart
- [ ] geselecteerd land anders aanduiden (omtrek / arcering) -> kunnen zo heatmap blijven tonen
- grenzen herkleuren gaat niet goed lukken
  - probleem bij kleine landen die worden omringd door landen van andere categorie

### 2) Controles
- [ ] omgekeerde richting van causaliteit
- [ ] dit leek voor hun toch minder interessant

### 3) Weginvestering
- delen door opp land / aantal inwoners
=> boetes en wegkwaliteit vonden ze het meest interessant

# Vragen
- backend 
	- enkel nodig voor als met API werken, niet nodig voor csv
- omtrek landen
	- kleuren van pie charts niet overbrengen
	- promille heatmap tonen wel interessant
	- toggle tussen beiden
	- (gewoon niet categoriekleuren)
- bij best linking doen / updaten van andere grafieken bij verandering variabele geselecteerde land
	- werken met filter functie
	- database niet aanpassen
	- zorgen dat we op dezelfde array blijven werken, globale tussen verschillende visualisaties


# TODO's

## 1) Layout / opmaak [? voor later]
- [ ] algemene pagina layout
- [ ] consistentie over tabbladen heen

## 2) Chart update [Tommy + help rest]
- [ ] uitzoeken hoe we best grafieken doen updaten wanneer er een selectie plaatsvind
- [ ] ook linking tussen andere grafieken (naast enkel kaart)

## 3) Charts
### 1) scatter plots [Damos]
- [ ] trendlijnen in scatterplots
### 2) boxplots [Thomas]
- [ ] boxplots wegwerken (zie website)
- [ ] nog steeds trendlijn laten zien
### 3) map [Tommy]
- [ ] link scatterplot - map
- [ ] obv geselecteerd land, een redraw functie oproepen voor andere grafieken
### 4) piechart [Damos]
- [ ] omzetten naar stacked bar chart

## 4) Tabbladen

### 1) weginfrastructuur [Kobe]
- [ ] tabblad toevoegen
- [ ] delen door opp land / aantal inwoners (problemen met GDP)?

### 2) Alcohol [Damos]
- [ ] maar één inzicht per keer laten zien, tussen kunnen switchen

### 3) boetes snelheid
- [ ] toevoegen tabblad boetes snelheid
- boetes te snel rijden sterkste verband op snelweg
- hogere boetes, minder ongevallen

### 4) max snelheid
- [ ] uitzoeken of hier inzichten in zijn



