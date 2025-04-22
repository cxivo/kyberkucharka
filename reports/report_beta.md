# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka
- Link na verejnú inštanciu projektu: https://kyberkucharka.onrender.com/

# Info o reportovanej verzii:
- Tag: beta    <!-- Uviesť beta_cisloSubverzie, ak ste robili v bete zmeny pred termínom odovzdania -->

# Info k testovaniu:     
Pre prístup ako bežný používateľ možno použiť účet `cimrman` s heslom `jj`, pre administrátorský účet využite tradičné a extra bezpečné meno = `admin`, heslo = `nbusr123`.

# Postup, ako rozbehať vývojové prostredie 
Popísané v `readme.md` v koreni repozitára.

# Stav implementácie:
Implementované:
- prihlasovanie/odhlasovanie/tvorba/mazanie účtov
- čítanie receptov
- úprava, tvorba, forkovanie a mazanie receptov
- tvorba, overovanie a mazanie ingrediencií
- užívateľská stránka
- hlavná idea štýlovania
Treba implementovať:
- konverzia jednotiek
- tagy receptov a ingrediencií
- vyhľadávanie receptu podľa názvu, tagov alebo ingrediencií

# Časový plán za zvyšné dni semestra:
- týždeň 10: Tagy (ak nebudú vyžadovať zmeny v databáze, ktoré by pokazili deploynutú verziu, ktorej sa vraj nemám počas prezentovania bety dotýkať) a vyhľadávanie, zvyšná administrátorská funkcionalita
- týždeň 11: Poriadna konverzia jednotiek, možno lepšie overovanie dát od užívateľa
- týždeň 12: Dokončovanie, pridávanie reálnych receptov a reálnych mier
- koľko máme týždňov vôbec? lebo to asi bude všetko

# Problémy:
Hlavným problémom je, že síce mi robenie tejto stránky ide (a som extrémne skromná), tak mi to stále zaberá neuveriteľne veľa času. Veľa z toho času padlo na štýlovanie, ktoré nie je nejak potrebné, ale podľa mňa robí stránku peknou a takou... mojou. To by som síce vedela aj pomocou Bootstrapu alebo čoho, ale nebolo by to tak pekné.

Inak povedané, je toho aj v takto neveľko-vyzerajúcom projekte vcelku dosť. 

Ďalší problém je, že sa neviem zbaviť pocitu, že stránka vyzerá prázdo. Snáď pridanie viacerých receptov a vylepšenej hlavnej stránky trochu odstráni tento pocit.

Takým problémom z kuchtenia je, že kopa ľudí sa rozhodla merať na lyžičky a lyžice sypké veci, ako múku, cukor atď. Naozaj neviem, ako najlepšie implementovať konverziu týchto jednotiek - ak by som to chcela presne a inak pre každú ingredienciu, tak by to vyžadovalo poznať tvar štandardnej lyžice a sypný uhol surovín, ALEBO, podobne nepríjemne, vyžadovať od užívateľa, nech pri vytváraní ingrediencie odváži jednu lyžicu tej hmoty... Asi najlepšie riešenie je zafixovať jednu lyžicu na cirka 15g, mooožno pridať k ingredienciám povíčko "skupenstvo" - pri tekutom prepočíta počet lyžíc z hmnotnosti a hustoty, pri pevných hodí pevne číslo 15g. Popravde, ak niekto meria na lyžice, asi mu nezáleží až tak na presnosti.

Posledným problémom čo uvediem je feature creep, vďaka ktorému furt niečo chcem pridať (ale ovládam sa).
