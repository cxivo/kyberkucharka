# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka

# Info o reportovanej verzii:  
- Tag: week6
- Obdobie: 6. týždeň, 30.3.2025 - 6.4.2025

# Plán:
Vrhnúť sa buď na vytváranie účtov a autentifikáciu, alebo na možnosť pridávať nové ingrendiencie. Je to disjunkcia, takže splnenie ktoréhokoľvek z týchto požiadaviek budem považovať za úspech.

# Vykonaná práca:
Hádajte, komu sa podarilo splniť nie jednu, ale obe položky plánu na tento týždeň! 😎 Anyway, commity:
- rename measurement units - uvedomil som si, že je vhodné miesto iba "kusov" používať kusy aj balenia - povedať "1 kus kypriaceho prášku" by znelo extrémne divne. Jednotky boli premenované aj na skratky (čiastočne preto, lebo neznášam anglický spelling slova "millilitre").
- add ability to create new ingredients - Pri vytváraní receptu je teraz okrem možnosti vybrať si z existujúcich ingrediencií aj možnosť pridať vytvoriť vlastnú - na to slúži "vyskakovacie okno". Novovytvorenú ingredienciu nepridá do databázy hneď po jej vytvorení, ale až pri odosielaní receptu - ak by si užívateľ povedal, že recept nechce zverejniť, tak by nebola v databáze osirotená ingrediencia. Možný problém však je, ak by náhodou dvaja užívatelia spravili v rovnakom čase dve ingrediencie s rovnakým názvom. Tomuto sa možno budem venovať, možno to ignorujem ako nepravdepodobnú udalosť.
- change displaying and saving ingredient amounts - vytvorila som si pomocné funkcie na prácu s ingrediencami a jednotkami - tie zabezpečujú správne zobrazovanie hodnôt aj skloňovanie (možnosť zmeniť si ingrediencie v zobrazení ešte nebola pridaná).
- add login and register components - Presne, pridané komponenty prihlasovania a registrácie, ktoré kontrolujú správnosť zadaných údajov, respektíve pridávajú nového používateľa. Zatiaľ však sa nijak neuchováva, že je človek prihlásený.
- implement JWT authorization - po prihlásení teraz odošle server klientovi JWT, ktorý ho uloží do kůkí súboru. Toto nie je veľmi bezpečné a je to mierne otravne sa s tým pracuje, avšak bola to prvá vec, čo fungovala.
- (tu niekedy sa udiala necommitovaná práca, kde som sa neúspešne pokúšala pridať HTTPS)
- modify JWT auth to use HTTP-only cookies, users' permissions now get checked before any editing - tento commit mi zobral veľkú časť života, keď som bojovala s HTTPS a HTTP-only cookies. Nakoniec sa mi ale podarilo pridať tento omnoho bezpečnejší spôsob práce s JWT, plus bola k aktivitám ako vytváranie a úprava receptu pridaná kontrola užívateľských práv. Bolo pridané aj odhlasovanie.
- remove an evil library which created unsolicited cookies - po zbežnom pohľade do Developer tools > Application > Cookies som s hrôzou objavila niekoľko cookies, ktoré som tam veru ja nepridala - po krátkom zmätení vysvitlo, že mi ich tam dal react-cookie, na čo moja reakcia bola okamžite ho vyhodiť z projektu. Nahradiť som ho skúsil knižnicou js-cookie, ale tá mi zas po spustení vytvorila SAKRAMENSKÉ GEOIP COOKIE, takže tá letela preč ešte rýchlejšie. Keďže všetky tutoriály a skoro všetky príspevky na StackOverflow odporúčali použitie nejakých knižníc alebo hnusného regexu, prehltol som svoju česť a poprosil o kus kódu AIčko (konkrétne Copilota), ktorý mi dodal tentoraz už kus kódu na čítanie cookies bez vedľajších účinkov. Ale pochopte, ako môžem tvrdiť, že som GDPR-compiant, keď sama neviem čo za cookies mám na stránke!
- add user page - pridaná stránka o užívateľovi (jeho meno, prezývka, kedy sa registroval) a jeho recepty. Súbory na backende boli trochu upratané.
- add logging user in upon registration - po vytvorení účtu užívateľa rovno prihlási. Bolo pridaných aj niekoľko alert()-ov pri chybách, aby užívateľ vedel, čo spravil zle.

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Plán som splnila na 200% lebo som až príliš úžasná

# Plán na ďalší týždeň:
Popravde neviem, na čo budem mať chuť, ale možnosti sú:
- začať štýlovať stránku (najzaujímavejšie, ale najzložitejšie)
- pridať tagy pre ingrediencie a recepty (treba rozmyslieť)
    - pridať vyhľadávanie (až po tagoch, inak by bolo dosť nudné)
- pridať administrátorské funkcie
- pridať viac možností k jednotkám merania (tiež treba premyslieť)

# Problémy:
- HTTPS je bolesť, neteším sa, keď to budem musieť riešiť pri deployovaní
- Pol dňa mi zobrali pokusy pridať HTTP-only cookies, musela som začať odznova a až potom nejakým zázrakom išli
- Prekvapivo veľký problém je zohnať knižnicu na cookies, ktorá nie je evil (tie dve čo som skúšala by sa ma pravdepodobne snažili zabiť v spánku)
- S tagmi som mala veľké plány - boli by to také rozšírené atribúty receptov a ingrediencií - či je recept/ingrediencia vegánska, aké má alergény či aká je to kategória (ingrediencie - mäso, zelenina, mliečne výrobky..., recepty - polievky, predjedlá, sladké, slané...). Niektoré som chcela, aby sa vypĺňali automaticky (alergény), potom nebude užívateľ môcť ich upravovať... neoplatí sa rozširovať tabuľku pre ingrediencie o alergény, tabuľka many-to-many relácie bude jednoduchšia. 
- Aj jednotky merania mi robia problémy, hlavne lyžičky a lyžice - keď niekto totiž povie v recepte "lyžicu múky", myslí tým kopcovitú lyžicu (17 gramov), nie zarovnanú (7 gramov, čo by som získala počítaním s objemom lyžice a hustotou múky) - a áno, merala som to. Asi skúsim pridať do ingrediencií aj políčka "mass_per_loaded_tbsp" a "mass_per_loaded_tsp", ktoré však nebudú vyplnené všade. Predpokladám (a dúfam) že ľudia merajú v lyžiciach len niektoré látky... Druhá možnosť je pevne definovať "mass_per_loaded_tbsp" na 17 gramov, pretože to mi vyšlo pre múky aj cukor rovnako keď som to merala.

# Zmeny v špecifikácii:
Ako som povedala v sekcii o problémoch, bude silne zmenená schéma databázy pre tagy (hodne rozšírená). Zmeny s jednotkami ešte neviem ako presne vykonám.

Rozmýšľam, či je priskoro vyhadzovať Tailwind z špecifikácie.
