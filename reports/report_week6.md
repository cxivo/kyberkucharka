# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka

# Info o reportovanej verzii:  
- Tag: week6
- Obdobie: 6. týždeň, 23.3.2025 - 30.3.2025

# Plán:
Dokončiť mechanizmus pridávania a úpravy receptov, okrem možnosti pridávať vlastné ingrediencie. Možno si zriadiť databázu alebo sa začať venovať autentifikácii.

# Vykonaná práca:
- add ability to add/remove ingredients in a recipe - Teraz môžu používatelia na stránke editácie receptu pridávať a odoberať ingrediencie do/zo sekcií. Nikam sa to však ešte neodošle
- add ability to create new recipes (no DB yet) - Odoslané recepty si teraz server uloží vo svojej pamäti a až do reštartu ich ponúka
- ingredients integrated with the database - Vytvorená databáza a schéma pre ingrediencie, ingrediencie berie server po novom z databázy
- add ability to get/add recipes from/to database - Veľmi rozsiahly commit: vytvorená schéma pre databázové tabuľky, pridaná funkcionalita na pridávanie receptov do databázy aj získavanie receptov z databázy (38-riadkovým SELECTom)
- add redirection upon recipe creation; fix bug with empty sections/used_ingredients - po pridaní receptu teraz užívateľa presmeruje na stránku toho receptu. V rovnakom commite bol opravený aj bug, pretože som naň prišla v strede práce na fičúre, bol v rovnakom súbore a naozaj sa mi nechcelo tú prácu nejak deliť do 2 commitov
- add ability to edit existing recipes - pri recepte pridané tlačidlo "uprav", po ktorom sa človek dostane na stránku úpravy receptu; úpravy sa po odoslaní aplikujú
- add recipe forking - pri recepte pridané tlačidlo "forkni", po ktorom sa človek dostane na stránku úpravy receptu... trochu déja vu, ale po odoslaní sa tentokrát vytvorí nový recept aj s odkazom na ten, z ktorého je forknutý

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Databáza pravdepodobne bude pridaná až keď sa vyrieši vytváranie a úprava receptov - nechcem skákať medzi rôznymi časťami, teraz sa sústredím na frontend (až na štýly). Ostatné položky plánu som, extrémne prekvapivo, splnila, napriek chorobe a únave, vďaka ktorej som ledva vyliezla z postele... avšak pravdepodobne budúci týždeň nebudem môcť toľko pridávať, keďže moja energia bude musieť ísť na iné predmety.

# Plán na ďalší týždeň:
Dokončiť mechanizmus pridávania a úpravy receptov, okrem možnosti pridávať vlastné ingrediencie. Možno si zriadiť databázu alebo sa začať venovať autentifikácii.

# Problémy:
Choroba a neschopnosť sa sústrediť. S Reactom tiež mierne bojujem, hlavne s typmi, ale nie je to až tak zlé ako keby musím používať čistý JS. Aktuálne posledný problém je choice paralysis ako riešiť pridávanie ingrediencií.

# Zmeny v špecifikácii:
Opäť nevylučujem, že Tailwindu sa možno ani nedotknem. 