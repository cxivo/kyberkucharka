# Na čo sa pozerám?
Na ***KyberKuchárku***, same-generation aplikáciu na recepty! (nikdy neviem pochopiť čo ako je ten "next-gen", keď to vzniklo v cirka rovnakom čase ako stále updatovaná konkurencia a zas až také prevratné veci tu nie sú)

Môžete recepty čítať/písať/počítať a forkovať - predstavte si to isté, ako forkovanie na GitHube, že vytvoríte odvodeninu niečieho receptu. To je užitočná fičúra, ktorá mi na mnohých stránkach chýbala.

# Ako si rozbehať vývojové prostredie u seba doma
Ako povedal raz jeden môj profesor, buildovanie je ako pečenie, takže nedivím sa, že si aj vy chcete tento projekt upiecť doma. Ten istý profesor nám síce potom poslal recept na koláč, v ktorom bolo smrteľne veľké množstvo muškátového oriešku, takže to bolo trochu divné, ale my sme mu to už odpustili. Anyway, návod:

1. Zadovážte si tento repozitár

2. Zadovážte si PostgreSQL databázu (nie je súčasťou balenia)

3. V `kyberkucharka-backend` vytvorte súbor `.env`, do ktorého vložte: 
```
PORT=3000
STATUS=development
DB_URL= <sem vložte pripájací link na databázu - ten taký, čo má v sebe databázu, užívateľa aj heslo, mal by sa začínať na "postres://">
TOKEN_SECRET= <sem vložte nejaký náhodne generovaný string, ideálne niečo kryptograficky náhodné, ale pre mňa za mňa aj nechajte svoju mačku prejsť po klávesnici>
COOKIE_SIGNING= <rovnako (teda, iný string, ale rovnakým spôsobom získaný)>
```

4. V priečinku `kyberkucharka-backend` najprv stiahnete všetko potrebné pomocou `npm install` a potom nainicializujte databázu s predpripravenými tabuľkami a dummy dátami pomocou `npm run for-your-life-oh-god-it-is-gaining-on-us`.

5. V priečinku `kyberkucharka-frontend` taktiež spustite `npm install`.

6. voliteľné - Ak chcete mať backend niekde inde než odporúčam, prepíšte v `kyberkucharka-frontend/vite.config.ts` proxy pre `/api` na whatever ste si vymysleli.  

7. Zapnite frontend aj backend - v oboch priečinkoch pomocou `npm run dev`. 

8. voliteľné - Prihláste sa jedným z uvedených kont a užívajte si (voliteľné) stránku.

# ČKO (často kladené otázky)
- *Licencia?*

AGPL v3.

- *Prečo sa to volá KyberKuchárka?*

Názov vznikol, lebo som chcel "byť prvým človekom v tomto desaťročí, čo použije slovo **kyber** neironicky" (čo sa mi nie úplne vyplnilo, lebo všetky kybernetické bezpečnosti a všetko, ale nevadí). S kamarátmi sme "KyberKuchárka" vybrali, lebo to znelo extrémne snobsky a chcel som dať najavo, že od tohto projektu si nemá robiť človek veľké očakávania. Fakt, že nakoniec je UI spravené skôr útulným než hypermoderným spôsobom len pridáva na irónii.

- *Boli nejaké iné nápady na názov?*

Pár dobrých od kamarátov: *Nom-nom-nom*, *Gutmeal*, *GutHib* (ako [spoonerizmus](https://en.wikipedia.org/wiki/Spoonerism) GitHubu), *GrubFood*, *Kitchenly* (aby to znelo startupovsky), *YARFeD* (Yet Another Recipe Food Database, paródia na YAML), *OKK* (ako OKK Kyber Kuchárka) či *RRR rekurzívny receptár* (paródia na všetky [rekurzívne akronymy](https://en.wikipedia.org/wiki/Recursive_acronym) ako "GNU"), ℝ³ (z predošlého)...
