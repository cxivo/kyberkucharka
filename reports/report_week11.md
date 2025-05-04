# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka

# Info o reportovanej verzii:  
- Tag: week11
- Obdobie: 11. týždeň, 28.4.2025 - 4.5.2025

# Plán: 
Poriadna konverzia jednotiek (dať možnosť autorom aj čitateľom meniť jednotky), možno lepšie overovanie dát od užívateľa. Snáď aj rozšírenie vyhľadávania o ingrediencie.

# Vykonaná práca:
Mrte veľa som toho porobila, väčšinou polishing a posledné detaily. Mierne ma hnevá že najdôležitejšie fičúry stránky sa mi podarilo pridať za asi pol hodinu.  Stránka je vlastne aj hotová.
- `fix false "this is a fork of" tooltips` - odstránený tooltip zo zlého miesta
- `enable editors to use all available units for an ingredient when editing` - po novom je možné pri tvorbe receptu použiť viac typov jednotiek!
- `enable readers to view ingredients in all available units` - aj čitatelia si vedia zmeniť jednotky! (jedno z hlavných lákadiel stránky)
- `modify displaying of usabe [sic] ingredients` - v preklade, ak viem merať niečo len v gramoch tak ani nedám select (načo, na jednu možnosť)
- `add ability to change type of units used in a recipe for a reader` - aby nemusel čitateľ po jednom prepínať jednotiek, máme aj prednastavené možnosti, ako prepnúť všetky jednotky v recepte (napr. hrnčekový recept)
- `fix incorrect teaspoon calculation` - zle som vyriešila rovnicu 😔
- `fix nav alignment` - odstránené divné ďúry na bokoch navigácie
- `fix React errors (keys in maps, using value in select)` - len som poslúchla čo povedal React v konzole
- `fix edit page not changing when selecting Create new in nav` - ako zreplikovať - keď užívateľ dal upraviť recept a potom si povedal "a ja vlastne chcem spraviť nový" a klikol na "vytvor recept", tak to pôvodne nechalo dáta pôvodného receptu na obrazovke (čo nechceme, like, na to je forkovanie)
- `change recipe sidebar to display similar recipes` - predtým boli na boku pri recepte len všetky recepty, po novom sú to recepty s najpodobnejšími tagmi
- `change searchbar color, add autofocus` - kozmetika
- `add cookie popup` - doslova len uvítací shitpost
- `fix recipe covering edit buttons on phone screens` - nejak som to predtým prehliadla
- `fix ingredient creation windows on mobile` - zmenšené písmo atď.
- `modify ingredient creation when editing/creating recipes` - na podnet kamaráta, ak si užívateľ vytvorí ingredienciu, vie ju po novom aj použiť na viacerých miestach v recepte + vie ju aj upraviť (je viditeľne iná a klikateľná). Okrem toho som aj omylom opravila teoretický bug, ktorý by znamenal že ak užívateľ A vytvoril ingredienciu vo svojom recepte, užívateľ B vytvoril ingredienciu s rovnakým názvom a odoslal recept ako prvý, užívateľ A by pri odoslaní svojho receptu dostal chybu a celý recept by sa mu zmazal. Toto pochybujem že by prakticky nastalo, ale je dobré že je to už nemožné.
- `style registration page` - pridaná na zošit, ako About page
- `add email column for users (not currently accessible)` - email nebude získateľný inak než z databázy, ale presne to aj chcem - chcem len zálohu na prípadný kontakt užívateľov v budúcnosti
- `align search inputs` - hrala som sa s CSS grid
- `add tag admin page` - zoznam tagov a možnosť pridať tagy pre adminov (aby som nemusela robiť stále sql dotazy priamo do databázy)
- `add usage frequency of tags` - koľko krát je tag použitý
- `fix two scrollbars appearing on a recipe` - oprava omylom zmazaného CSS pravidla
- `improve main page` - zobrazujú sa nielen všetky recepty, ale aj najnovšie a recepty z vybraných tagov
- `add search with required and unwanted ingredients` - pridaná možnosť vylúčiť/vynútiť ingredienciu v recepte vo vyhľadávaní
- `add ability to search recipes which only use ingredients from a set` - v podstate Supercook z Wishu
- `modify ingredient search to include alternative ingredient names` - myslela som, že už som to dávno pridala (keďže to bol hlavný dôvod alternatívnych mien), ale viditeľne nie
- `remove tables for ingredient tags` - neplánujem ich mať vo finálnej verzii, tak ich nepotrebujem
- `fix units not changing in a select when editing used ingredient` - preklad - človek klikne na select, vyberie možnosť a ono to niečo urobí, ale nezobrazí nič
- `fix duplicate recipes returned for "related recipes"` - omylom som v SQL groupovala čo som nemala
- `fix recipe card description being cutoff` - CSS tweaks
- `add licence` - pridaná licencia AGPL, ktorú mi odporúčil kamarát 
- `update about page and readme` - pridané info práve o tej licencii
- `fix ingredients changing order in recipe` - predtým stránka náhodne preusporiadala ingrediencie v recepte, čo bolo extrémne otravné - išlo by to opraviť aj postupným pridávaním ingrediecnií do databázy, ale to by bolo pomalé a škaredé, tak som pridala stĺpec do databázy hovoriaci o poradí použitej ingrediencie.
- `update table for used_ingredient` - zabudla som v minulom commite pridať aj sem info o zmene v DB
- `add autofocus for editable ingredient` - toto má za následok, že po pridaní ingrediencie do receptu to automaticky focusne PRESNE na správny input a človek nemusí hýbať myškou
- `soft disable sending recipes with empty title` - "soft" lebo je to len client-side
- `add "forked from this one" column for recipes` - okrem "podobných receptov" sa teraz najprv zobrazia recepty ktoré tento recept forkujú (ak nejaké sú)
- `display teaspoons instead of grams for very small amounts` - opäť na žiadosť kamaráta, ktorému liezlo na nervy že mu 2 lyžičky cukru zobrazilo ako 12g a že "kto to bude merať"... tak po novom sú moc malé hmotnosti zobrazené v lyžičkách (ak sa tak dá ingrediencia merať)
- `add informative pages` - pridané statické stránky s informáciami o pečení
- `add recipe scaling` - pridaný input, do ktorého vie čitateľ dať násobok a všetky ingrediencie sa preškálujú. Taktiež je zobrazená výsledná hmotnosť receptu.
- `add mass tooltip` - pridaný tooltip že čo reprezentuje tá hmotnosť
- `round amount in editing ingredient` - aby sa nezobrazovalo niečo ako "0.6666666667 lyžičiek" ani pri editácii
- `fix incorrect word form` - zobrazila sa nesprávna číslovka ak bolo niečoho "0.9999999998", lebo to nie je jedna, ale inde sa to zaokrúhlilo ako 1 a potom bolo v recepte napísané "1 lyžičiek" a bolo to škaredé

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Plán bol splnený okrem overovania dát od užívateľa - to mi prišlo veľmi náročné a nemalo by to pre bežného používateľa viditeľný výsledok. Síce to znamená, že môže byť ľahšie pokaziť túto apku alebo aspoň vložiť extrémne nezmyselné hodnoty, ale predpokladám, že bežný používateľ nebude robiť záťažové testy. Nemám až takú dôveru vo svoj backend, ale tak zatiaľ mi funguje okej.

