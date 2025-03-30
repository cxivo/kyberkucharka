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
- remove testing setTimeout() calls - (aspoň jeden atomický commit, nech je jasné, že viem ako sa to má robiť) odstránenie jednosekundového čakania, ktoré som tam nechala z testovacích dôvodov, ale teraz mi už oneskorenie zabezpečuje databáza, takže sa čakanie navyše stalo zbytočným.

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Plán som splnila na 110%, podarilo sa mi skoro všetko potrebné presunúť do databázy, dokonca aj vcelku pekne vyriešiť INSERT a SELECT receptu (hoci doteraz presne nechápem, ako je možné že ten insert funguje). 

# Plán na ďalší týždeň:
Vrhnúť sa buď na vytváranie účtov a autentifikáciu, alebo na možnosť pridávať nové ingrendiencie. Je to disjunkcia, takže splnenie ktoréhokoľvek z týchto požiadaviek budem považovať za úspech.

# Problémy:
Zisťujem ako zložitý a široký je svet databáz a rozmýšľam, že ORM by bol býval možno lepší nápad... ale nejdem to meniť, najťažšie mám asi za sebou. Veľký problém je robiť atomické komity, moje komity sú skôr také anorganické molekuly - áno, išli by rozdeliť aj viac, ale osobne commitujem až keď dokončím svoj zámer.

Ďalší problém je automatické ukladanie, ktoré nie vždy funguje, a preto som musela opraviť weekly report, lebo sa neuložil celý... yea.

# Zmeny v špecifikácii:
Množstvá ingrediencií budem všetky jednotne ukladať v gramoch - zjednoduší sa tak práca s nimi a konverzia. Ak som niečo veľmi významné neprehliadla, tak všetky sa dajú rozumne reprezentovať hmnotnosťou - pri kvapalných a sypkých je to triviálne, kusové potraviny ako jablká, vajíčka alebo balíčky surovín využijú políčko "hmotnosť na kus", kde bude (priemerná) hmnotnosť tejto suroviny. Ingrediencie merané na lyžičky budú popravde pravdepodobne tipnuté... ale meranie na lyžičky nikdy nebolo presné, takže to asi ani až tak nevadí.

Myslím že to bude rozumnejšie oproti pôvodnému plánu ukladať všetky suroviny v ich "natívnych" mierach - to by sa strašne plietlo.

Oh, a Tailwindu možno vezmem vietor z plachiet (pun very much intended).