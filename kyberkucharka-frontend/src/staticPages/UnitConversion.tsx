export default function UnitConversion() {
  return (
    <div className="recipe">
      <div className="about">
        <title>Ako premieňať jednotky</title>
        <div className="recipe-title">
          <h1>Ako premieňať jednotky</h1>
        </div>

        <div className="recipe-body recipe-text">
          <p>
            Ak ste niekedy čítali recept na anglickej stránke alebo ste videli
            nejaké video krátkeho formátu na vašej obľúbenej (alebo aspoň
            najmenej nenávidenej) sociálnej sieti, možno ste zažili nejaké malé
            kultúrne šoky, alebo minimálne sa zjavilo niekoľko otáznikov. Tu sa
            posnažím aspoň niektoré z nich ujasniť.
          </p>
          <p>
            Táto stránka nebude pravdepodobne nikdy hotová, budem sem postupne
            pridávať nové tipy a zistenia ako sa ich budem učiť.
          </p>
          <h2>Jednotky</h2>
          <p>Áno, extrémne veľa času venujem jednotkám, ďakujem za opýtanie. Uvediem nejaké najčastejšie jednotky a ich konverzie:</p>
          <ul>
            <li>1 cup = 236.6ml (je to mierne odlišné od nášho chápania jednej šálky ako 250ml)</li>
            <li>1 oz (ounce) = 28.35g (takzvaná "unca", má viacero významov, nepomýľte si to s "troy ounce" ani s "fluid ounce")</li>
            <li>1 lb (pound) = 453.6g (libra, s ktorou sa asi stretnete často)</li>
            <li>1 fl oz (fluid ounce) = 28.41ml (doslova "tekutá unca", je to objem 1 oz vody)</li>
            <li>1 pt (imperial pint) v Británii, Írsku a Commonwealthu = 568ml (prekladaná ako "pinta")</li>
            <li>1 pt (liquid pint) v Spojených Štátoch = 473ml (áno, je to rozdielne a áno, je to extrémne divné)</li>
            <li>1 qt (quart) = 946ml (je to jedna štvrtina galóna)</li>
            <li>1 imp gal (imperial gallon) = 4.546l (pravdepodobne neuvidíte v receptoch, ale niekedy sa napríklad mlieko predáva na galóny)</li>
            <li>Fahrenheit... to sa prepočítava podľa rovnice <br />
            <em>C = 5 * (F - 32) / 9</em>, ale to si šupnete do kalkulačky. Ale je užitočné vedieť že 
            350°F = 177°C a 400°F = 205°C.</li>
          </ul>
          <h2>Múky</h2>
          <p>
            Asi najľahšie badateľný rozdiel - v strednej Európe rozoznávame múky
            hlavne podľa hrubosti zŕn - od najmenších po najväčšie zrná to sú
            hladká múka, polohrubá múka, hrubá múka, krupica (áno, krupica je v
            podstate len veľmi hrubozrnná múka) a krúpy (vlastne múka, ktorú
            zabudli vložiť do mlyna).
          </p>
          <p>
            Za Veľkou Mlákou majú iné zvyky - múky inej hrubosti zŕn než je naša
            hladká používajú minimálne. Múky najčastejšie rozlišujú podľa
            pridaných látok:
          </p>
          <ul>
            <li>
              <em>All-purpose flour</em> = názov "všeobecná múka" je vcelku
              rozumný, keďže sa používa najčastejšie. Pre nás je druhé
              pozitívum, že je to vlastne len ekvivalent našej hladkej múky.
            </li>
            <li>
              <em>Cake flour</em> = tortová múka, nazvaná asi podľa svojho
              použitia, je zmes hladkej múky a kukuričného škrobu v pomere 7:1.
              Teda, na 100g hladkej múky treba pridať asi 15g kukuričného škrobu
              - napríklad Zlatého Klasu.
            </li>
            <li>
              <em>Self-raising flour</em> = názov "samorastúca múka" má taktiež
              opisný, keďže má v sebe už pridaný kypriaci prášok do pečiva -
              tvorí cirka 5% jej hmnotnosti. Miesto 100g self-raising flour teda
              viete použiť 95g hladkej múky 5g kypriaceho prášku.
            </li>
            <li>
              <em>Bread flour</em> = chlebová múka, asi môžete nahradiť buď tiež
              nejakou múkou na chlieb alebo hladkou múkou.
            </li>
            <li>
              <em>Whole-wheat</em> alebo <em>Wholemeal flour</em> = u tejto múky
              je dokonca doslovný preklad aj správnou náhradou - jedná sa o
              celozrnnú múku.
            </li>{" "}
            {/* TODO - nejak napíš že rozdiel je že celozrnná múka má viac vlákniny */}
            <li>
              <em>Semolina</em> - to je v podstate naša krupica.
            </li>
          </ul>
          <h2>Iné konkrétne suroviny</h2>
          <p>Ako si preložit suroviny častokrát predávané v iných krajinách (asi hlavne v Spojených Štátoch) iným spôsobom ako u nás:</p>
          <ul>1 stick of butter = 115g masla</ul>

          <div className="recipe-text-afterspace">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
