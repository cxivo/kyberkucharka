# Info o projekte:
- Meno a priezvisko: Marek Michalovič
- Názov projektu: Kyberkuchárka
- Link na repozitár: https://github.com/cxivo/kyberkucharka

# Info o reportovanej verzii:  
- Tag: week5
- Obdobie: 5. týždeň, 17.3.2025 - 23.3.2025

# Plán:
Návrh client-server komunikácie, pridanie databázy, vytvorenie jednotného spôsobu reprezentácie receptov (preklad - poriadny interface), pridanie editora receptov

# Vykonaná práca:
- update specs: iba zmenené pdfko so špecifikáciou
- add recipe interfaces, add displaying recipes on frontend: vytvorenie rozhraní na reprezentáciu receptov, ingrediencií i užívateľov; pridanie dummy dát na server pre zjednodušenie vytvárania frontendu; recepty sú už získavané zo servera; 
- create basic main page: upravená štruktúra stránky, teraz má projekt hlavnú stránku so zoznamom všetkých receptov
- add page for editing recipes: Pridané serverové API na získavanie ingrediencií; vytvorená stránka na editáciu receptov (nie je ešte dokončená, ale je možné aspoň editovať na klientovej strane základné polia); je možné pridávať a odoberať sekcie receptu

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Databáza pravdepodobne bude pridaná až keď sa vyrieši vytváranie a úprava receptov - nechcem skákať medzi rôznymi časťami, teraz sa sústredím na frontend (až na štýly). Ostatné položky plánu som, extrémne prekvapivo, splnila, napriek chorobe a únave, vďaka ktorej som ledva vyliezla z postele... avšak pravdepodobne budúci týždeň nebudem môcť toľko pridávať, keďže moja energia bude musieť ísť na iné predmety.

# Plán na ďalší týždeň:
Dokončiť mechanizmus pridávania a úpravy receptov, okrem možnosti pridávať vlastné ingrediencie. Možno si zriadiť databázu alebo sa začať venovať autentifikácii.

# Problémy:
Choroba a neschopnosť sa sústrediť. S Reactom tiež mierne bojujem, hlavne s typmi, ale nie je to až tak zlé ako keby musím používať čistý JS. Aktuálne posledný problém je choice paralysis ako riešiť pridávanie ingrediencií.

# Zmeny v špecifikácii:
Opäť nevylučujem, že Tailwindu sa možno ani nedotknem. 