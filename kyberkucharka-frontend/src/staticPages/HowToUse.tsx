export default function HowToUse() {
  return (
    <div className="recipe">
      <div className="about">
        <title>Ako používať Kyberkuchárku</title>
        <div className="recipe-title">
          <h1>Ako používať Kyberkuchárku</h1>
        </div>

        <div className="recipe-body recipe-text">
          <p>
            Ak ste niekedy používali kuchársku knihu alebo inú stránku na
            recepty, tak zas taký šokantný zážitok Kyberkuchárka nebude. Viete
            si čítať/vytvárať/upravovať recepty, vyhľadávať. Predsa sme sem
            primiešali aj nejaké iné dobroty:
          </p>
          <h2>Forkovanie</h2>
          <p>
            Častokrát sa mi stáva, že nájdem zaujímavý recept, ale nie je to
            úplne to pravé orechové - chcem si napríklad ubrať cukor, nahradiť
            vajíčka vegánskou alternatívou, vymeniť plnku alebo si celkovo
            trošku poupraviť recept.
          </p>
          <p>
            {" "}
            Môžete si vždy vytvoriť nový recept, ale načo budete všetko
            prepisovať - tu je možné si recept <em>forknúť</em> - to vytvorí
            vašu kópiu receptu, ktorú si môžete potom upravovať. Pri každom
            forknutom recepte je uvedené, z ktorého receptu bol forknutý aj
            prípadné iné recepty, ktoré boli forknuté z neho.
          </p>
          <h2>Premena jednotiek</h2>
          <p>
            Niekedy nájdem v receptoch suroviny v takých mierach, že sa len na
            ne pozerám ako teľa na nové vráta - "lyžica múky"?? zarovnaná či
            kopcovitá?? Pol sáčku vody? Koľko je jeden sáčok? A v akom zmysle
            polka??
          </p>
          <p>
            Alebo menej závažne, keď má človek recept písaný v gramoch a má len
            šálku, pekáč a odhodlanie, tak si tiež musí len zložito prepočítavať.
            Trochu sme odbehli od témy - v Kyberkuchárke je možné pri tvorbe
            receptu zadať ingredienciu nejakým spôsobom
            (gramy/kusy/balenia/mililitre/šálky/lyžice/lyžičky) a pri čítaní
            receptu si úplne nezávisle zvoliť, v čom sa bude zobrazovať. Viete
            tak akýkoľvek recept zmeniť na hrnčekový alebo pre mňa za mňa aj
            lyžicový, stačí len zvoliť, v čom sa majú ingrediencie zobrazovať.
          </p>
          <p>Krátke vysvetlenie významu podporovaných mier: </p>
          <ul>
            <li>
              Predpokladáme, že všetko je možné merať na <em>gramy</em>
            </li>
            <li>
              Kusové suroviny ako ovocie a zelenina alebo balené ingrediencie
              ako prášok do pečiva či vanilkový cukor majú nejakú hmotnosť na
              kus - či už presnú alebo približnú. Napríklad pri jablkách je to
              hmotnosť využiteľnej časti priemerného jablka - teda bez stredu,
              stopky a jadierok. Tak funguje meranie na <em>kusy</em> a{" "}
              <em>balenia</em>. Znamenajú to isté, len povedať "1 kus prášku do
              pečiva" alebo "1 balenie jablka" znie extrémne divne.
            </li>
            <li>
              Suroviny, ktorých objem vieme rozumne zmerať môžeme merať v{" "}
              <em>mililitroch</em> a <em>šálkach</em>. Jednu šálku definujeme na
              250ml - pri väčšine šálok je to naplnenie cirka 1cm pod horný
              okraj. Čo má rozumne merateľný objem? Kvapaliny a sypkné suroviny
              ako múka majú - vieme ich napchať do odmerky na váhe a odčítať
              číselká z oboch. Niekedy vieme merať objem aj iných vecí -
              nasekanej čokolády, šálky malín, veľkej kopy čučoriedok... tu to
              nie je zďaleka tak presné, keďže ak niekto čučoriedky stlačí, tak
              budú mať objem iný. V Kyberkuchárke máme konvenciu merať objem
              nestlačených vecí - pri meraní nasypeme meranú surovinu do
              odmerky/šálky a zatrasieme, aby sa sama uložila, ale nevyvíjame na
              ňu žiadny tlak. Nie vždy predsa chceme v recepte stlačené
              suroviny, stlačiť ich vieme aj po odmeraní. A čo nemá rozumne
              merateľný objem? Napríklad pečivo alebo hocičo veľmi stlačiteľné
              alebo ťažko napratateľné do odmerky - rožok nevieme ľahko nakrájať
              a vložiť do odmerky bez stláčania. A keby to aj vieme, tak by to
              musel robiť každý, kto robí tento recept po nás, čo veru nechceme.
            </li>
            <li>
              Nakoniec tu máme <em>lyžice</em> (aneb <em>polievkové lyžice</em>,
              s objemom cirka 15ml) a <em>lyžičky</em> (aneb{" "}
              <em>čajové lyžičky</em>, s objemom 5ml). Kávové lyžičky sú niečo
              iné, sú ešte menšie než čajové. Úprimne - lyžice a lyžičky sú
              extrémne nepresné. Najlepšie sa na lyžičky merajú malé množstvá,
              ako sóda bikarbóna alebo soľ, ale niektoré recepty boli písané s
              lyžicami múky, mlieka či vody, tak v záujme jednoduchosti ich
              prepisovania sú lyžice aj na Kyberkuchárke. Premena z hmotnosti na
              lyžice je pri kvapalinách ešte ľahká - 15ml krát hustota
              kvapaliny. Pri sypkých látkach je to horšie - tam miesto
              fyzikálnej analýzy je najlepšie to len zmerať, prípadne, v prípade
              veľkej lenivosti to tipnúť - experimentálne má väčšina sypkých
              látok 17g na lyžicu, takže ak neviete, použite toto číslo. Ako
              hovorím, lyžice budú vždy nepresné, preto si netreba s nimi robiť
              nejak ťažkú hlavu.
            </li>
          </ul>
          <h2>Tagy</h2>
          <p>
            Inak nazvané, <em>kategórie</em>, sú to vlastnosti vášho receptu.
            Skúste pridať čo najviac, aby bolo možné recept čo najľahšie nájsť.
          </p>
          <h2>Tvorba nových ingrediencií</h2>
          <p>
            Nie je pre nás ako tvorcov Kyberkuchárky možné obsiahnuť všetky
            možnosti - nedokážeme pridať všetko. Už len korení sú stovky druhov
            a keby ich máme pridávať všetky, porazilo by nás, a napokon by sme
            aj tak nejakú vynechali. Preto túto prácu nechávame na vás,
            užívateľoch - ak zistíte, že nejaká ingrediencia potrebná pre váš
            recept chýba, viete ju pridať sami! Ako? Nie až tak jednoducho, ale
            je to prežiteľné:</p>
            <ul>
              <li>Pridáte názov, v nominatíve</li>
              <li>
                V čom sa primárnej surovina meria - ako sa najčastejšie objavuje
                v receptoch. Ak je to pol na pol, preferujte radšej gramy.
              </li>
              <li>
                Vyplníte možnosti konverzie - ak sa surovina meria na mililitre
                alebo šálky, tak vyplníte buď hustotu (dobré pri kvapalinách)
                alebo hmotnosť na šálku (dobré pre prípady ak to jednoducho
                odmeráte). Ak sa meria na kusy či balenia, tak (priemernú)
                hmotnosť na kus/balenie. Ak sa meria na lyžice či lyžicky, tak
                hmotnosť na lyžicu/lyžičku - najlepšie je to zmerať, ale ak
                neviete, tak ako bolo povedané, napíšte 15g/lyžicu pre kvapaliny
                a 17g/lyžicu pre sypké.
              </li>
              <li>
                Pridáte alternatívne názvy - nemusíte pridať všetky nárečové
                varianty, ale napríklad "prášok do pečiva" a "kypriaci prášok"
                sa používajú obe. Vám srdcu milšie dáte ako názov a alternatívne
                názvy pridáte sem - používajú sa na uľahčenie hľadania pre
                ostatných užívateľov.
              </li>
            </ul>
            <p>
            Nemusíte mať strachy že niečo pokazíte, v najhoršom to admin po vás
            opraví.
          </p>
          <h2>Vyhľadávanie</h2>
          <p>
            Okrem klasického názvu receptu viete hľadať aj podľa tagov - aké
            tagy recept má a nemá mať. Rovnako pre ingrediencie - viete si tak
            nájsť recept, ktorý obsahuje surovinu ktorú chcete spotrebovať ale
            aj vylúčiť recepty s ingredienciami, na ktoré máte alergiu. Okrem
            toho si viete nastaviť, aby vám vyhľadávalo iba recepty, ktoré
            obsahujú ingrediencie z nejakej množiny - to je užitočné, ak sú
            obchody zatvorené (alebo sa vám len nechce ísť von) a chcete vedieť,
            čo môžete upiecť či uvariť z toho mála, čo máte doma.
          </p>
          <div className="recipe-text-afterspace">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
