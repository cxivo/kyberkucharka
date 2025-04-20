# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka

# Info o reportovanej verzii:  
- Tag: week8
- Obdobie: 9. týždeň, 14.4.2025 - 20.4.2025

# Plán: 
Ísť úplne bokom a zavesiť stránku na hosting. Ak sa na mňa Šťastena usmeje a pôjde to bezproblémovo, tak pridám ďalšie administrátorské funkcie, možno začnem pracovať na hlavnej stránke (hlavne štýlovanie).

# Vykonaná práca:
Presne vešanie na hosting bolo mojim programom na tento týždeň.
- `remove CORS and absolute URL paths` - vysvitlo, že nastavenie proxy vo `vite.config.ts` ktoré mi tam leží už pár dlhých dní skutočne stačí a nepotrebujem žiadny CORS.
- `update packages` - a ani o máčny mak viac. Tu sa začínajú také typické deploy commity, kde človek mení veci hore-dole s dúfaním, že niečo pôjde.
- `compile common interfaces, update packages` - počas pokusu o deploy backendu mi to chvíľu fungovalo takto
- `fix build script` - vysvitlo že predošlý commit bol zbytočný a bolo treba len zmeniť build script
- `modify frontend build script` - tiež kvôli deployu, plus opravené nejaké chyby, ktoré nejak pri development verzii nevadili
- `fix image alignment` - bugfix bugfixu, lebo obrázok má byť inline, nie block
- `modify cookies and site for production` - podľa [prednášky](https://micro.dcs.fmph.uniba.sk/dokuwiki/_media/sk:dcs:tia:tia_autentication_deployment.pdf) boli upravené cookies na secure a nastavené trust proxy. 
- Po tomto commite sa mi podarilo deploynúť! :D ale stránka stále vyzerá zle, tak to skoro nikomu ešte nehovorím
- `replace background image` - hnusný stock obrázok stola bol nahradený obrázkom stola z domu, ktorý sa na stránku hodí omnoho viac
- `style recipe cards` - zmena v rozhraniach - PartialRecipe po novom obsahuje aj opis receptu a link na obrázok - vďaka tomu mohol byť obyčajný zoznam receptov zmenený na kartičky, kde každý recept je na farebnom bločku
- `style site navigation` - vrch stránky je po novom tvorený kusom papiera s logom a login+register
- `modify recipe cards style` - na rozdiel od receptu po novom bločky nemenia svoju veľkosť pri zmenšovaní okna (keďže potom by boli nečitateľné), pridaný aj obrázok
- `fix bug when incomplete PartialRecipe bug was being sent` - doslova len oprava SQL dotazu
- `style recipe forks` - forknuté recepty majú teraz odkaz na originálny recept oooomnoho krajší
- `order style sheets` - rozdelený nekonečne dlhý .css súbor na súbory rozumnejšej veľkosti 
- `prevent logged in user from using register page` - pridané presmerovanie z registračnej stránky preč na hlavnú, ak je užívateľ prihlásený
-  potom som začala úpravy, aby bola stránka použiteľná na mobile - nebude nijak nádherná, ale bude použiteľná
- `make floating windows mobile friendly` - login okno a okno tvorby ingrediencie sú po novom dosiahnuteľné na mobile
- `add ingredient deletion for admins` - admin môže z menu na úpravu ingrediencií zmazať ingrediencie
- `add recipe deletion` - autor alebo admin môžu zmazať recept zo stránky čítania
- `enhance navbar` - navbar je po novom krajší + boli sem premiestnené linky na tvorbu receptu a "o stránke" (stále prázdny)
- `add links to ingredient list` - pre adminov bol pridaný do navbaru link na stránku správy ingrediencií, po novom môžu rovno z toho okna vytvoriť novú ingredienciu
- `add sidebar with recipes & countless style fixes` - vedľa zobrazeného receptu sú teraz aj linky na iné recepty (zatiaľ na všetky, ale s príchodom tagov sa to zmení). Okrem toho desiatky malých opráv štýlov, ktorých rozdelenie do commitov by zabralo dlhšie než ich oprava. 

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Rozdiely vlastne ani nie sú, tiež sa divím, ako sa toľko podarilo spraviť.

# Plán na ďalší týždeň:
Tentokrát je plán jasný - tagy a vyhľadávanie. 

# Problémy:
Prekvapivo som sa z vešania stránky na hosting ani nechcela zavesiť (hoci znepokojuje ma, ako veľa problémov som vyriešila vďaka informácii napísanej na nejakom jednom, stredne skytom mieste, a tú informáciu nie je možné zohnať inde... ako také hľadanie veľkonočných vajíčok). So štýlovaním je problém vždy, hlavne v mojom prípade, keď to chcem mať echt realistické a čeče.

# Zmeny v špecifikácii:
Tailwind bol odinštalovaný.

Možno budem chcieť užívateľov pri registrácii pekne krásne poprosiť o ich email. Čo s ním, ešte neviem.