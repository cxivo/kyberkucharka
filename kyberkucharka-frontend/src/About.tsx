export default function About() {
    return (
      <div className="recipe">
        <div className="about">
          <title>O Kyberkuchárke</title>
          <div className="recipe-title">
            <h1>O projekte</h1>
          </div>

          <div className="recipe-body recipe-text">
            <h2>Čo toto je?</h2>
            <p>
              <strong>KyberKuchárka</strong>, same-generation aplikácia na
              recepty! (nikdy neviem pochopiť čo ako je ten "next-gen", keď to
              vzniklo v cirka rovnakom čase ako stále updatovaná konkurencia a
              zas až také prevratné veci tu nie sú)
            </p>
            <p>
              Môžete recepty čítať/písať/počítať a forkovať - predstavte si to
              isté, ako forkovanie na GitHube, že vytvoríte odvodeninu niečieho
              receptu. To je užitočná fičúra, ktorá mi na mnohých stránkach
              chýbala.
            </p>
            <h2>ČKO (často kladené otázky)</h2>
            <ul className="ingredients-list">
              <li>
                <em>Je niekde dostupný kód?</em>
                <br />
                Áno, na{" "}
                <a href="https://github.com/cxivo/kyberkucharka/">GitHube</a>,
                pod nejakou ešte bližšie nešpecifikovanou slobodnou licenciou
                (ktorú by sa mi hodilo aj pridať)
              </li>
              <li>
                <em>Prečo sa to volá Kyberkuchárka?</em> <br /> Názov vznikol,
                lebo som chcel "byť prvým človekom v tomto desaťročí, čo použije
                slovo <em>kyber</em> neironicky" (čo sa mi nie úplne vyplnilo,
                lebo všetky kybernetické bezpečnosti a všetko, ale nevadí). S
                kamarátmi sme "KyberKuchárka" vybrali, lebo to znelo extrémne
                snobsky a chcel som dať najavo, že od tohto projektu si nemá
                robiť človek veľké očakávania. Fakt, že nakoniec je UI spravené
                skôr útulným než hypermoderným spôsobom len pridáva na irónii.
              </li>
              <li>
                <em>Boli nejaké iné nápady na názov?</em>
                <br />
                Pár dobrých od kamarátov:
                <ul>
                  <li>Nom-nom-nom</li>
                  <li>Gutmeal</li>
                  <li>
                    GutHib (ako{" "}
                    <a href="https://en.wikipedia.org/wiki/Spoonerism">
                      spoonerizmus
                    </a>{" "}
                    GitHubu)
                  </li>
                  <li>GrubFood</li>
                  <li>Kitchenly (aby to znelo startupovsky)</li>
                  <li>
                    YARFeD (Yet Another Recipe Food Database, paródia na{" "}
                    <a href="https://en.wikipedia.org/wiki/YAML#History_and_name">
                      YAML
                    </a>
                    )
                  </li>
                  <li>
                    OKK (ako OKK Kyber Kuchárka) či RRR rekurzívny receptár
                    (paródia na všetky{" "}
                    <a href="https://en.wikipedia.org/wiki/Recursive_acronym">
                      rekurzívne akronymy
                    </a>{" "}
                    ako "GNU")
                  </li>
                  <li>ℝ³ (z predošlého)... </li>
                </ul>
              </li>
            </ul>

            <div className="recipe-text-afterspace">&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }
  