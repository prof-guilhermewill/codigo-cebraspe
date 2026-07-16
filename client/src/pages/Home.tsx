/*
  DESIGN: "O Dossiê Classificado" — a página é um documento encontrado, não uma landing page.
  Base #0B0B0B, vermelho cera-de-selo #8E2323, Cormorant Garamond/Cinzel + IBM Plex Sans/Mono.
  Estrutura em "Arquivos" numerados; ritmo lento, muito respiro, revelações ao scroll.
*/
import { useEffect, useRef } from "react";
import { Eye } from "lucide-react";

const ASSETS = {
  logo: "/manus-storage/logo_o_olho_21ecd4e4.png",
  hero: "/manus-storage/hero_dossie_d420b762.png",
  carta: "/manus-storage/image_carta_55df190b.png",
  chave: "/manus-storage/image_chave_f0cc469b.png",
  mapa: "/manus-storage/image_mapa_conexoes_3b0db527.png",
  dossie: "/manus-storage/image_dossie_arquivo_56deacd2.png",
};

/* ---------- helpers ---------- */

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("visible"), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function EyeSeal({ className = "" }: { className?: string }) {
  return (
    <div className={`eye-seal ${className}`}>
      <Eye className="h-6 w-6" strokeWidth={1.2} />
    </div>
  );
}

function RedactedLines({ widths }: { widths: string[] }) {
  return (
    <div className="redacted-lines my-8" aria-hidden="true">
      {widths.map((w, i) => (
        <span key={i} style={{ width: w }} />
      ))}
    </div>
  );
}

function FileHeader({ num, title, meta }: { num: string; title: string; meta?: string }) {
  return (
    <Reveal className="mb-14">
      <div className="flex items-center gap-4 mb-3">
        <span className="file-label">Arquivo {num}</span>
        <div className="file-divider flex-1" />
        <span className="file-label text-seal">Classificado</span>
      </div>
      <h2 className="display-heading text-2xl md:text-4xl text-foreground leading-snug">{title}</h2>
      <p className="file-label mt-4">{meta ?? `Ref. CC-${num} / Sigilo nível 3 — reprodução proibida`}</p>
    </Reveal>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="text-base md:text-lg leading-loose text-foreground/85 mb-7 font-sans font-light">{children}</p>
    </Reveal>
  );
}

function Interlude({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="my-20 md:my-28 text-center px-4">
        <div className="mx-auto flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-px bg-seal" />
          <Eye className="h-3.5 w-3.5 text-seal-soft" strokeWidth={1.4} />
          <div className="w-10 h-px bg-seal" />
        </div>
        <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-paper max-w-2xl mx-auto">{children}</p>
        <div className="mx-auto w-10 h-px bg-seal mt-10" />
      </div>
    </Reveal>
  );
}

function CTA({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="http://wa.me/5524999305490?text=Quero%20comprar%20o%20c%C3%B3digo%20cebraspe"
      className="inline-block border border-seal text-paper font-mono text-sm tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 hover:bg-seal/15 hover:tracking-[0.35em] active:scale-[0.97]"
    >
      {children}
    </a>
  );
}

