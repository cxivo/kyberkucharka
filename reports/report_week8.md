# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka

# Info o reportovanej verzii:  
- Tag: week8
- Obdobie: 8. týždeň, 7.4.2025 - 13.4.2025

# Plán:
Minule uvedené možnosti boli
- začať štýlovať stránku (najzaujímavejšie, ale najzložitejšie)
- pridať tagy pre ingrediencie a recepty (treba rozmyslieť)
    - pridať vyhľadávanie (až po tagoch, inak by bolo dosť nudné)
- pridať administrátorské funkcie
- pridať viac možností k jednotkám merania (tiež treba premyslieť)

# Vykonaná práca:
Pridané boli nejaké administrátorské funkcie a hlavne, stránka bola oštýlovaná! Podľa mňa bude vyzerať fakt krásne keď to bude... ale ešte to nie je.
- `style recipe reading and editing` - v tomto štedrom komite som uviedla moju predstavu výzoru celej stránky - konkrétne na najdôležitejších stránkach - šítanie a úprava receptu. Stránka na úpravu receptu bola prerobená, `input`y boli nahradené `p`aragrafmi s tagom `contentEditable`, vďaka čomu je možné štýlovať úpravu aj čítanie receptov skoro rovnako a stránka bude ešte viac WYSIWYG, než sa pod tým pojmom myslí. Ďalšie potrebné zmeny v HTML boli pochopiteľne aj v CSS triedach.
- `fix various style issues` - bol pridaný vlastný handwritten font, ktorý sa viac hodí na stránku (nazvaný KyberFontSimple, chcela som pretentious názov). Bolo pridané pozadie vo forme linajkového zošita a text bol precízne zarovnaný, aby ležal na linajkovom zošite, je to jednoducho pekné.
- `style ingredient creation window` - Okno tvorby ingrediencií bolo skrášlené, plus bol k ingredienciám pridaný dátum vytvorenia a autor (pre administrátorské účely). Boli prerobené aj tabuľky pre tagy (čo bol pôvodný plán, ale vysvitlo, že najprv je vhodné opraviť ingrediencie)
- `add login prompt for recipe editing` - Ak užívateľ tak dlho píše recept, že ho medzitým odhlási, tak mu pri odosielaní stránka nezahodí robotu, ale vyžiada si od neho prihlásenie - skrátka, správne správanie stránky.
- `add ingredient editing` - komponent na vytváranie ingrediencie po novom slúži aj na jej úpravu - využíva sa to na novopridanej admin stránke prehľadu všetkých ingrediencií - administrátor môže ľubovoľnú ingredienciu zmeniť. Na stránku má zatiaľ prístup každý užívateľ a možno to tak aj nechám, lebo na tom nie je nič zlé, pokiaľ mu nedovolím nič upraviť.
- `add ingredient verification` - do admin tabuľky ingrediencií bolo pridané zaškrtávacie políčko overenia ingrediencie - takto je overenie zjednodušené oproti úprave ingrediencie.
- `change style for login cancel button` - podobne ako pri úprave ingrediencie dostal prihlasovací formulár pekné naštýlované Xko (drobný commit, ktorý sa inam nezmestil)

# Zdôvodnenie ~~rozdielov medzi plánom a vykonanou prácou~~ čo som vlasne robila:
Plán bol veľmi nejasný, ale rozhodla som sa nakoniec pre štýlovanie - chcela som vedieť, akým smerom sa má ďalej uberať môj frontend predtým, než pridám na stránku stotisíc funkcií, ktoré by som musela pri štýlovaní extrémne prerábať. Pôvodne som chcela pridať tagy, ale tie by si vyžadovali dosť veľkú integráciu do všetkých frontend + administrátorských vecí, čo by presne viedlo k problémom. Začala aj práca na administrátorských stránkach, ktoré pravdepodobne nechám škaredé trvalo, keďže to nie je miesto, kam bežný smrteľník bude chodiť. Práca na tagoch bola odložená, lebo fakt ich treba premyslieť, aby fungovali pekne a neboli otrasné na údržbu. Vyhľadávanie pochopiteľne bolo odložené tiež, možnosti k jednotkám merania sú samostatné a popravde mi nič nebráni ich pridať, keď je premyslené štýlovanie.

# Plán na ďalší týždeň:
Ísť úplne bokom a zavesiť stránku na hosting. Ak sa na mňa Šťastena usmeje a pôjde to bezproblémovo, tak pridám ďalšie administrátorské funkcie, možno začnem pracovať na hlavnej stránke (hlavne štýlovanie).

# Problémy:
Štýlovanie zaberá neuveriteľne veľa času, ale výsledok za to stojí (pokiaľ teda nejde o centrovanie textu, ktoré za to veru nestojí a aktuálne to obchádzam hnusným hackom). CSS mi celkovo robí problémy, keďže toto je asi druhá väčšia vec čo v ňom robím a mám fakt veľké ambície.

# Zmeny v špecifikácii:
Zmena pri tagoch (ktorá sa bude ešte chvíľu ťahať), tiež zmeny s jednotkami, ktoré ešte neviem ako presne vykonám.

Už môžem nastopro povedať, že Tailwind nebude, bude čisté CSS, takže táto sága sa môže skončiť.
