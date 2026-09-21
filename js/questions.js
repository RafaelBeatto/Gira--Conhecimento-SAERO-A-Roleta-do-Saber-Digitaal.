// Banco de questões da V2.0 — Modo Solo
// Cada questão segue o formato:
// { categoria, dificuldade: "facil"|"medio"|"dificil", pergunta, alternativas: [...], resposta: <índice>, explicacao }
//
// As 40 primeiras questões são as mesmas do banco original (Modo Turma),
// agora categorizadas e com explicação adicionada. Nenhuma pergunta foi removida.

const CATEGORIAS = [
  { nome: "Matemática", emoji: "🧮", cor: "#3498db" },
  { nome: "Português", emoji: "📖", cor: "#e74c3c" },
  { nome: "Geografia", emoji: "🌎", cor: "#2ecc71" },
  { nome: "Ciências", emoji: "🔬", cor: "#f1c40f" },
  { nome: "História", emoji: "🏛️", cor: "#9b59b6" },
  { nome: "Conhecimentos Gerais", emoji: "🧠", cor: "#e67e22" },
  { nome: "Surpresa", emoji: "🎁", cor: "#1abc9c" } // sorteia uma categoria real na hora
];

const QUESTIONS_V2 = [
  // ===================== PORTUGUÊS (banco original) =====================
  {
    categoria: "Português",
    dificuldade: "facil",
    pergunta: `(D11)(SAERO). Leia o texto abaixo e responda.

Borboleta-da-praia

A borboleta-da-praia é uma espécie endêmica no estado do Rio de Janeiro. Até o ano de 1989, era o único inseto na lista oficial de espécies brasileiras ameaçadas de extinção.
Atualmente, esta mesma lista já ultrapassa mais de 200 outros nomes e não para de crescer.
O desaparecimento da borboleta-da-praia está sendo causado, principalmente, pela ocupação irregular de seu habitat natural cuja área abrange a região de restingas e lagoas salgadas.
Antes abundante em toda a costa fluminense, atualmente essa espécie é encontrada apenas em locais parcialmente preservados, como os brejos e as vegetações originais da Reserva Ecológica de Jacarepaguá (REEJ), situada no trecho da Praia de Massambaba, região dos lagos fluminenses, município de Saquarema, no Rio de Janeiro.
A alimentação básica dessa borboleta é o néctar da vegetação arbustiva da restinga, principalmente o cambará e o gervão. Seu hábito de voo ocorre normalmente pela manhã e à tardinha.
O tempo de vida da fêmea é em média 25 dias, quando deposita seus ovos sob as folhas Aristolochia macroura, uma planta venenosa. Tanto a Paridis ascanius como outras lindíssimas borboletas de restingas podem ser vistas nas áreas brejais da Reserva Ecológica de Jacarepaguá.
Disponível em: <http://www.adeja.org.br/borboleta.htm>. Acesso em: 20 set. 09.

Segundo esse texto, a causa principal do desaparecimento das borboletas da praia é:`,
    alternativas: [
      "a falta de restingas e lagoas salgadas.",
      "a falta de vegetação original na REEJ.",
      "a ocupação irregular de seu habitat natural.",
      "o isolamento dos locais de preservação.",
      "o pouco tempo de vida da borboleta fêmea."
    ],
    resposta: 2,
    explicacao: "O texto afirma diretamente que o desaparecimento é causado principalmente pela ocupação irregular do habitat natural da borboleta."
  },
  {
    categoria: "Português",
    dificuldade: "facil",
    pergunta: `(D11)(SAERJ). Leia o texto abaixo.

Desafio e resposta

“As árvores querem ficar quietas. Mas o vento as balança.” O provérbio chinês sintetiza o desafio enfrentado pelos jornais. Com o avanço da mídia eletrônica, os impressos pareciam resvalar para segundo plano na ordem dos meios de comunicação de massa. A notícia em tempo real foi vista como risco para a informação apurada, escrita com rigor e divulgada com exigências estéticas capazes de atrair o leitor. Não faltou quem anunciasse a morte dos periódicos. O papel não teria condições de competir com a rapidez e facilidades oferecidas pela internet.
Profecias catastróficas não constituem novidade no mundo cultural. A fotografia mataria a pintura. Não matou. A televisão mataria o rádio. Não matou. O videocassete mataria o cinema. Não matou. O jornal mataria o livro. Não matou. A internet mataria o jornal. Não matou. O tempo se encarregou de provar que os agouros não passavam de vaticínios de Cassandra. A razão: ao contrário da visão míope dos que rejeitam convivências, o novo agrega, não exclui.
Com a certeza de que as novas mídias ampliam as possibilidades do jornal, o Correio
Braziliense promoveu ousada reforma editorial.
Correio Braziliense, 21 Jun. 2009. Fragmento.

O trecho que indica a causa da mudança nos jornais impressos é:`,
    alternativas: [
      "“‘As árvores querem ficar quietas. Mas o vento as balança.’”. (1° parágrafo)",
      "“O provérbio chinês sintetiza o desafio enfrentado pelos jornais.”. (1° parágrafo)",
      "“Com o avanço da mídia eletrônica,...”. (1° parágrafo)",
      "“Não faltou quem anunciasse a morte dos periódicos.”. (1° parágrafo)",
      "“... o novo agrega, não exclui.”. (final do 2° parágrafo)"
    ],
    resposta: 2,
    explicacao: "O trecho 'Com o avanço da mídia eletrônica' indica a causa que levou à reforma editorial nos jornais impressos."
  },
  {
    categoria: "Português",
    dificuldade: "facil",
    pergunta: `(D8)(SPAECE). Leia o texto abaixo.

[...] O celular destruiu um dos grandes prazeres do século passado: prosear ao telefone.
Hoje, por culpa deles somos obrigados a atender chamadas o dia todo. Viramos uma espécie de telefonistas de nós mesmos: desviamos chamadas, pegamos e anotamos recados...
Depois de um dia inteiro bombardeado por ligações curtas, urgentes e na maioria das vezes irrelevantes, quem vai sentir prazer numa simples conversa telefônica? O telefone, que era um momento de relax na vida da gente, virou um objeto de trabalho.
O equivalente urbano da velha enxada do trabalhador rural. Carregamos o celular ao longo do dia como uma bola de ferro fixada no corpo, uma prova material do trabalho escravo.
O celular banalizou o ritual de conversa à distância. No mundo pré-celular, havia na sala uma poltrona e uma mesinha exclusivas para a arte de telefonar. Hoje, tomamos como num transe, andamos pelas ruas, restaurantes, escritórios e até banheiros públicos berrando sem escrúpulos num pedaço de plástico colorido.
Misteriosamente, uma pessoa ao celular ignora a presença das outras. Conta segredos de alcova dentro do elevador lotado. É uma insanidade. Ainda não denunciada pelos jornalistas, nem, estudada com o devido cuidado pelos médicos. Aliás, duas das classes mais afetadas pelo fenômeno.
A situação é delicada. [...]\nO Estado de S. Paulo, 29/11/2004.

Qual é o argumento que sustenta a tese defendida pelo autor desse texto?`,
    alternativas: [
      "A arte de telefonar se tornou prazerosa.",
      "A sociedade destruiu velhos costumes.",
      "A vida moderna priorizou o telefone.",
      "O celular elitizou todos os profissionais.",
      "O homem tornou-se escravo de celular."
    ],
    resposta: 4,
    explicacao: "O texto compara o celular a uma 'prova material do trabalho escravo', defendendo que o homem se tornou escravo do aparelho."
  },
  {
    categoria: "Português",
    dificuldade: "facil",
    pergunta: `(D8)(SEDUC-GO). Leia o texto abaixo e responda.

Amor à primeira vista

Papel, plástico, alumínio. Modernas embalagens industrializadas são essencialmente confeccionadas com essas três matérias-primas. Mas o resultado está longe de ser monótono.
Desde que os especialistas em vendas descobriram que a embalagem é um dos primeiros fatores que influenciam a escolha do consumidor, ela passou a ser estudada com mais atenção. Atualmente, estampa cores fortes, letras garrafais e formatos curiosos na tentativa de chamar a atenção nas prateleiras dos supermercados. Produtos infantis, por exemplo, apelam para desenhos animados ou super-heróis da moda para derrubar a concorrência. Provavelmente é o caso do achocolatado que você toma de manhã, do queijinho suíço do meio da tarde e até mesmo da sopinha da noite.
Essas embalagens despertam o interesse dos consumidores muitas vezes, eles levam o produto para casa mais porque gostaram de sua roupagem do que pelo fato de apreciarem o conteúdo. [...]

Um argumento que sustenta a tese de que “a embalagem agora é uma forma de conquistar o consumidor” é que`,
    alternativas: [
      "a embalagem passou a ser mais bem cuidada.",
      "a embalagem tem formatos muito curiosos.",
      "a embalagem objetiva vestir bem os produtos.",
      "os produtos infantis trazem os super-heróis.",
      "os consumidores são atraídos pela embalagem"
    ],
    resposta: 4,
    explicacao: "O texto afirma que os consumidores muitas vezes levam o produto por gostarem da embalagem — ou seja, são atraídos por ela."
  },
  {
    categoria: "Português",
    dificuldade: "medio",
    pergunta: `(D19)(SAEPE). Leia o texto abaixo e responda.

A melhor amiga do homem
Diogo Schelp

Devemos muito à vaca. Mas há quem a veja como inimiga. A vaca, aqui referida como a parte pelo todo bovino, é acusada de contribuir para a degradação do ambiente e para o aquecimento global. Cientistas atribuem ao 1,4 bilhão de cabeças de gado existentes no mundo quase metade das emissões de metano, um dos gases causadores do efeito estufa. Acusam-se as chifrudas de beber água demais e ocupar um espaço precioso para a agricultura.
O truísmo inconveniente é que homem e vaca são unha e carne. [...] Imaginar o mundo sem vacas é como desejar um planeta livre dos homens – uma ideia, aliás, vista com simpatia por ambientalistas menos esperançosos quanto à nossa espécie. “Alterar radicalmente o papel dos bovinos no nosso cotidiano, subtraindo-lhes a importância econômica, pode levá-los à extinção e colocar em jogo um recurso que está na base da construção da humanidade e, por que não, de seu futuro”, diz o veterinário José Fernando Garcia, da Universidade Estadual Paulista em Araçatuba. [...]
A vaca tem um papel econômico crucial até onde é considerada animal sagrado. Na Índia, metade da energia doméstica vem da queima de esterco. O líder indiano Mahatma Gandhi (1869-1948), que, como todo hindu, não comia carne bovina, escreveu: “A mãe vaca, depois de morta, é tão útil quanto viva”. Nos Estados Unidos, as bases da superpotência foram estabelecidas quando a conquista do Oeste foi dada por encerrada, em 1890, fazendo surgir nas Grandes Planícies americanas o maior rebanho bovino do mundo de então. “Esse estoque permitiu que a carne se tornasse, no século seguinte, uma fonte de proteína para as massas, principalmente na forma de hambúrguer”, escreveu Florian Werner. [...] Comer um bom bife é uma aspiração natural e cultural. Ou seja, nem que a vaca tussa a humanidade deixará de ser onívora.

O autor usa a parte pelo todo para se referir à vaca em:`,
    alternativas: [
      "“Acusam-se as chifrudas...”. (final do 1° parágrafo)",
      "“...homem e vaca são unha e carne”. (2° parágrafo)",
      "“...o papel dos bovinos...”. (2° parágrafo)",
      "“...animal sagrado.”. (2° parágrafo)",
      "“...nem que a vaca tussa...”. (final do último parágrafo)"
    ],
    resposta: 0,
    explicacao: "Em 'as chifrudas', a expressão usa uma característica das vacas (os chifres) para se referir a elas — a parte pelo todo."
  },
  {
    categoria: "Português",
    dificuldade: "facil",
    pergunta: `(D11)(SAEPE). Leia o texto abaixo e responda.

O torcedor

No jogo de decisão do campeonato, Eváglio torceu pelo Atlético Mineiro, não porque fosse atleticano ou mineiro, mas porque receava o carnaval nas ruas se o Flamengo vencesse. Visitava um amigo em bairro distante, nenhum dos dois tem carro, e ele previa que a volta seria problema.
O Flamengo triunfou, e Eváglio deixou de ser atleticano para detestar todos os clubes de futebol, que perturbam a vida urbana com suas vitórias. Saindo em busca de táxi inexistente, acabou se metendo num ônibus em que não cabia mais ninguém, e havia duas bandeiras rubro-negras para cada passageiro. E não eram bandeiras pequenas nem torcedores exaustos: estes pareciam terem guardado a capacidade de grito para depois da vitória.
Eváglio sentiu-se dentro do Maracanã, até mesmo dentro da bola chutada por 44 pés. A bola era ele, embora ninguém reparasse naquela esfera humana que ansiava por tornar a ser gente a caminho de casa.
Lembrando-se de que torcera pelo vencido, teve medo, para não dizer terror. Se lessem em seu íntimo o segredo, estava perdido. Mas todos cantavam, sambavam com alegria tão pura que ele próprio começou a sentir um pouco de Flamengo dentro de si. Era o canto?
Eram braços e pernas falando além da boca? A emanação de entusiasmo o contagiava e transformava. Marcou com a cabeça o acompanhamento da música. Abriu os lábios, simulando cantar. Cantou. [...] Estava batizado, crismado e ungido: uma vez Flamengo, sempre Flamengo.
O pessoal desceu na Gávea, empurrando Eváglio para descer também e continuar a festa, mas Eváglio mora em Ipanema, e já com o pé no estribo se lembrou. Loucura continuar Flamengo [...] Segurou firme na porta, gritou: “Eu volto, gente! Vou só trocar de roupa” e, não se sabe como, chegou intacto ao lar, já sem compromisso clubista.

Qual é a causa da transformação de Eváglio em torcedor?`,
    alternativas: [
      "A alegria contagiante dos torcedores.",
      "A inexistência de táxi após o jogo.",
      "A promessa de Eváglio aos torcedores.",
      "O campeonato conquistado pelo time carioca.",
      "O desembarque de Eváglio com os torcedores."
    ],
    resposta: 0,
    explicacao: "É a alegria contagiante e o canto dos torcedores no ônibus que faz Eváglio, aos poucos, sentir-se Flamengo também."
  },
  {
    categoria: "Português",
    dificuldade: "facil",
    pergunta: `(D11)(PAEBES). Leia o texto abaixo.

O que está acontecendo com a natureza?

Terremotos, inundações, tsunamis ocorrem com grande frequência, em todas as partes do planeta, como nunca foi registrado nessa mesma intensidade. Os cientistas têm se empenhado em buscar outros fatores, mas a resposta está diante dos olhos de todos – é o homem quem está contribuindo, e muito, para todo esse cenário de tragédias, ceifando, ao longo dos anos, centenas de milhares de vítimas. Ou seja, o homem pode ser a vítima e também o causador de tantas tragédias que estão se alastrando com muita velocidade.
[...] O homem, de uma forma geral, é o grande culpado de todo o desequilíbrio ecológico, desde o aquecimento global, até a negligência de um prefeito que simplesmente decidiu não limpar as galerias, o que contribuiu, e muito, para a tragédia. Quem responderá por isso? E até quando isso acontecerá?

De acordo com esse texto, as tragédias naturais são causadas, de forma geral, pelo:`,
    alternativas: [
      "aquecimento global.",
      "desequilíbrio ecológico.",
      "homem.",
      "planeta.",
      "prefeito negligente."
    ],
    resposta: 2,
    explicacao: "O texto afirma claramente que é o homem quem está contribuindo para o cenário de tragédias naturais."
  },
  {
    categoria: "Português",
    dificuldade: "dificil",
    pergunta: "(D20) (SAEPE). Leia o texto abaixo.\n\nManeira de amar\n\nO jardineiro conversava com as flores, e elas se habituaram ao diálogo. Passava manhãs contando coisas a uma cravina ou escutando o que lhe confiava um gerânio. O girassol não ia muito com sua cara, ou porque não fosse homem bonito, ou porque os girassóis são orgulhosos de natureza. Em vão o jardineiro tentava captar-lhe as graças, pois o girassol chegava a voltar-se contra a luz para não ver o rosto que lhe sorria. Era uma situação bastante embaraçosa, que as outras flores não comentavam. Nunca, entretanto, o jardineiro deixou de regar o pé de girassol e de renovar-lhe a terra, na ocasião devida.\nANDRADE, Carlos Drummond de. Maneira de amar. In: Histórias para o Rei. Rio de Janeiro: Record, 1999, p. 52.\n\nO conflito dessa narrativa se inicia com:",
    alternativas: [
      "a antipatia do girassol pelo jardineiro",
      "a ausência de comentários das outras flores",
      "a recusa do girassol em voltar-se para a luz",
      "o diálogo do jardineiro com as flores",
      "o relacionamento entre o gerânio e o jardineiro"
    ],
    resposta: 0,
    explicacao: "O conflito surge porque o girassol não gosta do jardineiro e evita olhá-lo, virando-se contra a luz para não vê-lo."
  },
  {
    categoria: "Português",
    dificuldade: "facil",
    pergunta: `(D8)(SEAPE). Leia o texto abaixo.

MIB³ – Homens de Preto 3

Eis uma aposta arriscada: reconvocar os Homens de Preto, quase uma década depois da decepcionante continuação que afundou a franquia, para, com um dos orçamentos mais inflados da história do cinema [...], recuperar o charme excêntrico e empolgante do original de 97. Passaram-se 15 anos deste, e Will Smith e Tommy Lee Jones retornam como os agentes J e K. Pensando friamente, é um prognóstico desanimador, mas MIB³ – Homens de Preto 3 é um exemplar bem-sucedido da retomada da inventividade e da satisfatória dinâmica dos protagonistas, as qualidades que conquistaram o público (e a mim) muitos anos atrás. [...]
Apesar do longo hiato, a narrativa mantém intactos os melhores elementos do original, como a postura carrancuda de K, insensivelmente divertida no discurso de morte de Zed, e a boa química entre a dupla de agentes. Reproduzindo criativamente um salto no tempo, embora os efeitos especiais deixem a desejar, o filme acerta no casting do interessante Josh Brolin, que reproduz fielmente a entonação da voz texana de Tommy Lee Jones e os maneirismos de sua atuação [...].
No entanto, é impossível ignorar os enormes e grosseiros furos narrativos causados por um roteirista claramente incapaz de lidar com o conceito de viagem no tempo. [...]
Entretanto, a direção de Barry Sonnenfeld é suficientemente ágil para que não pensemos (muito) nos tropeços narrativos. Dosando o humor, ação e drama adequadamente [...], o cineasta desenvolveu uma aventura descompromissada [...].
Embora improvável que a aposta dos produtores tenha resultados além do morno, Homens de Preto 3 é bom o bastante para “neuralizar” o desastre do último episódio e manter uma lembrança agradável de J, K e esta inusitada agência secreta.

Nesse texto, sobre a tese de que o filme Homens de Preto 3 é bem-sucedido, há um argumento em:`,
    alternativas: [
      "“... com um dos orçamentos mais inflados da história do cinema...”. (1° parágrafo)",
      "“... Will Smith e Tommy Lee Jones retornam...”. (1° parágrafo)",
      "“... a narrativa mantém intactos os melhores elementos do original...”. (2° parágrafo)",
      "“... embora os efeitos especiais deixem a desejar...”. (2° parágrafo)",
      "“... é impossível ignorar os enormes e grosseiros furos narrativos...”. (3° parágrafo)"
    ],
    resposta: 2,
    explicacao: "Dizer que a narrativa mantém os melhores elementos do original é um argumento a favor do sucesso do filme."
  },
  {
    categoria: "Português",
    dificuldade: "medio",
    pergunta: `(D19)(Seduc-GO). Leia o texto abaixo.

Trem de ferro

Café com pão
Café com pão
Café com pão
Virge maria que foi isso maquinista?
Agora sim
Café com pão
Agora sim
Voa, fumaça
Corre, cerca
Ai seu foguista
Bota fogo
Na fornalha
Que eu preciso
Muita força
Muita força
Muita força
Oô...
Menina bonita
Do vestido verde
Me dá tua boca
Pra matá minha sede
Oô...
Vou mimbora
Vou mimbora
Não gosto daqui
Nasci no sertão
Sou de Ouricuri
Oô...
Vou depressa
Vou correndo
Vou na toda
Que só levo
Pouca gente
Pouca gente
Pouca gente...

A expressão “café com pão”, repetida por três vezes no início do poema, sugere:`,
    alternativas: [
      "o barulho do trem.",
      "a voz do maquinista.",
      "a conversa dos passageiros.",
      "a voz da menina bonita.",
      "o linguajar do povo do sertão."
    ],
    resposta: 0,
    explicacao: "A repetição de 'café com pão' imita, pelo ritmo, o som das rodas do trem sobre os trilhos."
  },
  {
    categoria: "Português",
    dificuldade: "medio",
    pergunta: `(D19)(VELOSO, Caetano). Leia o texto abaixo.

Você não entende nada

Quando eu chego em casa nada me consola
Você está sempre aflita
Com lágrimas nos olhos de cortar cebola
Você é tão bonita

Você traz coca-cola
Eu tomo
Você bota a mesa
Eu como eu como eu como eu como eu como
Você
Não tá entendendo quase nada do que eu digo
Eu quero é ir-me embora
Eu quero dar o fora
E quero que você venha comigo

Eu me sento
Eu fumo
Eu como
Eu não agüento
Você está tão curtida
Eu quero é tocar fogo nesse apartamento
Você não acredita
Traz meu café com suíta
Eu tomo
Bota a sobremesa
Eu como eu como eu como eu como eu como
Você
Tem que saber que eu quero é correr mundo
Correr perigo
Eu quero é ir-me embora
Eu quero dar o fora
E quero que você venha comigo.

A repetição da expressão “eu quero”, em diversos versos, tem por objetivo:`,
    alternativas: [
      "fazer associações de sentido.",
      "refutar argumentos anteriores.",
      "detalhar sonhos e pretensões.",
      "apresentar explicações novas.",
      "reforçar a expressão dos desejos."
    ],
    resposta: 4,
    explicacao: "A repetição de 'eu quero' insiste e reforça os desejos do eu lírico de ir embora."
  },
  {
    categoria: "Português",
    dificuldade: "medio",
    pergunta: `(D18)(SAEMS). Leia o texto abaixo.

As formigas

Foi a coisa mais bacana a primeira vez que as formigas conversaram com ele. Foi a que escapuliu de procissão que conversou: ele estava olhando para ver aonde que ela ia, e aí ela falou para ele não contar para o padre que ela tinha escapulido – o padre ele já tinha visto que era o formigão da frente, o maior de todos, andando posudo.
Isso aconteceu numa manhã de muita chuva em que ele ficara no quentinho das cobertas com preguiça de se levantar, virado para o outro canto, observando as formigas descendo em fila na parede. Tinha um rachado ali perto por causa da chuva, era de lá que elas saíam, a casa delas.
Toda manhã aquela chuva sem parar, pingando na lata velha lá fora no jardim, barulinho gostoso que ele ficava ouvindo, enrolado no cobertor, olhando as formigas e conversando com elas, o quarto meio escuro, tudo escuro de chuva.
A conversa ficava interessante quando ele lembrava de perguntar uma porção de coisas e elas também perguntavam pra ele. (Conversavam baixinho para os outros não escutarem.)
Uma tarde entrou no quarto e viu a mancha de cimento novo na parede, brutal, incompreensível.
– Pra que que o senhor fez isso? Pra que o senhor fez assim com minhas formigas?
O pai não entendia, e o menino chorando, chorando.

Nesse texto, a repetição “... chorando, chorando.” sugere:`,
    alternativas: [
      "atitude fingida.",
      "anúncio de rebeldia.",
      "progressão da tristeza.",
      "sensação de culpa.",
      "sinal de fraqueza."
    ],
    resposta: 2,
    explicacao: "A repetição 'chorando, chorando' expressa a tristeza do menino aumentando aos poucos."
  },
  {
    categoria: "Português",
    dificuldade: "medio",
    pergunta: `(D18)(SAEPE). Leia o texto abaixo.

A brasileira Sandra Maria Feliciano Silva, 51, moradora de Porto Velho (RO), está entre os cem candidatos pré-selecionados para uma missão que pretende colonizar Marte em 2025, informou a fundação Mars One, que organiza a expedição.
De um total inicial de mais de 202 mil candidatos inscritos em 2013, apenas cem restaram na terceira seletiva da Mars One. Uma segunda fase de seleção já havia reduzido esse número para 1.058 candidatos.
“O grande corte de candidatos é um passo importante para sabermos quem tem as qualidades certas para ir a Marte”, disse em comunicado Bas Lansdorp, cofundador e diretor-executivo da fundação.
No perfil divulgado pela Mars One, Sandra afirma ser formada em administração e direito.
Ela também é professora [...] especialista em segurança pública.
A candidata também mantém uma página no Facebook sobre aquários. Ela escreveu um livro de ficção chamado “Os Ancestrais”, publicado em dezembro passado. Entre os temas de interesse dela estão astronomia, física, biologia, administração de crise e ecologia de sistemas fechados.
Em um vídeo divulgado pela fundação, Sandra diz que tem “a coragem e o espírito certos” para participar desta missão.

Nesse texto, no trecho “... para participar desta missão.” a expressão destacada refere-se ao fato de:`,
    alternativas: [
      "colonizar Marte.",
      "escrever um livro de ficção.",
      "formar em direito.",
      "manter uma página sobre aquário.",
      "ser professora."
    ],
    resposta: 0,
    explicacao: "'Esta missão' retoma o assunto central do texto: a missão de colonizar Marte."
  },
  {
    categoria: "Português",
    dificuldade: "dificil",
    pergunta: `(D18)(Seduc-GO). Leia o texto abaixo.

Choro
Rubem Braga

Eram todos negros: uma viola, um clarinete, um pandeiro e uma cabaça. Juntaram-se na varandinha de uma casa abandonada e ali ficaram chorando valsas, repinicando sambas. E a gente veio se ajuntando, calada, ouvindo. Alguém mandou no botequim da esquina trazer cerveja e cachaça. E em pé na calçada, ou sentados no chão da varanda, ou nos canteiros do jardinzinho, todos ficamos em silêncio ouvindo os negros.
Os que ouviam não batiam palmas nem pediam música nenhuma; ficavam simplesmente bebendo em silêncio aquele choro, o floreio do clarinete, o repinicado vivo e triste da viola.
Só essa música que nos arrasta e prende, nos dá alegria e tristeza, nos leva a outras noites de emoções – e grátis. Ainda há boas coisas grátis, nesta cidade de coisas tão caras e de tanta falta de coisas. Grátis – um favor dos negros.
Alma grátis, poesia grátis, duas horas de felicidade grátis – sim, só da gente do povo podemos esperar uma coisa assim nesta cidade de ganância e de injustiça. Só o pobre tem tanta riqueza para dar de graça.

Que efeito de sentido percebe-se no trecho “... ficavam simplesmente bebendo em silêncio aquele choro (...)”?`,
    alternativas: [
      "Descrição do comportamento das pessoas.",
      "Convite para as pessoas se ajuntarem.",
      "Ordem expressão por imperativos.",
      "Mistura de sentidos: paladar e audição.",
      "Descrição do ambiente físico."
    ],
    resposta: 3,
    explicacao: "'Bebendo' (paladar) aplicado à música (audição) é uma sinestesia — mistura de sentidos diferentes."
  },
  {
    categoria: "Português",
    dificuldade: "medio",
    pergunta: `(D15)(SPAEECE). Leia o texto abaixo.

Entenda sua letra

Ana Cecília Amado Sette, psicopedagoga especializada em grafologia (técnica que analisa o perfil da personalidade por meio da escrita), há trinta anos pesquisa e trabalha para grandes empresas, elaborando laudos psicológicos sobre profissionais e candidatos a empregos. A especialista  explica que, assim como os rabiscos, a letra tem o poder de revelar o caráter e os atributos das pessoas. “A escrita é o resultado de processos neurológicos, físicos, psíquicos e emocionais, numa perfeita combinação entre cérebro, na sua forma concreta, e mente, no seu lado abstrato”, define a grafóloga.
Quando se requisita um teste escrito para avaliação de um candidato a promoção ou admissão para um cargo, a redação é obrigatória. Em geral, os pretendentes sabem que serão analisados, e a maior preocupação é causar boa impressão, seja no aspecto formal como no pessoal. Contudo, depois de alguns minutos, a escrita se torna automática e inconsciente: é a partir daí que se colhem as informações que escapariam do campo de observações dos melhores entrevistadores.
Conforme Ana Cecília, num texto de uma página e meia, um grafólogo é capaz de identificar mais de 300 particularidades. A letra revela desde doenças, dependências químicas e dramas familiares, até energia, equilíbrio emocional, empreendedorismo, capacidade de comunicação e relacionamento interpessoal, concentração, flexibilidade, além de iniciativa e organização entre outros. “Os índices de acerto são impressionantes, chegando a 90%”, informa a especialista.

No trecho “A especialista explica que, assim como os rabiscos, ... “ a palavra destacada estabelece relação semântica de:`,
    alternativas: [
      "causa.",
      "comparação.",
      "conformidade.",
      "consequência.",
      "proporção."
    ],
    resposta: 1,
    explicacao: "'Assim como' estabelece uma relação de comparação entre a escrita e os rabiscos."
  },
  {
    categoria: "Português",
    dificuldade: "dificil",
    pergunta: `(D20)(PAEBES). Leia os textos abaixo.

Texto 1
Olhos Verdes
[...] Como se lê num espelho
Pude ler nos olhos seus!
Os olhos mostram a alma,
Que as ondas postas em calma
Também refletem os céus;
Mas, ai de mim!
Nem já sei qual fiquei sendo
Depois que os vi! [...]

Texto 2
A leitura do mundo precede a leitura da palavra, daí que a posterior leitura desta não pode prescindir da continuidade da leitura daquele (A palavra que eu digo sai do mundo que estou lendo, mas a palavra que sai do mundo que eu estou lendo vai além dele). [...] Se for capaz de escrever minha palavra estarei, de certa forma, transformando o mundo. O ato de ler o mundo implica uma leitura dentro e fora de mim. Implica na relação que eu tenho com esse mundo.

Um aspecto comum a esses dois textos é:`,
    alternativas: [
      "a escolha da palavra na escrita.",
      "a importância dos olhos para a leitura.",
      "a mudança da leitura com o tempo.",
      "as transformações ocorridas no mundo.",
      "as várias possibilidades de leitura."
    ],
    resposta: 4,
    explicacao: "Os dois textos tratam de diferentes formas de 'ler' — pelos olhos e pelo mundo — mostrando várias possibilidades de leitura."
  },
  {
    categoria: "Português",
    dificuldade: "dificil",
    pergunta: `(D20)(S/AEPE). Leia os textos abaixo.

Texto 1
Graduação

Para ingressar no mercado, o perito forense computacional (não se assuste, é assim que um caçador de hackers é chamado oficialmente) precisa ter algum curso superior completo. Mas, como a profissão é nova, ainda não existem faculdades específicas. Ou seja, vale formação superior em qualquer curso. Mas, claro, algumas formações podem lhe dar conhecimentos mais adequados. Engenharia eletrônica e ciências da computação garantem boas ferramentas técnicas e direito ajuda muito na hora de produzir laudos que, em seguida, são analisados por juízes e advogados.

Texto 2
Onde trabalhar

O perito tem quatro possibilidades de emprego:
• ser contratado por uma empresa de consultoria, que é chamada quando pinta um problema em outra empresa;
• ser perito da Polícia Federal ou Estadual, que mantém seu próprio corpo de especialistas;
• ser autônomo e ser convocado pelo juiz de um tribunal ou por alguma pessoa ou empresa para trabalhar num caso específico;
• trabalhar em uma empresa para fazer segurança virtual preventiva. Ou seja, proteger os sistemas antes de serem atacados por hackers.

Um aspecto comum a esses dois textos é:`,
    alternativas: [
      "Divulgam as possibilidades de uma nova profissão.",
      "Existem múltiplas possibilidades de trabalho para o perito.",
      "Ambos destacam a importância da ética profissional.",
      "A profissão depende de cursos técnicos especializados.",
      "Apenas engenheiros podem atuar como peritos."
    ],
    resposta: 0,
    explicacao: "Os dois textos, juntos, divulgam informações sobre a nova profissão de perito forense computacional."
  },
  {
    categoria: "Português",
    dificuldade: "medio",
    pergunta: "(D19) (SAEPE). Leia o texto abaixo.\n\nA namorada\n\nHavia um muro alto entre nossas casas.\nDifícil de mandar recado para ela.\nNão havia e-mail.\nO pai era uma onça.\nA gente amarrava o bilhete numa pedra presa por um cordão\nE pinchava a pedra no quintal da casa dela.\nSe a namorada respondesse pela mesma pedra\nEra uma glória!\nMas por vezes o bilhete enganchava nos galhos da goiabeira\nE então era agonia.\nNo tempo do onça era assim.\nBARROS, Manoel de. Tratado geral das grandezas do ínfimo. Rio de Janeiro: Record, 2001, p. 17.\n\nNos versos “Era uma glória!” (v. 9) e “E então era agonia.” (v. 12), o emprego das palavras destacadas sugere:",
    alternativas: [
      "aproximação de ações",
      "comparação",
      "concordância de ideias",
      "exagero",
      "oposição de sentimento"
    ],
    resposta: 3,
    explicacao: "'Glória' e 'agonia' são expressões exageradas para descrever a alegria e a decepção causadas pelo bilhete."
  },
  {
    categoria: "Português",
    dificuldade: "medio",
    pergunta: "(D18) (PROEB). Leia o texto abaixo.\n\nComo surgiram o Dia das Mães e outros feriados comerciais?\nMarina Montomura\n\nNa verdade, o Dia das Mães não tem uma origem comercial. Desde a Grécia antiga, havia celebrações na entrada da primavera, em homenagem a Reia, mãe de Zeus e considerada matriarca de todos os deuses. Mas essa festa ancestral se perdeu, e o Dia das Mães atual só surgiu no início do século passado, nos Estados Unidos, como homenagem às mulheres que haviam perdido os filhos na Guerra Civil Americana. A americana Anna Jarvis conseguiu oficializar primeiro o feriado em sua cidade, Webster, depois no estado de Virgínia Ocidental e, em 1914, o feriado se tornou nacional em todo o país. No Brasil, a data começou a ser comemorada sob influência americana – foi introduzida pela Associação Cristã de Moços (ACM) em 1918 – e, em 1932, foi oficializada pelo presidente Getúlio Vargas. Só em 1949, a data ficou mais comercial, quando rolaram propagandas para aumentar as vendas. Outros feriados, que têm uma origem “nobre” fora do Brasil e aqui ganharam caráter mais comercial, são o Dia dos Namorados, Dia da Criança e o Dia dos Pais.\nMundo Estranho. São Paulo: Abril, ed. 87, p. 34. *Adaptado: Reforma Ortográfica.\n\nNo trecho “... o feriado se tornou nacional em todo o país.”, o termo destacado expressa:",
    alternativas: [
      "alteração de estado",
      "continuidade de estado",
      "manutenção de estado",
      "repetição de estado",
      "valorização de estado"
    ],
    resposta: 0,
    explicacao: "'Tornou-se nacional' indica que o feriado passou de local para nacional — uma mudança (alteração) de estado."
  },
  {
    categoria: "Português",
    dificuldade: "facil",
    pergunta: `Leia o texto e responda a questão.

Por que milho não vira pipoca?

Não importa a maneira de fazer a pipoca. Sempre que se chega ao final do saquinho, lá estão os duros e ruidosos grãos de milho que não estouraram. Essas bolinhas irritantes, que já deixaram muitos dentistas ocupados, estão com os dias contados. Cientistas norte-americanos dizem que agora sabem por que alguns grãos de milho de pipoca resistem ao estouro.

Há algum tempo já se sabe que o milho de pipoca precisa de umidade no seu núcleo de amido, cerca de 15%, para explodir. Mas pesquisadores da Universidade Purdue descobriram que a chave para um bem sucedido estouro do milho está na casca.

É indispensável uma excelente estrutura de casca para que o milho estoure. Cascas danificadas impedem que a umidade faça a pressão necessária para que o milho vire pipoca. “Se muita umidade escapar, o milho perde a habilidade de estourar e apenas fica ali”, explica Bruce Hamaker, um professor de química alimentar da Purdue.

Estado de Minas, 25 de abril de 2005.
 Para o milho estourar e virar pipoca é preciso que:`,
    alternativas: [
      "a casca seja mais úmida que o núcleo.",
      "a casca evite perda de umidade do núcleo.",
      "o núcleo de amido estoure bem devagar.",
      "o núcleo seja mais transparente que a casca.",
      "a casca seja mais amarela que o núcleo."
    ],
    resposta: 1,
    explicacao: "O texto explica que a casca precisa impedir que a umidade do núcleo escape para o milho conseguir estourar."
  },

  // ===================== MATEMÁTICA (banco original) =====================
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "Quais são as raízes do polinômio Q(x) = (x + 3)(x – 7)(x – 1)?",
    alternativas: ["1, – 3 e – 7", "1, 3 e 7", "1, – 3 e 7", "– 1, 3 e – 7", "– 1, – 3 e – 7"],
    resposta: 2,
    explicacao: "Cada fator zerado dá uma raiz: x+3=0 → x=-3; x-7=0 → x=7; x-1=0 → x=1."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D26)A decomposição do polinômio P(x) = x² - 7x + 10 em fatores do primeiro grau é",
    alternativas: [
      "P(x) = (x – 2).(x + 5)",
      "P(x) = (x + 2).(x – 5)",
      "P(x) = (x – 2).(x – 5)",
      "P(x) = (x – 7).(x + 10)",
      "P(x) = (x + 7).(x + 10)"
    ],
    resposta: 2,
    explicacao: "Procuram-se dois números que somam 7 e multiplicam 10: 2 e 5. Logo, P(x) = (x-2)(x-5)."
  },
  {
    categoria: "Matemática",
    dificuldade: "dificil",
    pergunta: "(D32) Os membros de uma banca examinadora escolheram 7 questões de Matemática, 5 questões de Português e 4 questões de Ciências. Desse grupo de questões, eles irão sortear 2 questões de Matemática, 2 de Português e 1 de Ciências para compor uma prova de um concurso. Quantas provas diferentes poderão ser elaboradas para esse concurso?",
    alternativas: ["140", "280", "560", "700", "840"],
    resposta: 4,
    explicacao: "Multiplicam-se as combinações: C(7,2) × C(5,2) × C(4,1) = 21 × 10 × 4 = 840."
  },
  {
    categoria: "Matemática",
    dificuldade: "dificil",
    pergunta: "(D32) Flamengo, Palmeiras, Internacional, Cruzeiro, Bahia, Náutico e Goiás disputam um torneio em cuja classificação final não pode haver empates. Qual é o número de possibilidades de classificação para os três primeiros lugares desse torneio?",
    alternativas: ["21", "24", "42", "210", "343"],
    resposta: 3,
    explicacao: "Como a ordem importa, usa-se o arranjo A(7,3) = 7 × 6 × 5 = 210."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D17) (APA – Crede-CE). A idade de Mariana é representada por um número que somado ao seu quadrado é igual a 12. Qual a idade de Mariana?",
    alternativas: ["2 anos", "3 anos", "4 anos", "5 anos", "6 anos"],
    resposta: 1,
    explicacao: "Resolvendo x² + x – 12 = 0, a raiz positiva é x = 3."
  },
  {
    categoria: "Matemática",
    dificuldade: "dificil",
    pergunta: "(D17) (SAEPE). Em uma gincana escolar, participaram três equipes. A equipe vencedora fez o quadrado de pontos da equipe que ficou em 3º lugar. A equipe que ficou em 2º lugar fez o quádruplo de pontos da equipe que ficou em 3º lugar. A soma da pontuação das equipes 1º e 2º foi igual a 140 pontos. Qual foi a pontuação da equipe que ficou em 1º lugar?",
    alternativas: ["10", "14", "40", "100", "130"],
    resposta: 3,
    explicacao: "Se x é a pontuação do 3º lugar: x² + 4x = 140 → x = 10. A equipe vencedora (1º lugar) fez x² = 100 pontos."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D17) (SAEPE). Em uma competição, um atleta arremessa um dardo, que percorre uma boa distância até atingir o solo. A distância d percorrida pelo dardo, em metros, é a solução da equação –4d² + 600d – 22500 = 0. Qual é a distância percorrida?",
    alternativas: ["150", "75", "149", "100", "200"],
    resposta: 1,
    explicacao: "A equação tem raiz dupla: dividindo por -4 e resolvendo, d = 150/2 = 75."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D17) (SAERO). Numa experiência de física, observou-se que a placa de metal esquentou obedecendo a função F(t) = t² + t – 6, t ≥ 0. Em quantos segundos a placa atingiu a temperatura de 0 ºC?",
    alternativas: ["0", "2", "3", "4", "6"],
    resposta: 1,
    explicacao: "Fatorando t² + t – 6 = (t+3)(t-2), a raiz válida para t ≥ 0 é t = 2."
  },
  {
    categoria: "Matemática",
    dificuldade: "facil",
    pergunta: "(D18) (APA – Crede). Paulo é corretor de imóveis, recebendo mensalmente um salário fixo de R$ 1500,00 e mais uma comissão de 2,5% de cada imóvel vendido por ele. Considerando R a renda mensal e n o número de imóveis vendidos, qual a expressão algébrica que representa o rendimento mensal?",
    alternativas: [
      "R = 2,5n",
      "R = 1500 + 2,5xn",
      "R = 2,5 + 1500n",
      "R = 1500 + 0,25n",
      "R = 1500 + 0,025n"
    ],
    resposta: 4,
    explicacao: "A renda é o salário fixo de R$ 1500 mais a comissão (2,5% = 0,025) por imóvel vendido: R = 1500 + 0,025n."
  },
  {
    categoria: "Matemática",
    dificuldade: "dificil",
    pergunta: "(D22) (SAEMS). Sueli possui uma microempresa que fabrica pães e utiliza 256 kg de farinha de trigo na produção semanal desses pães. Ela pretende substituir de forma gradativa a produção de pães pela de bolos, porém utilizando a mesma quantidade semanal de farinha de trigo. Após essa decisão, ela utilizou 4 kg de farinha de trigo para a produção de bolos na primeira semana, 8 kg na segunda semana, e assim por diante, dobrando a quantidade até que todos os 256 kg de farinha de trigo fossem usados exclusivamente na produção de bolos. Em quantas semanas Sueli conseguiu substituir totalmente a fabricação de pães por bolos?",
    alternativas: ["4", "6", "7", "64", "127"],
    resposta: 2,
    explicacao: "4 × 2^(n-1) = 256 → 2^(n-1) = 64 → n-1 = 6 → n = 7 semanas."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D22) (AREAL). Pablo registra a amplitude da extensão de uma mola: 1º segundo 24 cm, 2º segundo 12 cm, e assim sucessivamente, cada segundo metade do anterior. Qual a amplitude registrada no 4º segundo?",
    alternativas: ["3 centímetros", "6 centímetros", "12 centímetros", "36 centímetros", "45 centímetros"],
    resposta: 0,
    explicacao: "A cada segundo o valor cai pela metade: 24, 12, 6, 3 cm no 4º segundo."
  },
  {
    categoria: "Matemática",
    dificuldade: "facil",
    pergunta: "(D22) (SAEPE). A empresa que realiza manutenção nas rodovias pintou faixas de 5 km no 1º dia e aumentou 5 km a cada dia subsequente. Quantos quilômetros no total foram pintados até o final do 6º dia?",
    alternativas: ["90", "95", "100", "105", "125"],
    resposta: 3,
    explicacao: "Soma da progressão aritmética: (5 + 30) × 6 / 2 = 105 km."
  },
  {
    categoria: "Matemática",
    dificuldade: "dificil",
    pergunta: "(D22) (SAEPE). Um fazendeiro fabricava queijos utilizando 512 litros de leite diariamente. Para diminuir a intensidade do trabalho, ele passou a vender parte do leite: 8 litros na 1ª semana, 16 litros na 2ª, 32 litros na 3ª e assim por diante. Quantas semanas foram necessárias para substituir totalmente a produção de queijos pela venda de leite?",
    alternativas: ["3", "6", "7", "33", "64"],
    resposta: 2,
    explicacao: "8 × 2^(n-1) = 512 → 2^(n-1) = 64 → n = 7 semanas."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D22) (PROEB). Sebastião resolveu fazer caminhadas todos os dias. No primeiro dia, ele caminhou 200 m e, a partir do segundo dia, passou a caminhar 100 m a mais do que caminhou no dia anterior. No 31° dia, Sebastião caminhou:",
    alternativas: ["3 100 m", "3 200 m", "3 300 m", "6 100 m", "6 300 m"],
    resposta: 1,
    explicacao: "Termo geral da progressão aritmética: a₃₁ = 200 + 100×(31-1) = 3200 m."
  },
  {
    categoria: "Matemática",
    dificuldade: "facil",
    pergunta: "(D26) As raízes do polinômio P(x) = (x - 3) . (x + 3) são:",
    alternativas: ["–2 e 1", "3 e –3", "–3 e 1", "3 e 1", "–3 e –1"],
    resposta: 1,
    explicacao: "Cada fator zerado dá uma raiz: x-3=0 → x=3; x+3=0 → x=-3."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D26) Um polinômio p(x) de terceiro grau tem raízes iguais a -3, 2 e 4. Das expressões abaixo, qual pode representar p(x)?",
    alternativas: [
      "(x - 3) (x + 2) (x + 4)",
      "(x + 3) (x - 2) (x - 4)",
      "(x + 3) (x + 2) (x + 4)",
      "(x - 3) (x - 2) (x - 4)",
      "(x - 3) (x - 2) (x + 4)"
    ],
    resposta: 1,
    explicacao: "Cada raiz r gera um fator (x-r): (x+3)(x-2)(x-4)."
  },
  {
    categoria: "Matemática",
    dificuldade: "facil",
    pergunta: "(D26) (Saresp 2007). Fatorando-se x² + 6x + 9, obtém-se:",
    alternativas: ["(x + 9)²", "(x + 3)²", "(x + 3)(x - 3)", "(x - 3)²", "(x - 3)(x - 3)"],
    resposta: 1,
    explicacao: "9 é o quadrado de 3, e 6 = 2×3. Logo, x² + 6x + 9 = (x+3)²."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D26) (SAEPE). Observe o polinômio p(x) = x.(x – 3).(x + 2). Quais são as raízes desse polinômio?",
    alternativas: ["–6, –1 e 1", "–3, 0 e 2", "–3 e 2", "–2 e 3", "–2, 0 e 3"],
    resposta: 4,
    explicacao: "Cada fator zerado dá uma raiz: x=0, x=3 e x=-2."
  },
  {
    categoria: "Matemática",
    dificuldade: "facil",
    pergunta: "(D32) Um pintor dispõe de 6 cores diferentes de tinta para pintar uma casa e precisa escolher uma cor para o interior e outra diferente para o exterior. De quantas maneiras diferentes a casa pode ser pintada usando apenas essas cores?",
    alternativas: ["6", "15", "20", "30", "60"],
    resposta: 3,
    explicacao: "6 opções para o interior × 5 restantes para o exterior = 30 combinações."
  },
  {
    categoria: "Matemática",
    dificuldade: "medio",
    pergunta: "(D32) Treze competidores disputam um campeonato de xadrez em que cada competidor joga uma vez com todos os outros. Quantos jogos serão realizados nesse campeonato?",
    alternativas: ["26", "65", "78", "130", "169"],
    resposta: 2,
    explicacao: "Número de jogos = C(13,2) = 13×12/2 = 78."
  },

  // ===================== GEOGRAFIA (novas) =====================
  {
    categoria: "Geografia",
    dificuldade: "facil",
    pergunta: "Qual é a capital do Brasil?",
    alternativas: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    resposta: 2,
    explicacao: "Brasília é a capital federal do Brasil desde 21 de abril de 1960."
  },
  {
    categoria: "Geografia",
    dificuldade: "facil",
    pergunta: "Qual é o maior oceano do planeta?",
    alternativas: ["Atlântico", "Índico", "Pacífico", "Ártico"],
    resposta: 2,
    explicacao: "O Oceano Pacífico é o maior e mais profundo oceano da Terra."
  },
  {
    categoria: "Geografia",
    dificuldade: "medio",
    pergunta: "Qual é o maior bioma brasileiro em extensão territorial?",
    alternativas: ["Mata Atlântica", "Cerrado", "Amazônia", "Caatinga"],
    resposta: 2,
    explicacao: "A Amazônia ocupa cerca de metade do território brasileiro, sendo o maior bioma do país."
  },
  {
    categoria: "Geografia",
    dificuldade: "medio",
    pergunta: "Qual rio transporta o maior volume de água doce do planeta?",
    alternativas: ["Nilo", "Amazonas", "Mississippi", "Yangtzé"],
    resposta: 1,
    explicacao: "O Rio Amazonas transporta o maior volume de água doce da Terra."
  },
  {
    categoria: "Geografia",
    dificuldade: "dificil",
    pergunta: "Qual linha imaginária atravessa o norte do Brasil, dividindo a Terra nos hemisférios Norte e Sul?",
    alternativas: ["Trópico de Capricórnio", "Linha do Equador", "Meridiano de Greenwich", "Trópico de Câncer"],
    resposta: 1,
    explicacao: "A Linha do Equador atravessa o Brasil pelo norte do país, dividindo o planeta em hemisfério Norte e Sul."
  },
  {
    categoria: "Geografia",
    dificuldade: "dificil",
    pergunta: "Qual cordilheira percorre toda a costa oeste da América do Sul?",
    alternativas: ["Andes", "Alpes", "Himalaias", "Montes Apalaches"],
    resposta: 0,
    explicacao: "A Cordilheira dos Andes é a maior cadeia de montanhas do mundo em extensão."
  },

  // ===================== CIÊNCIAS (novas) =====================
  {
    categoria: "Ciências",
    dificuldade: "facil",
    pergunta: "Qual é o órgão do corpo humano responsável por bombear o sangue?",
    alternativas: ["Pulmão", "Coração", "Fígado", "Rim"],
    resposta: 1,
    explicacao: "O coração é o órgão muscular que bombeia o sangue para todo o corpo."
  },
  {
    categoria: "Ciências",
    dificuldade: "facil",
    pergunta: "Qual gás os seres humanos precisam respirar para sobreviver?",
    alternativas: ["Gás carbônico", "Nitrogênio", "Oxigênio", "Hidrogênio"],
    resposta: 2,
    explicacao: "O oxigênio é essencial para a respiração celular dos seres humanos."
  },
  {
    categoria: "Ciências",
    dificuldade: "medio",
    pergunta: "Qual processo as plantas usam para produzir seu próprio alimento a partir da luz solar?",
    alternativas: ["Respiração", "Fotossíntese", "Fermentação", "Osmose"],
    resposta: 1,
    explicacao: "Na fotossíntese, as plantas convertem luz solar, água e CO2 em glicose e oxigênio."
  },
  {
    categoria: "Ciências",
    dificuldade: "medio",
    pergunta: "Qual é a unidade básica de todos os seres vivos?",
    alternativas: ["Átomo", "Célula", "Molécula", "Tecido"],
    resposta: 1,
    explicacao: "A célula é a unidade fundamental de estrutura e função dos seres vivos."
  },
  {
    categoria: "Ciências",
    dificuldade: "dificil",
    pergunta: "Qual cientista formulou a teoria da evolução das espécies por seleção natural?",
    alternativas: ["Isaac Newton", "Charles Darwin", "Gregor Mendel", "Louis Pasteur"],
    resposta: 1,
    explicacao: "Charles Darwin propôs a teoria da evolução por seleção natural em 'A Origem das Espécies' (1859)."
  },
  {
    categoria: "Ciências",
    dificuldade: "dificil",
    pergunta: "Qual é o nome da força que mantém os planetas em órbita ao redor do Sol?",
    alternativas: ["Força nuclear", "Força eletromagnética", "Gravidade", "Força de atrito"],
    resposta: 2,
    explicacao: "A gravidade é a força de atração entre massas que mantém os planetas em órbita ao redor do Sol."
  },

  // ===================== HISTÓRIA (novas) =====================
  {
    categoria: "História",
    dificuldade: "facil",
    pergunta: "Em que ano o Brasil foi 'descoberto' pelos portugueses?",
    alternativas: ["1500", "1822", "1600", "1750"],
    resposta: 0,
    explicacao: "A esquadra de Pedro Álvares Cabral chegou ao litoral brasileiro em 22 de abril de 1500."
  },
  {
    categoria: "História",
    dificuldade: "facil",
    pergunta: "Quem foi o primeiro imperador do Brasil?",
    alternativas: ["Dom João VI", "Dom Pedro I", "Dom Pedro II", "Deodoro da Fonseca"],
    resposta: 1,
    explicacao: "Dom Pedro I proclamou a Independência do Brasil em 1822 e se tornou o primeiro imperador."
  },
  {
    categoria: "História",
    dificuldade: "medio",
    pergunta: "Em que ano foi proclamada a República no Brasil?",
    alternativas: ["1822", "1888", "1889", "1891"],
    resposta: 2,
    explicacao: "A Proclamação da República ocorreu em 15 de novembro de 1889, liderada por Deodoro da Fonseca."
  },
  {
    categoria: "História",
    dificuldade: "medio",
    pergunta: "Qual lei, assinada em 1888, aboliu a escravidão no Brasil?",
    alternativas: ["Lei Áurea", "Lei do Ventre Livre", "Lei Eusébio de Queirós", "Lei dos Sexagenários"],
    resposta: 0,
    explicacao: "A Lei Áurea, assinada pela Princesa Isabel em 13 de maio de 1888, extinguiu a escravidão no Brasil."
  },
  {
    categoria: "História",
    dificuldade: "dificil",
    pergunta: "Qual conflito mundial ocorreu entre 1939 e 1945?",
    alternativas: ["Primeira Guerra Mundial", "Guerra Fria", "Segunda Guerra Mundial", "Guerra do Vietnã"],
    resposta: 2,
    explicacao: "A Segunda Guerra Mundial ocorreu entre 1939 e 1945, envolvendo as principais potências mundiais."
  },
  {
    categoria: "História",
    dificuldade: "dificil",
    pergunta: "Qual movimento cultural europeu dos séculos XIV a XVI valorizou o humanismo e a razão?",
    alternativas: ["Iluminismo", "Renascimento", "Absolutismo", "Mercantilismo"],
    resposta: 1,
    explicacao: "O Renascimento foi um movimento cultural que resgatou valores humanistas e científicos da Antiguidade Clássica."
  },

  // ===================== CONHECIMENTOS GERAIS (novas) =====================
  {
    categoria: "Conhecimentos Gerais",
    dificuldade: "facil",
    pergunta: "Quantos dias tem um ano bissexto?",
    alternativas: ["364", "365", "366", "367"],
    resposta: 2,
    explicacao: "O ano bissexto tem um dia a mais, em fevereiro, totalizando 366 dias."
  },
  {
    categoria: "Conhecimentos Gerais",
    dificuldade: "facil",
    pergunta: "Qual é a moeda oficial do Brasil?",
    alternativas: ["Peso", "Dólar", "Real", "Euro"],
    resposta: 2,
    explicacao: "O Real (R$) é a moeda oficial do Brasil desde 1994."
  },
  {
    categoria: "Conhecimentos Gerais",
    dificuldade: "medio",
    pergunta: "Quantos jogadores de linha uma equipe de futebol tem em campo (excluindo o goleiro)?",
    alternativas: ["9", "10", "11", "12"],
    resposta: 1,
    explicacao: "Cada time de futebol tem 11 jogadores em campo: 1 goleiro e 10 jogadores de linha."
  },
  {
    categoria: "Conhecimentos Gerais",
    dificuldade: "medio",
    pergunta: "Qual instrumento é usado para medir a temperatura?",
    alternativas: ["Barômetro", "Termômetro", "Higrômetro", "Anemômetro"],
    resposta: 1,
    explicacao: "O termômetro é o instrumento utilizado para medir a temperatura."
  },
  {
    categoria: "Conhecimentos Gerais",
    dificuldade: "dificil",
    pergunta: "Quantos ossos, aproximadamente, tem o corpo humano adulto?",
    alternativas: ["106", "156", "206", "256"],
    resposta: 2,
    explicacao: "O esqueleto humano adulto possui, em média, 206 ossos."
  },
  {
    categoria: "Conhecimentos Gerais",
    dificuldade: "dificil",
    pergunta: "Qual é o menor país do mundo em área territorial?",
    alternativas: ["Mônaco", "San Marino", "Vaticano", "Liechtenstein"],
    resposta: 2,
    explicacao: "O Vaticano é o menor país do mundo, com cerca de 0,44 km² de área."
  }
];