/* ---------- page ---------- */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground grain">
      {/* ===== Capa do Dossiê / Hero ===== */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0">
          <img src={ASSETS.hero} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-background" />
        </div>

        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-3">
            <img src={ASSETS.logo} alt="O Olho" className="h-9 w-9 object-contain" />
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-foreground/70">O Olho</span>
          </div>
          <span className="file-label hidden md:block">Dossiê Nº 001 — Uso restrito</span>
        </header>

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-3xl mx-auto px-6 md:px-8 py-20 text-center">
            <Reveal>
              <span className="stamp mb-10">Confidencial</span>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="display-heading text-4xl md:text-6xl leading-tight mt-8 mb-8 text-paper">
                Código Cebraspe
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="font-serif italic text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-xl mx-auto">
                Veja o que seu concorrente não vê.
                <br />
                Construa vantagem competitiva.
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-16 flex flex-col items-center gap-6">
                <p className="file-label">Relatório confidencial — a lógica oculta do Cebraspe</p>
                <a href="#arquivo-01" className="group flex flex-col items-center gap-2 text-foreground/60 hover:text-paper transition-colors duration-300">
                  <span className="font-mono text-xs tracking-[0.3em] uppercase">Abrir o dossiê</span>
                  <span className="text-seal-soft text-xl leading-none animate-bounce">↓</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Arquivo 01 — Observação Inicial ===== */}
      <section id="arquivo-01" className="py-24 md:py-36">
        <div className="max-w-2xl mx-auto px-6">
          <FileHeader num="01" title="Observação Inicial" meta="Registro de campo — caderno do investigador" />
          <P>
            Durante muito tempo, eu achei que o Cebraspe avaliava apenas conhecimento. Depois de meses olhando para dezenas de
            provas antigas e recentes, comecei a suspeitar que havia outra camada. Não era sobre as disciplinas. Era sobre a
            própria banca.
          </P>
          <P>
            Eu mudei completamente a forma como enxergava o Cebraspe. Durante muito tempo, eu estudei exatamente como todo
            mundo. Escolhia um bom curso, assistia às aulas, lia os PDFs, resolvia centenas de questões, fazia caderno de
            erros, revisava com flashcards e repetia o processo. Quanto mais eu estudava, mais acreditava que estava
            aumentando minhas chances de aprovação. Parecia lógico. E talvez tenha sido assim durante muito tempo.
          </P>
          <P>
            Mas existe um detalhe curioso. Hoje, praticamente todo candidato competitivo faz exatamente a mesma coisa. Os
            melhores cursos estão disponíveis para qualquer um comprar. Os melhores professores. Tudo isso nunca foi tão
            acessível e democratizado. Que bom, né? Mas eu comecei a me questionar: se quase todos os candidatos de alto
            nível estudam pelos mesmos materiais, com os mesmos métodos de estudo e de revisão, qual é a diferença entre quem
            fica nas cabeças e entre quem fica só algumas posições abaixo da nota de corte?
          </P>
          <P>
            Passei muito tempo tentando responder essa pergunta olhando para o lugar errado. Eu continuava procurando a
            resposta no conteúdo. Até perceber uma coisa: talvez a vantagem nunca tenha estado apenas no que eu estudava ou em
            quantas horas líquidas eu me dedicava. Talvez ela estivesse na forma como eu olhava para a própria prova. Foi aí
            que percebi algo que, hoje, parece óbvio: passei anos tentando entender as respostas da banca (por que eu errei a
            questão?), quando deveria ter tentado entender quem fazia as perguntas (qual mecanismo a banca está usando?). E,
            curiosamente, quase ninguém parece estudar essa diferença.
          </P>

          <Interlude>
            Existe uma enorme diferença entre conhecer uma matéria...
            <br />
            <br />
            ...e compreender a lógica da banca examinadora para acertar a resposta na hora H.
          </Interlude>

          <P>
            E se essa diferença realmente existe, ela muda completamente a maneira como qualquer candidato deveria se
            preparar. Porque, nesse caso, estudar apenas o conteúdo deixa de ser suficiente. Você também precisa aprender a
            estudar o jogo.
          </P>

          <Reveal>
            <div className="text-center mt-14">
              <RedactedLines widths={["82%", "64%", "91%", "45%"]} />
              <p className="file-label">Trecho suprimido — prossiga para o Arquivo 02</p>
              <span className="text-seal-soft text-xl block mt-4">↓</span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="file-divider max-w-4xl mx-auto" />

      {/* ===== Arquivo 02 — A Anatomia da Decisão ===== */}
      <section className="py-24 md:py-36">
        <div className="max-w-2xl mx-auto px-6">
          <FileHeader num="02" title="A Anatomia da Decisão: Desvendando o Sistema Cebraspe" />
          <P>
            A maioria dos candidatos acredita que está estudando para a prova. Talvez não esteja. Pense em uma partida de
            xadrez. Você pode decorar exatamente como cada peça se movimenta, saber o valor de um bispo, conhecer todas as
            regras do jogo. Ainda assim, perder para alguém que enxerga o tabuleiro de uma forma diferente. O problema nunca
            foi conhecer as peças. Foi não perceber que existia uma lógica conectando todas elas.
          </P>
          <P>
            Com o Cebraspe acontece algo parecido. Durante anos fomos ensinados a estudar disciplinas. Fazer ciclos de estudo.
            Cada matéria dentro da sua própria caixinha. Mas a banca não pensa em caixas. Ela pensa no todo. Ela não escreve
            uma questão isolada. Ela constrói um ecossistema avaliativo. Pode parecer a mesma coisa. Até o dia em que você
            percebe que ela influencia absolutamente tudo: a ordem das questões, a forma como uma alternativa é escrita, as
            inversões frasais que confundem o candidato, o tipo de erro mais frequente, o momento em que uma afirmação parece
            correta... até uma única palavra mudar completamente o sentido dela.
          </P>

          <Reveal>
            <figure className="my-14">
              <img src={ASSETS.mapa} alt="Mapa de conexões e padrões" className="w-full border border-border" />
              <figcaption className="file-label mt-3 text-center">Anexo 02-A — padrões observados entre provas</figcaption>
            </figure>
          </Reveal>

          <P>
            É curioso. Passamos centenas de horas líquidas tentando prever e entender o conteúdo que vai cair na prova. Mas
            nenhum minuto tentando entender quem decide como esse conteúdo será cobrado. Talvez seja por isso que tantos
            candidatos saem da prova dizendo exatamente a mesma frase: "Poxa, eu sabia a matéria... mas errei por detalhes."
            Será que eram apenas detalhes? Ou será que você está chamando de detalhe algo que nunca aprendeu a observar?
          </P>
          <P>
            Porque existe uma diferença enorme entre esquecer um conceito e interpretar uma questão da forma como ela foi
            construída para ser interpretada. São habilidades diferentes. E, se forem habilidades diferentes, talvez exijam
            preparações diferentes. Foi essa hipótese que começou a me perseguir. E, quanto mais provas eu analisava, mais
            difícil ficava acreditar que tudo aquilo era fruto do acaso. Algumas estruturas reapareciam. Alguns padrões
            sobreviviam ao tempo. Algumas armadilhas mudavam de assunto, mas preservavam exatamente a mesma lógica.
          </P>
          <P>
            A pergunta deixou de ser: "O que a banca está cobrando?" E passou a ser outra. Muito mais incômoda: "O que a
            banca está tentando descobrir sobre quem responde esta questão?" Foi nesse momento que eu parei de olhar apenas
            para a prova. E comecei a observar a mente que existia por trás dela.
          </P>

          <Interlude>
            Foi aí que o Cebraspe deixou de parecer uma coleção de questões de certo ou errado... e começou a parecer um
            sistema que poderia ser compreendido.
          </Interlude>
        </div>
      </section>

      <div className="file-divider max-w-4xl mx-auto" />

      {/* ===== Arquivo 03 — O Código ===== */}
      <section className="py-24 md:py-36">
        <div className="max-w-2xl mx-auto px-6">
          <FileHeader num="03" title="O Código: A Chave para a Vantagem Inesperada" />
          <P>
            Existe uma razão para algumas pessoas saírem da prova dizendo: "Parecia que eu conhecia aquela questão." Repare na
            escolha das palavras: "Parecia." Quase nunca elas dizem: "Eu nunca estudei esse assunto." Na maioria das vezes, o
            conteúdo estava lá. O conceito também. A legislação havia sido lida. A teoria fazia sentido. Mesmo assim, alguma
            coisa aconteceu entre o momento da leitura e o momento da marcação. É um intervalo de poucos segundos. Silencioso.
            Invisível. Mas é ali que muitas provas começam a ser decididas.
          </P>
          <P>
            Porque responder uma questão não depende apenas do que você sabe. Depende da decisão que você toma diante daquilo
            que sabe. Pense em quantas vezes você já viveu algo parecido: você lê um item, marca "certo", alguns minutos
            depois volta e muda para "errado". Quando sai o gabarito, sua primeira marcação estava correta. O conhecimento não
            mudou. O que mudou foi a decisão.
          </P>
          <P>
            Agora imagine que isso acontece dezenas de vezes ao longo de uma prova inteira. De repente, não estamos mais
            falando só de conteúdo. Estamos falando de comportamento. Estamos falando de percepção. Estamos falando da maneira
            como você reage quando a banca cria dúvida onde antes existia certeza. Talvez seja por isso que duas pessoas, com
            praticamente o mesmo nível de conhecimento, consigam resultados tão diferentes.
          </P>
          <P>
            Uma responde apenas à matéria. A outra também responde à forma como a questão foi construída. Ela percebe pequenas
            escolhas de linguagem. Reconhece padrões de construção. Entende quando vale a pena confiar na própria leitura. E,
            principalmente, aprende a identificar quando a banca está tentando provocar exatamente a reação que acabou de
            provocar em milhares de candidatos.
          </P>

          <Reveal>
            <figure className="my-14 grid grid-cols-2 gap-4 items-center">
              <img src={ASSETS.chave} alt="A chave" className="w-full border border-border" />
              <div className="pl-2">
                <p className="font-serif italic text-xl md:text-2xl text-paper leading-relaxed">
                  Não uma fórmula mágica. Nem um atalho.
                  <br />
                  Uma lógica.
                </p>
              </div>
            </figure>
          </Reveal>

          <P>
            Foi nesse ponto que minha investigação mudou completamente de direção. Eu parei de perguntar: "Como responder
            melhor?" E comecei a perguntar: "Como essa questão foi desenhada para influenciar quem a responde?" Essa simples
            mudança de pergunta abriu uma porta que eu nem sabia que existia. Porque, quando você deixa de olhar apenas para a
            resposta e começa a observar a engenharia da pergunta, algumas coincidências deixam de parecer coincidências.
          </P>
          <P>
            Você começa a perceber que determinadas estruturas se repetem. Que certos erros aparecem com frequência muito
            maior do que outros. Que alguns padrões atravessam anos de provas. E que, por trás de tudo isso, existe uma
            lógica. Não uma fórmula mágica. Nem um atalho. Uma lógica. E quem compreende essa lógica deixa de enfrentar cada
            questão como um evento isolado. Passa a enxergar a prova como aquilo que ela sempre foi: um sistema.
          </P>
        </div>
      </section>

      <div className="file-divider max-w-4xl mx-auto" />

      {/* ===== Arquivo 04 — Arquivos Confidenciais (conteúdo) ===== */}
      <section className="py-24 md:py-36 bg-card/40">
        <div className="max-w-3xl mx-auto px-6">
          <FileHeader num="04" title="Arquivos Confidenciais: O que você vai descobrir no Código Cebraspe" />
          <P>
            O Código Cebraspe não é um mero cursinho. É um acesso privilegiado a um dossiê estratégico sobre a banca Cebraspe.
            Aqui, eu não vou te encher de mais conteúdo teórico; você vai aprender a decifrar o jogo. Em cada arquivo, vou
            revelar as táticas e padrões matemáticos que funcionam. Você enxergará o que seu concorrente não vê.
          </P>

          <div className="mt-14 space-y-6">
            {[
              {
                ref: "A",
                title: "Fundamentos da Banca",
                items: [
                  "Como a Cebraspe funciona: estrutura das provas, número de questões, tipos (Certo/Errado, Múltipla Escolha, Sistemas Alternativos de Pontuação, Discursiva).",
                  "Prós e contras da banca, mitos e verdades.",
                ],
              },
              {
                ref: "B",
                title: "Estatística e Estratégia",
                items: [
                  "Lei dos grandes números e balanceamento de questões.",
                  "Mapeamento e valor esperado.",
                  "Índice de confiança: quando chutar e quando não chutar. A técnica 3x2 não vai te salvar.",
                  "A verdade sobre o chute: quanto mais você sabe, menos aleatório é o chute.",
                ],
              },
              {
                ref: "C",
                title: "Tomada de Decisão na Prova",
                items: [
                  "Índice de confiança.",
                  "Double check.",
                  "Resolução por rounds.",
                  "Gestão do tempo: tempo ideal por questão.",
                ],
              },
              {
                ref: "D",
                title: "Engenharia da Questão",
                items: [
                  "Erros clássicos e tipos de questões Cebraspe.",
                  "Tendências de certo e errado: descubra padrões que apontam para o gabarito.",
                  "Como a questão é construída: gatilhos de erro e padrões recorrentes.",
                ],
              },
              {
                ref: "E",
                title: "Planejamento de Estudos Estratégico",
                items: [
                  "Pré-edital e pós-edital: como estudar quando não se sabe qual será a banca e quando o edital sai.",
                  "Desmembramento de editais.",
                  "Revisão tradicional versus prática ativa: uso do modelo certo/errado como treinamento.",
                  "Simulados versus provas antigas?",
                ],
              },
              {
                ref: "F",
                title: "Inteligência Competitiva",
                items: [
                  "Tendências da banca para 2026-2027.",
                  "Jurisprudência da banca, mudanças observáveis e comportamentos recorrentes.",
                ],
              },
            ].map((file, i) => (
              <Reveal key={file.ref} delay={i * 60}>
                <div className="relative border border-border folder-texture p-7 md:p-9 mt-8 transition-colors duration-300 hover:border-seal/60">
                  <span className="folder-tab">Pasta 04-{file.ref}</span>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-serif text-2xl text-paper">{file.title}</h3>
                      <p className="file-label mt-2">Acesso restrito — membros de O Olho</p>
                    </div>
                    <Eye className="h-5 w-5 text-seal-soft/70 shrink-0 mt-1" strokeWidth={1.3} />
                  </div>
                  <ul className="space-y-2.5">
                    {file.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-foreground/80 font-light leading-relaxed">
                        <span className="text-seal-soft mt-0.5 select-none">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 flex items-center justify-center gap-4">
              <div className="file-divider flex-1" />
              <EyeSeal />
              <div className="file-divider flex-1" />
            </div>
            <p className="file-label text-center mt-4">Índice autenticado — O Olho, centro de inteligência</p>
          </Reveal>
        </div>
      </section>

      <div className="file-divider max-w-4xl mx-auto" />

      {/* ===== Arquivo 05 — O Olho ===== */}
      <section className="py-24 md:py-36">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Eye className="mx-auto h-10 w-10 text-seal-soft mb-8" strokeWidth={1} />
          </Reveal>
          <FileHeader num="05" title="O Olho: Sua Nova Identidade" meta="Carta de recrutamento — circulação interna" />
          <P>
            O Código Cebraspe é mais do que um treinamento; é a sua entrada para uma comunidade de inteligência estratégica:{" "}
            <strong className="text-paper font-medium">O Olho</strong>. Aqui, você não é apenas um concurseiro; você é um
            investigador. Você não decora; você decifra. Você não responde; você antecipa. Você estuda além da matéria; você
            estuda a banca. Essa é a identidade que você vai construir. A identidade de quem vê o que os outros não veem.
          </P>

          <Reveal>
            <figure className="my-14">
              <img src={ASSETS.carta} alt="O convite" className="w-full max-w-md mx-auto border border-border" />
              <figcaption className="file-label mt-3">Anexo 05-A — o convite</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ===== Acesso final ===== */}
      <section id="acesso" className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ASSETS.dossie} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-black/80 to-background" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <span className="stamp mb-10">Arquivo final — acesso restrito</span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display-heading text-3xl md:text-5xl text-paper mt-8 mb-8">Pronto para Decifrar o Jogo?</h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-base md:text-lg leading-loose text-foreground/85 font-light mb-6">
              Se você chegou até aqui, é porque a ideia de estudar o jogo, e não apenas o conteúdo, ressoa com você. É porque
              você sente que existe uma camada invisível na Cebraspe que a maioria ignora. O Código Cebraspe é a chave para
              desbloquear essa percepção. É o convite para um novo nível de preparação. É a sua vantagem competitiva.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="font-serif italic text-xl text-paper mb-12">
              Acesse o Código Cebraspe e comece sua investigação.
            </p>
          </Reveal>
          <Reveal delay={480}>
            <CTA>Desvendar o Código Cebraspe</CTA>
          </Reveal>
          <Reveal delay={600}>
            <p className="file-label mt-8">O acesso é registrado. Poucos chegam até este arquivo.</p>
          </Reveal>
        </div>
      </section>

      {/* ===== Rodapé ===== */}
      <footer className="border-t border-border py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={ASSETS.logo} alt="O Olho" className="h-7 w-7 object-contain" />
            <span className="file-label">O Olho — Centro de Inteligência</span>
          </div>
          <p className="file-label">© {new Date().getFullYear()} — Dossiê Nº 001 — Código Cebraspe</p>
        </div>
      </footer>
    </div>
  );
}
