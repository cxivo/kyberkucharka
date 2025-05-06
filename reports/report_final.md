# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka
- Link na verejnú inštanciu projektu: https://kyberkucharka.onrender.com/

# Info o reportovanej verzii:
- Tag: final    <!-- Uviesť final_cisloSubverzie, ak ste robili vo finálnej verzii zmeny pred termínom odovzdania -->

# Info k testovaniu:     
Pre prístup ako bežný používateľ odporúčam sa zaregistrovať, 
v prípade veľkej lenivosti alebo iných dôvodov možno použiť existujúci účet `cimrman` s heslom `jj`
alebo užívateľa `premium` s heslom `premium123`.

Pre administrátorský účet využite tradičné a extra bezpečné meno = `admin`, heslo = `nbusr123`.

# Postup, ako rozbehať vývojové prostredie 
Popísané v `readme.md` v koreni repozitára.

# Stav implementácie:
Implementované je temer všetko, čo bolo sľubované v špecifikáciách:
- prihlasovanie/odhlasovanie/tvorba/mazanie účtov
- čítanie receptov
- úprava, tvorba, forkovanie a mazanie receptov
- tvorba, overovanie, mazanie, úprava a vylistovanie ingrediencií
- užívateľská stránka
- hlavná stránka s výberom receptov
- konverzia jednotiek pri čítaní receptu
- tagy receptov
- vyhľadávanie receptu podľa názvu, tagov alebo ingrediencií
- administrátorské funkcie ako schopnosť editovať/mazať všetky recepty a ingrediencie, pridávať tagy

Sem uvediem čo najpodrobnejšie veci, ku ktorým by niekto mohol namietať že nie sú ako v špecifikácii:
- odstránený Tailwind, omylom som sa stala pokročilým v CSS
- množstvá ingrediencií sú na rozdiel od modelu v špecifikácii ukladané v gramoch
- chcela som zmeniť špecifikáciu na tagy, ale vysvitlo že by to nefungovalo (alebo minimálne bolo nepoužiteľne nepraktické), tak som sa vrátila späť k pôvodnému plánu tagov iba pre recepty
- od užívateľov chcem aj mail, ktorý si len ukladám pre budúce potreby
- pridané jednotky "lyžice" a "lyžičky", čo je akože zmena voči špecifikácii, ale nikdy som tam vyslovene nepovedala aké jednotky tam budú takže to vlastne ani nebude taká zmena.
- "filtrovať recepty napr. podľa vhodnosti pre vegánov" - technicky ak dajú autori tag "vegánsky", automatické to nie je
- "Možnosť vytvárania kolekcií receptov ani pridávanie komentárov či hodnotenia receptom nie sú v základných požiadavkách, hoci niektoré sa pokúsim pre zlepšenie aplikácie implementovať." - nuž, nemám to. Asi za týždeň by som to dala, ale nejdem sa náhliť. Ale nie je to súčasť základných požiadaviek, takže neva.
- "Mazanie ingrediencií bude automatické – všetky neoverené ingrediencie nepoužité v žiadnom recepte budú odstránené" - to nie je implementované, ale podľa mňa to nevadí - keby admin chce, tak vie jedným SQL príkazom zmazať všetky nepoužívané neoverené.
- "Hlavná stránka bude obsahovať Náhodne vybrané recepty s rôznymi tagmi" - teeechnicky sú tie recepty vybrané deterministicky a nie náhodne :D
- "Stránka vyhľadávanie bude obsahovať Tlačitko „hľadať“" - žiadne tlačitko, hľadanie je automatické, čo je podľa mňa ešte lepšie
- databázová položka Ingrediencie mala obsahovať info o alergénoch, ale to som zavrhla lebo som neverila užívateľom, že by to všetko vyplnili pri tvorbe ingrediencie správne
- časový plán bol popravde vytiahnutý z klobúku, robila som na stránke veci v úúúúplne inom poradí
- niektoré vzťahy v databáze ako "jeden alebo viac" nie sú vyžadované, je možné vytvoriť aj recept bez ingrediencií

Iné možné námietky:
- *textúry sú extrémne veľké!* - áááno, ale pri dnešných rýchlostiach pripojenia to nie je až taký problém.
- *na admin stránky ako zoznam ingrediencií sa dá dostať aj bez prihlásenia!* - Zoznam užívateľov som zabezpečila, zoznam ingrediencií v zásade nevadí že každý môže vidieť
- *Hlásenia o chybách sú škaredé!* - súhlasím, väčšinou nastávajú len ak užívateľ robí hlúposti alebo ak nejde databáza

Rozpracované nemám nič veľké, robila som posledné dni iba drobné zmeny.

A teraz naopak, čo nebolo slúbené ale doručila som:
- ✨**fancy**✨ štýlovanie stránky s realistickými textúrami
- vlastný písaný font (vhodný pre slovenčinu, češtinu, nemčinu, poľštinu a angličtinu, skoro aj esperanto)
- veľmi WYSIWYG editor receptov
- vyhľadávanie umožňuje vyhľadať aj podľa tagov a podľa "mám iba tieto ingrediencie, čo viem spraviť?"
- o niečo viac použiteľných jednotiek (dokonca aj premena z imperiálnej sústavy)
- skoro celá stránka funguje aj na mobilnom Chrome (len admin stránky sú mierne škaredšie)
- prémiová **Kyberkuchárka ±** - za jednorázovú platbu si môže užívateľ ~~užívať~~ *trpieť* aj imperiálne jednotky v receptoch! Neviem, kto by to chcel, ale môže to urobiť. Platbu beriem ako bolestné za to, že som musela robiť s imperiálnou sústavou.

# Retrospektíva:

Neviem ako často to sem niekto píše, ale keby na tomto projekte robím znova, možno by som mu nevenovala až toľko času. Veľmi sa mi páči aktuálny výsledok, som na
túto stránku viac hrdá než na svoju bakalárku, ale zabralo mi to skutočne veľa času. Dosť z toho bolo štýlovanie, lebo perfekcionizmus, dosť času zabralo len
pridávanie fičúr... asi webdev nejde až tak zrýchliť. Mala som tak menej času na všetko ostatné školské. Ale aspoň viem, že si viem predstaviť robiť v budúcnosti aj s webmi (škoda len, že práce v tejto oblasti je pomenej, keďže si všetci myslia že AI nás nahradí, hoci pochybujem, že by vedelo spraviť štýly ako ja).

Na stránke sa mi asi najviac páči celkové štýlovanie a vajb (ako by to nazvala dnešná generácia... a ja) - chcela som, aby stránka bola príjemná na používanie, tvárila sa jednoducho, až prosto, a pripomínala všetky tie náhodné zdrapy papierov, na ktoré si ľudia písali recepty a strkali ich do zakladačov či 30 rokov starých kuchárskych kníh, ktoré samé boli riadne šalátové vydanie. Ale som tiež rada zo systému premeny jednotiek a riešenia ingrediencií - premeniť jedným klikom recept z gramového na hrnčekový je fičúra, ktorou sa iná stránka ani kniha nevie pochváliť.

Robenie na tomto projekte bola asi najzaujímavejšia školská vec, ktorú som tento rok robila a asi som sa aj najviac naučila. Stránku si určite chcem nechať, vylepšiť a používať aj naďalej, možno na vlastnej doméne.