Rozhodla som sa dorobiť všetky "drobnosti" - fičúry, ktoré nezaberú ani toľko času a sú rýchlo hotové. V podstate som pozbierala ovocie z celého vývoja apky doteraz. Preto toľko commitov.

# Plán na ďalší týždeň:
Odovzdať finálnu verziu a ideálne predtým ešte spraviť drobné kozmetické úpravy.

# Problémy:
Celý semester som si myslela že "tento týždeň budem robiť na stránke viac, aby som ku koncu mala pokoj" a vysvitlo, že venovanie skoro celého môjho času projektu bolo tak... akurát? Presne stíham presne to, čo som chcela, aj čo som napísla, aj svoje realistickejšie očakávania od seba. 

Takže hlavný problém je moja neschopnosť odhadovať koľko času niečo zaberie, lebo síce je tento predmet sranda, ale nemôžem predsa skoro celý školský čas venovať len jemu.

# Zmeny v špecifikácii:
Skúsim zrekapitulovať všetky:
- odstránený Tailwind, omylom som sa stala pokročilým v CSS
- množstvá ingrediencií sú na rozdiel od modelu v špecifikácii ukladané v gramoch
- chcela som zmeniť špecifikáciu na tagy, ale vysvitlo že by to nefungovalo (alebo minimálne bolo nepoužiteľne nepraktické), tak som sa vrátila späť k pôvodnému plánu tagov iba pre recepty
- od užívateľov chcem aj mail, ktorý si len ukladám pre budúce potreby
- pridané jednotky "lyžice" a "lyžičky", čo je akože zmena voči špecifikácii, ale nikdy som tam vyslovene nepovedala aké jednotky tam budú takže to vlastne ani nebude taká zmena.

Iné veci zmienené v špecifikácii ktoré sú otázne:
- "filtrovať recepty napr. podľa vhodnosti pre vegánov" - technicky ak dajú autori tag "vegánsky", automatické to nie je
- "Možnosť vytvárania kolekcií receptov ani pridávanie komentárov či hodnotenia receptom nie sú v základných požiadavkách, hoci niektoré sa pokúsim pre zlepšenie aplikácie implementovať." - nuž, nemám to. Asi za týždeň by som to dala, ale nejdem sa náhliť. Ale nie je to súčasť základných požiadaviek, takže neva.
- "Mazanie ingrediencií bude automatické – všetky neoverené ingrediencie nepoužité v žiadnom recepte budú odstránené" - to nie je implementované, ale podľa mňa to nevadí - keby admin chce, tak vie jedným SQL príkazom zmazať všetky nepoužívané neoverené.
- "Hlavná stránka bude obsahovať Náhodne vybrané recepty s rôznymi tagmi" - teeechnicky sú tie recepty vybrané deterministicky a nie náhodne :D
- "Stránka vyhľadávanie bude obsahovať Tlačitko „hľadať“" - žiadne tlačitko, hľadanie je automatické, čo je podľa mňa ešte lepšie
- databázová položka Ingrediencie mala obsahovať info o alergénoch, ale to som zavrhla lebo som neverila užívateľom, že by to všetko vyplnili pri tvorbe ingrediencie správne
- časový plán bol popravde vytiahnutý z klobúku, robila som na stránke veci v úúúúplne inom poradí

Inak mám pocit, že som splnila všetko dôležité.
