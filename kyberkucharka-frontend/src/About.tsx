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
            vzniklo v cirka rovnakom čase ako stále updatovaná konkurencia a zas
            až také prevratné veci tu nie sú)
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
              <em>Aké recepty sem môžem dávať?</em>
              <br />
              Na všetko jedlé! Radi tu uvítame všetky recepty, či už nejaké vaše
              tradičné rodinné, okopírované z nejakého časopisu či vami
              vymyslené 10 minút dozadu. Len prosím žiadne recepty na
              metanfetamín alebo so smrteľne veľkými množstvami korení.
            </li>
            <li>
              <em>Je niekde dostupný kód?</em>
              <br />
              Áno, na{" "}
              <a href="https://github.com/cxivo/kyberkucharka/">GitHube</a>, pod
              licenciou AGPL v3.
            </li>
            <li>
              <em>Čo je AGPL?</em>
              <br />
              <a href="https://opensource.org/license/agpl-v3">
                GNU Affero General Public License
              </a>
              , je to slobodná licencia podobná{" "}
              <a href="https://opensource.org/license/agpl-v3">GPL</a>, akurát
              ľudia distribujúci deriváty tohto softvéru musia nejak poskytnúť
              aj zdroják svojho derivátu - prakticky to znamená, že ak niekto
              upraví túto stránku a zavesí to niekam, musí poskytnúť aj zdroják
              svojej úpravy a nemôže tajnostkárčiť že "používanie je zdarma ale
              zdroják neukážem &gt;:)".
            </li>
            <li>
              <em>Prečo sa to volá Kyberkuchárka?</em> <br /> Názov vznikol,
              lebo som chcel "byť prvým človekom v tomto desaťročí, čo použije
              slovo <em>kyber</em> neironicky" (čo sa mi nie úplne vyplnilo,
              lebo všetky kybernetické bezpečnosti a všetko, ale nevadí). S
              kamarátmi sme "KyberKuchárka" vybrali, lebo to znelo extrémne
              snobsky a chcel som dať najavo, že od tohto projektu si nemá robiť
              človek veľké očakávania. Fakt, že nakoniec je UI spravené skôr
              útulným než hypermoderným spôsobom len pridáva na irónii.
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
            <li>
              <em>Viem ťa nejak skontaktovať?</em>
              <br />
              Najlepšie cez <a href="https://discord.com/">Discord</a>, volám sa
              tam <em>cxivo</em>.
            </li>
          </ul>

          <div className="recipe-text-afterspace">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
