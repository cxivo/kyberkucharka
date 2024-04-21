# Beta report

Marek Michalovič

projekt: Kyberkuchárka

verzia: beta_version

repozitár: (https://github.com/cxivo/kyberkucharka)

stránka dostupná na: (https://kyberkucharka.onrender.com/)

Ako rozbehať vývojové prostredie:

1. naklonujte si [repozirát](https://github.com/cxivo/kyberkucharka)

2. ignorujte README v repozitári

3. v `kyberkucharka-client` spustite `npm install` pre React a dependencie

4. v `kyberkucharka-server` spustite `express .` pre nainštalovanie ExpressJS a `npm install` pre dependencie

5. pre klienta zmeňte adresu API server na "localhost:3001"

6. pre server vytvore .env súbor, kde DATABAZA je spojenie na databázu a SECRET_ACCESS_TOKEN je 20bajtové náhodné číslo

7. vykonajte obetu k obľúbenej nadprirodzenej bytosti

8. spustite: pre klienta `npm run dev`, pre server `npm start`

## Čo už je implementované

Registrácia, prihlasovanie a odhlasovanie užívateľov, kontrola správnosti údajov, odolnosť voči SQL útokom, interfacey pre recepty atď., zoznam používateľov (dočasné), zapamätanie si užívateľa aj po odídení zo stránky, deploy na webe...

Neznie to ako veľa, ale začiatky sú vždy najťažšie - podľa mňa aj tu platí, že 20% projektu zaberie 80% času. A nanešťastie väčšinou tých 20% je práve tých prvých, kde sa dejú len relatívne nudné veci.

## Čo nás čaká a neminie

Implementovať stránku prezerania a editácie receptov (na tom práve robím), stránku používateľa, možnosť zmazať si účet, múdre vyhľadávanie receptov, forkovanie receptov (to bude doslova len glorifikovaná editácia), komentáre, admin funkcie (v podstate len mazanie všetkého možného), ak zostane čas tak aj skupiny používateľov.

A asi najťažšie - **_štýly_**... Zatiaľ stránka vyzerá ako kravou požutá.

## Plány na najbližšie obdobie

V podstate presne to, čo je v predošlej sekcii, približne poporadí.

Časový plán je, aby som to do odovzdania stihol - nemá zmysel robiť si časový plán na niečo, pri čom sa možno na týždeň zaseknem lebo React ma nemá rád.

## Problémy

Dúfam, že čitateľ teraz ocení, že tento dokument píšem na poslednú chvíľu - inak by táto sekcia bola dlhá ako viktoriánske romány...

Najväčší problém bol ten, že skoro všetky technológie čo používam sú pre mňa nové a neznáme - iba s JavaScriptom som niekedy v minulosti robil, ale to bolo len málinko. Na začiatku som ani nerozumel slovám, ktoré sa u webových wývojárov používali.

Ďalší problém bolo, že som asi v druhom alebo treťom týždni zmenil úplne framework aj prístup k všetkému - z NextJS som prešiel na React + Express. Takže zas sa učiť nové technológie.

Potom Vercel, dovtedajší hosting, odmietal niekoľko dní spolupracovať. Render tiež nešiel na prvý raz.

K tomu som sa aj na bakalárke zasekol, takže som mal dva nefungujúce veľké projekty, čo bolo pre moju morálku otrasné. Psychika teda skutočne nebola na mojej strane, motivácia bola skoro nulová, keďže čokoľvek som spravil, nič nefungovalo.

Pre ostatné problémy si prečítajte týždnenné reporty, všetko sem nezmestím.

To je zatiaľ všetko, viem, vyzerá to ako malý výsledok, ale zas z týchto problémov snáď pochopíte prečo.
