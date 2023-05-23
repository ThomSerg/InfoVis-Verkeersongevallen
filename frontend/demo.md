# Demo 

Voorbereiding flow van de presentatie:
- wat moeten we tonen
- wat moeten we zeggen (gelinkt aan de leerstof, dezignkeuzes, inzichten)
- wat is de meeste efficiente volgorde om binnen 6' te blijven

verwachte delen:
- Hoe is onze visualisatie opgebouwd?
- Welke interactiemogelijkheden zijn er?
- Welke designkeuzes maakten we?
- Welke inzichten onthult onze visualisatie?

kunnen deze niet in apparte secties behandelen door tijdsgebrek:
- geen tijd om meermaals door interface te gaan
- zullen alle 4 tegelijk moeten bespreken op een natuurlijk en niet chaotische manier

legende:
- :point_right: demo
- :sparkles: design keuze
- :bulb: verworven inzichten

---

### Achtergrond

:point_right: [Op homepagina blijven]

doel: 
- zicht op verkeersveiligheid vanuit verschillende facetten 
    - investering (weginfrastructuur)
    - sensibilisering (alcoholconsumptie)
    - beleid (alcohol, snelheidsboetes)

- willen achterhalen waar we best verandering in brengen
    - welk facet
    - vergelijken met buurlanden om te voorspellen wat hier het effect van zou zijn
    - inzicht in de relaties van verschillende metrieken
    
- op basis hiervan dashboard gestructureerd
    - tabblad per facet (invloed van elk individueel onderzoeken, meerdere visualisaties per) :point_right: [wijzen naar de knoppen]
    - veel grafieken die relaties leggen tussen metrieken + linking over grafieken heen :point_right: [wijzen naar grafieken]
    - elk facet heeft zijn eigen visualisaties die hier het beste bij passen, het meeste inzicht geven
        - meerdere visualisaties getest, beland op diegenen die volgens ons (en theorie / literatuur) het beste werken

doelpubliek: 
- beleidsmakers
    - welke beslissingen moeten gemaakt worden zijn niet voorgekauwd
    - expert moet zelf verkennen voor zijn land tov andere landen
    - grafieken zijn wel duidelijk gestructureerd en geven in één oogoplag inzicht in invloeden van metrieken
design:
- simplistisch :sparkles: hoge data-ink ratio

interactie:
- het is een exploratief dashboard voor experts, om beleidsbeslissingen te maken
- erg van belang om landen te kunnen selecteren, vergelijken over meerdere grafieken heen, inzichten verwerven
- voorzien zo veel mogelijk linking om interactie tussen verschillende metrieken te onderzoeken

---

### Algemeen

:point_right: [homepagina in meer detail overlopen]

- tabblad knoppen:
    - switchen tussen facetten
- map:
	- om de cijfers te kunnen contextualiseren is er een kaart voorzien
	- helpt om landen geografisch te kunnen situatiseren, specifieke buurlanden terug te vinden
		- inzichten te verwerven in verschillen tussen landen obv geografische ligging
	- toont steeds de ongevallencijfers, het metriek dat een beleidsmaker zou willen verlagen

    :point_right: [interactiviteit map demonstreren]
    - kan in elke grafiek over een land hoveren en direct zien waar deze zich positioneerd in de andere grafieken
    - bij hoveren wordt er ook telkens wat extra informatie getoond ahv type grafiek (detail on demand)
    - map toont land, met een lijn in de legende om het ongevalcijfer exacter te kunnen contextualiseren binnen europa
        - :sparkles:  heatmap om snel een overzicht te krijgen over heel Europa, geografische relaties te achterhalen
        - :sparkles:  kleur densiteit is één van de minst accurate technieken voor het interpreteren van geëncodeerde kwantitatieve data
        - :sparkles:  legende voor accuratere interpretatie via positionele encoding


    :point_right: [rest van grafieken op homepagina overlopen]
	- scatter plots tonen het punt overeenkostig met dat land (als het land data heeft voor die grafiek)
	- informatie sectie toont algemene informatie over land
        nuttige info waar geen visualisatie voor is

    :sparkles: consistente kleuren, enkel als data aan elkaar gelinkt is (hover, selectie)

    - om landen te kunnen vergelijken kunnen op één klikken om deze geselecteerd te houden
    :point_right: [demonstreer klikken en landen vergelijken]

    :sparkles: select/focus functionaliteit met sterke linking

---

### Road quality

:point_right: [road quality topic overlopen]

- zoom:
    - in de scatterplots wordt standaard de data getoond met assen startende op 0
    - willen geen vertekend beeld geven, beter contextualiseren
    - om toch nog beter zicht te krijgen op de nuances, kunnen zoomen
- scatterplots
    - :point_right: [plots overlopen en uitleggen]
    - :bulb: inzichten overlopen

---

### Alcohol

:point_right: [alcohol topic overlopen]
- :sparkles: gradatie van color saturation om ordinal order aan te tonen (promille)
- korte uitleg stacked bar chart 
- kunnen bij alcohol tabblad zelfs meerdere landen selecteren die gelijk beleid hebben rond alcohol consumptie :point_right: [meerdere landen selecteren]
- uitleg werking violin plot 
    - willen zowel individuele landen als distributie aantonen
    - :sparkles: viool + scatter ipv boxplot
        - boxplots zijn lastig te interpreteren omdat ze met kwantielen werken
        - verliezen onmiddelijk zicht over distributie, op de inzichten
        - scatter om individuele landen nog te zien
        - violin om snel zicht over distributie te krijgen
    - bij hover over x-ticks krijgen info over distributie :point_right: [hover tonen]
- :bulb: inzichten overlopen

:point_right: [switchen naar young drivers]
- :bulb: inzichten overlopen (focus op impact van maatregelen)

---

### Fines

:point_right: [fine topic overlopen]
- :bulb: inzichten overlopen

