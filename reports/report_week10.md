# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka

# Info o reportovanej verzii:  
- Tag: week10
- Obdobie: 10. týždeň, 21.4.2025 - 27.4.2025

# Plán: 
Tentokrát je plán jasný - príprava na beta verziu, potom tagy a vyhľadávanie. 

# Vykonaná práca:
Väčšina prvých commitov bola príprava na beta verziu:
- `add automatic admin rights grant upon database creation` - používateľ "admin" dostane pri tvorbe databázy adminovské práva (inak by bol človek klonujúci tento projekt nútený hrabať sa v databáze a tak si dať admin práva)
- `put table init code into its own file` - teraz je inicializácia databázy spravená pomocou vlastného `npm` príkazu (čo som ani nevedela, že ide, až doteraz), takže človek klonujúci si projekt si vie pridať dummy data takto ľahko
- niekoľko commitov s readme.md, kde boli pridané inštrukcie potrebné k rozbehaniu projektu
- `fix bug where user could not close login window on /login` - self-explanatory
- `improve error handling for fetching and sending` - skoro self-explanatory, len som zabudla dodať že hovorím o posielaní receptov - napríklad teraz ak človeku vypršalo prihlásanie a prihlási sa, tak sa recept automaticky odošle
- `add user deletion` - admin môže zmazať účty
- `add users list page for admins` - zoznam všetkých užívateľov - stránka hlavne pre admina; TODO - možno nedovoliť hocikomu čítať túto stránku?
- `fix incorrect background size` - tento bug bol zistený, keď som si po niekoľkých týždňoch zapla Windows a skúsila pozrieť ako stránka vyzerá a vyzerala zle (čierny pruh vpravo)
- `update about page` - pridané info aj z `readme.md`, plus pekné zošitové pozadie
- `beta report` - self-explanatory (na tejto verzii by mal byť do konca beta reportov hosting)
- `add user-addable recipe tags` - opäť mierne prerobená databáza pre tagy, po novom môže užívateľ pridať k svojmu receptu tagy z fixného zoznamu a vidieť tagy na všetkých receptoch
- `fix bug when recipe with no tags could not be forked` - lebo som zabudla skontrolovať či sa jedna premenná nerovná `undefined` 🙃
- `merge recipeCards and forkCards` - po zistení, že ich `.tsx` súbory boli skoro rovnaké až na CSS triedy, padlo rozhodnutie spojiť ich do jedného súboru pre jednoduchosť budúcej úpravy
- `add search page` - pridaná stránka vyhľadávania, kde je možné vyhľadávať podľa názvu receptu a tagov, ktoré recept má a nemá. Taktiež funkcie komunikácie so serverom ktoré boli na jedno kopyto boli presunuté do jedného súboru - nemusím tak riešiť znova a znova to isté.
- `allow admins to edit any recipe` - vyriešené dvoma ORmi
- `improve recipe editing fields` - odstránená tá divná mechanika, kde pri tvorbe receptu ak je políčko prázdne, tak sa to nahradí nejakým placeholder textom, čo spôsobovalo problémy. Placeholder atribút pri contenteditable nie je, ale vyriešilo sa to nakoniec cez CSS. Contenteditable zostali, lebo majú vlastnosti, ktorých sa nechcem vzdať (automatická zmena veľkosti a tvaru).
- `add tooltips` - pri forkoch a dlhých názvoch (teda, všetkých názvoch) receptov sa zobrazí tooltip, aby užívateľ vedel, o čo ide
- `fix recipe title alignment` - toto sa zas nedá vysvetliť iným slovom než "perfekcionizmus"
- `remove refresh need when logging in and out` - nakoniec sa vraciam k React-cookie, ktoré som vyhodila - vysvitlo, že tá knižnica nemala tú chybu, z ktorej som ju podozrievala ale za tie problémy mohli nejaké moje rozšírenia Chromu, ktoré ale z nejakého dôvodu nastali PRESNE iba v čase používania tejto knižnice... anyway, už je nie je potrebné refreshovať stránku pri prihlásení/odhlásení.
- `add tablespoons and cups; improve ingredient editing window` - Prerobené okno úpravy ingrediencií pre väčšiu flexibilitu a možnosť použitia nových jednotiek - lyžíc a šálok.
- `add rounding amounts` - zaokrúhľovanie na najviac 2 desatinné miesta pri čítaní receptu (bude využité len naozaj málokedy, keď niekto upraví napr. hustotu ingrediencie)
- `add tooltip for spoons` - tip, čo napísať do políčka ak niekto nevie (lebo predpokladám, že užívateľ fakt nebude vedieť čo tam dať)

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Plán som doržala do poslednej bodky, plus pridala pár práv pre adminov, čím ich mám asi vyriešených.
Do plánu na budúci týždeň som si dala "vyriešiť konečne lyžice a lyžičky", ale taký chrobák v hlave to bol, že som to urobila ešte tento týždeň.

# Plán na ďalší týždeň:
Poriadna konverzia jednotiek (dať možnosť autorom aj čitateľom meniť jednotky), možno lepšie overovanie dát od užívateľa. Snáď aj rozšírenie vyhľadávania o ingrediencie.

# Problémy:
Strašne dlho všetko trvá, predsa len je toto možno veľký projekt?? Nejaké problémy sú aj s CSSkom pre malé obrazovky, ale najväčší problém objavil kamarát, ktorému sa nepodarilo na deploynutej verzii vytvoriť recept... a netuším, kde je problém.

Problém viac k téme je zas, že kamarát veľmi chcel, aby som pridala jednotku "štipka", čo na jednu stranu znamená, že recepty so štipkou soli nebudú musiteť vymýšľať veci ako "1g soli", na druhú stranu keby chcem možnosť škálovania receptu na viac porcií, tak by bolo nemožné spočítať požadované množstvo soli... 

Plus už asi 2 týždne rozmýšľam, ako sakra riešiť lyžičky a lyžice, lebo s nimi sa meria otrasne.

# Zmeny v špecifikácii:
Tagy - vraciam sa späť k špecifikácii, tagy budú môcť pridávať používatelia na recepty. Tagy na ingrediencie a automatické počítanie tagov som sa rozhodla vynechať z finálnej verzie, budú možno pridané inokedy, vo voľnom čase, najskôr v lete. Vyžadovalo by si to totiž veľmi silnú spoluprácu s používateľom vytvárajúcim nové ingrediencie - že bude dôsledne pridávať všetky relevantné tagy. Napríklad keby niekto pridáva "fľašu utopencov" ako ingredienciu, tak možno mu nenapadne hrabať sa v tagoch a označiť to ako "mäsitý výrobok" a potom by výsledný recept mal vypočítaný tag "vegetariánsky", čo by bola jasná blbosť. 

Drobnejšia zmena je zoznam jednotiek - pribudli nové jednotky, "lyžice" (nemýliť si s lyžičkami) a "šálky".
