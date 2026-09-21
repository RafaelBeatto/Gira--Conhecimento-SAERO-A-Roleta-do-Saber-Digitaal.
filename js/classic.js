// Modo Turma — o jogo original (5 grupos se revezando na roleta), preservado
// integralmente. A ÚNICA mudança em relação ao script original é que a cor de
// fundo por grupo agora é aplicada ao container #screen-turma em vez de
// document.body, para não sobrescrever o tema/fundo das outras telas da V2.0
// (Home, Modo Solo, Estatísticas, etc.) quando este modo não está ativo.
// Toda a lógica de jogo (roleta, perguntas, placar, pontuação) é idêntica.

(function () {
  const turmaScreenEl = document.getElementById("screen-turma") || document.body;

  // === Grupos ===
const groups = [  // Cria um array com todos os grupos do jogo
  { name: "Grupo Azul", color: "#3498db", score: 0 },       // Grupo Azul, cor azul e pontuação inicial 0
  { name: "Grupo Vermelho", color: "#e74c3c", score: 0 },  // Grupo Vermelho, cor vermelha e pontuação inicial 0
  { name: "Grupo Verde", color: "#2ecc71", score: 0 },     // Grupo Verde, cor verde e pontuação inicial 0
  { name: "Grupo Amarelo", color: "#f1c40f", score: 0 },   // Grupo Amarelo, cor amarela e pontuação inicial 0
  { name: "Grupo Roxo", color: "#9b59b6", score: 0 }       // Grupo Roxo, cor roxa e pontuação inicial 0
]; // Serve para controlar os grupos, suas cores e pontuações ao longo do jogo


let currentGroupIndex = 0;  // Define que o primeiro grupo da vez é o grupo de índice 0 (Grupo Azul)  
turmaScreenEl.style.background = groups[currentGroupIndex].color;  // Muda a cor de fundo da página para a cor do grupo atual


  const questions = [
  {
    //1
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
    opcoes: [
      "A) a falta de restingas e lagoas salgadas.",
      "B) a falta de vegetação original na REEJ.",
      "C) a ocupação irregular de seu habitat natural.",
      "D) o isolamento dos locais de preservação.",
      "E) o pouco tempo de vida da borboleta fêmea."
    ],
    resposta: "C"
  },
  {
    //2
    pergunta: `(D11)(SAERJ). Leia o texto abaixo. 

Desafio e resposta

“As árvores querem ficar quietas. Mas o vento as balança.” O provérbio chinês sintetiza o desafio enfrentado pelos jornais. Com o avanço da mídia eletrônica, os impressos pareciam resvalar para segundo plano na ordem dos meios de comunicação de massa. A notícia em tempo real foi vista como risco para a informação apurada, escrita com rigor e divulgada com exigências estéticas capazes de atrair o leitor. Não faltou quem anunciasse a morte dos periódicos. O papel não teria condições de competir com a rapidez e facilidades oferecidas pela internet.
Profecias catastróficas não constituem novidade no mundo cultural. A fotografia mataria a pintura. Não matou. A televisão mataria o rádio. Não matou. O videocassete mataria o cinema. Não matou. O jornal mataria o livro. Não matou. A internet mataria o jornal. Não matou. O tempo se encarregou de provar que os agouros não passavam de vaticínios de Cassandra. A razão: ao contrário da visão míope dos que rejeitam convivências, o novo agrega, não exclui.
Com a certeza de que as novas mídias ampliam as possibilidades do jornal, o Correio 
Braziliense promoveu ousada reforma editorial.
Correio Braziliense, 21 Jun. 2009. Fragmento. 

O trecho que indica a causa da mudança nos jornais impressos é:`,
    opcoes: [
      "A) “‘As árvores querem ficar quietas. Mas o vento as balança.’”. (1° parágrafo)",
      "B) “O provérbio chinês sintetiza o desafio enfrentado pelos jornais.”. (1° parágrafo)",
      "C) “Com o avanço da mídia eletrônica,...”. (1° parágrafo)",
      "D) “Não faltou quem anunciasse a morte dos periódicos.”. (1° parágrafo)",
      "E) “... o novo agrega, não exclui.”. (final do 2° parágrafo)"
    ],
    resposta: "C"
  },
  {
    //3
    pergunta: `(D8)(SPAECE). Leia o texto abaixo. 

[...] O celular destruiu um dos grandes prazeres do século passado: prosear ao telefone.
Hoje, por culpa deles somos obrigados a atender chamadas o dia todo. Viramos uma espécie de telefonistas de nós mesmos: desviamos chamadas, pegamos e anotamos recados...
Depois de um dia inteiro bombardeado por ligações curtas, urgentes e na maioria das vezes irrelevantes, quem vai sentir prazer numa simples conversa telefônica? O telefone, que era um momento de relax na vida da gente, virou um objeto de trabalho.
O equivalente urbano da velha enxada do trabalhador rural. Carregamos o celular ao longo do dia como uma bola de ferro fixada no corpo, uma prova material do trabalho escravo.
O celular banalizou o ritual de conversa à distância. No mundo pré-celular, havia na sala uma poltrona e uma mesinha exclusivas para a arte de telefonar. Hoje, tomamos como num transe, andamos pelas ruas, restaurantes, escritórios e até banheiros públicos berrando sem escrúpulos num pedaço de plástico colorido.
Misteriosamente, uma pessoa ao celular ignora a presença das outras. Conta segredos de alcova dentro do elevador lotado. É uma insanidade. Ainda não denunciada pelos jornalistas, nem, estudada com o devido cuidado pelos médicos. Aliás, duas das classes mais afetadas pelo fenômeno.
A situação é delicada. [...]\nO Estado de S. Paulo, 29/11/2004.

Qual é o argumento que sustenta a tese defendida pelo autor desse texto?`,
    opcoes: [
      "A) A arte de telefonar se tornou prazerosa.",
      "B) A sociedade destruiu velhos costumes.",
      "C) A vida moderna priorizou o telefone.",
      "D) O celular elitizou todos os profissionais.",
      "E) O homem tornou-se escravo de celular."
    ],
    resposta: "E"
  },
  {
    //4
    pergunta: `(D8)(SEDUC-GO). Leia o texto abaixo e responda. 

Amor à primeira vista

Papel, plástico, alumínio. Modernas embalagens industrializadas são essencialmente confeccionadas com essas três matérias-primas. Mas o resultado está longe de ser monótono.
Desde que os especialistas em vendas descobriram que a embalagem é um dos primeiros fatores que influenciam a escolha do consumidor, ela passou a ser estudada com mais atenção. Atualmente, estampa cores fortes, letras garrafais e formatos curiosos na tentativa de chamar a atenção nas prateleiras dos supermercados. Produtos infantis, por exemplo, apelam para desenhos animados ou super-heróis da moda para derrubar a concorrência. Provavelmente é o caso do achocolatado que você toma de manhã, do queijinho suíço do meio da tarde e até mesmo da sopinha da noite. 
Essas embalagens despertam o interesse dos consumidores muitas vezes, eles levam o produto para casa mais porque gostaram de sua roupagem do que pelo fato de apreciarem o conteúdo. [...]

Um argumento que sustenta a tese de que “a embalagem agora é uma forma de conquistar o consumidor” é que`,
    opcoes: [
      "A) a embalagem passou a ser mais bem cuidada.",
      "B) a embalagem tem formatos muito curiosos.",
      "C) a embalagem objetiva vestir bem os produtos.",
      "D) os produtos infantis trazem os super-heróis.",
      "E) os consumidores são atraídos pela embalagem"
    ],
    resposta: "E"
  },
  {
    //5
    pergunta: `(D19)(SAEPE). Leia o texto abaixo e responda. 

A melhor amiga do homem
Diogo Schelp

Devemos muito à vaca. Mas há quem a veja como inimiga. A vaca, aqui referida como a parte pelo todo bovino, é acusada de contribuir para a degradação do ambiente e para o aquecimento global. Cientistas atribuem ao 1,4 bilhão de cabeças de gado existentes no mundo quase metade das emissões de metano, um dos gases causadores do efeito estufa. Acusam-se as chifrudas de beber água demais e ocupar um espaço precioso para a agricultura.
O truísmo inconveniente é que homem e vaca são unha e carne. [...] Imaginar o mundo sem vacas é como desejar um planeta livre dos homens – uma ideia, aliás, vista com simpatia por ambientalistas menos esperançosos quanto à nossa espécie. “Alterar radicalmente o papel dos bovinos no nosso cotidiano, subtraindo-lhes a importância econômica, pode levá-los à extinção e colocar em jogo um recurso que está na base da construção da humanidade e, por que não, de seu futuro”, diz o veterinário José Fernando Garcia, da Universidade Estadual Paulista em Araçatuba. [...]\nA vaca tem um papel econômico crucial até onde é considerada animal sagrado. Na Índia, metade da energia doméstica vem da queima de esterco. O líder indiano Mahatma Gandhi (1869-1948), que, como todo hindu, não comia carne bovina, escreveu: “A mãe vaca, depois de morta, é tão útil quanto viva”. Nos Estados Unidos, as bases da superpotência foram estabelecidas quando a conquista do Oeste foi dada por encerrada, em 1890, fazendo surgir nas Grandes Planícies americanas o maior rebanho bovino do mundo de então. “Esse estoque permitiu que a carne se tornasse, no século seguinte, uma fonte de proteína para as massas, principalmente na forma de hambúrguer”, escreveu Florian Werner. [...] Comer um bom bife é uma aspiração natural e cultural. Ou seja, nem que a vaca tussa a humanidade deixará de ser onívora.

O autor usa a parte pelo todo para se referir à vaca em:`,
    opcoes: [
      "A) “Acusam-se as chifrudas...”. (final do 1° parágrafo)",
      "B) “...homem e vaca são unha e carne”. (2° parágrafo)",
      "C) “...o papel dos bovinos...”. (2° parágrafo)",
      "D) “...animal sagrado.”. (2° parágrafo)",
      "E) “...nem que a vaca tussa...”. (final do último parágrafo)"
    ],
    resposta: "A"
  },
  
  // 1 a 5 já inseridas acima
  {
    //6
    pergunta: `(D11)(SAEPE). Leia o texto abaixo e responda. 

O torcedor

No jogo de decisão do campeonato, Eváglio torceu pelo Atlético Mineiro, não porque fosse atleticano ou mineiro, mas porque receava o carnaval nas ruas se o Flamengo vencesse. Visitava um amigo em bairro distante, nenhum dos dois tem carro, e ele previa que a volta seria problema.
O Flamengo triunfou, e Eváglio deixou de ser atleticano para detestar todos os clubes de futebol, que perturbam a vida urbana com suas vitórias. Saindo em busca de táxi inexistente, acabou se metendo num ônibus em que não cabia mais ninguém, e havia duas bandeiras rubro-negras para cada passageiro. E não eram bandeiras pequenas nem torcedores exaustos: estes pareciam terem guardado a capacidade de grito para depois da vitória.
Eváglio sentiu-se dentro do Maracanã, até mesmo dentro da bola chutada por 44 pés. A bola era ele, embora ninguém reparasse naquela esfera humana que ansiava por tornar a ser gente a caminho de casa.
Lembrando-se de que torcera pelo vencido, teve medo, para não dizer terror. Se lessem em seu íntimo o segredo, estava perdido. Mas todos cantavam, sambavam com alegria tão pura que ele próprio começou a sentir um pouco de Flamengo dentro de si. Era o canto?
Eram braços e pernas falando além da boca? A emanação de entusiasmo o contagiava e transformava. Marcou com a cabeça o acompanhamento da música. Abriu os lábios, simulando cantar. Cantou. [...] Estava batizado, crismado e ungido: uma vez Flamengo, sempre Flamengo.
O pessoal desceu na Gávea, empurrando Eváglio para descer também e continuar a festa, mas Eváglio mora em Ipanema, e já com o pé no estribo se lembrou. Loucura continuar Flamengo [...] Segurou firme na porta, gritou: “Eu volto, gente! Vou só trocar de roupa” e, não se sabe como, chegou intacto ao lar, já sem compromisso clubista.

Qual é a causa da transformação de Eváglio em torcedor?`,
    opcoes: [
      "A) A alegria contagiante dos torcedores.",
      "B) A inexistência de táxi após o jogo.",
      "C) A promessa de Eváglio aos torcedores.",
      "D) O campeonato conquistado pelo time carioca.",
      "E) O desembarque de Eváglio com os torcedores."
    ],
    resposta: "B"
  },
  {
    //7
    pergunta: `(D11)(PAEBES). Leia o texto abaixo. 

O que está acontecendo com a natureza?

Terremotos, inundações, tsunamis ocorrem com grande frequência, em todas as partes do planeta, como nunca foi registrado nessa mesma intensidade. Os cientistas têm se empenhado em buscar outros fatores, mas a resposta está diante dos olhos de todos – é o homem quem está contribuindo, e muito, para todo esse cenário de tragédias, ceifando, ao longo dos anos, centenas de milhares de vítimas. Ou seja, o homem pode ser a vítima e também o causador de tantas tragédias que estão se alastrando com muita velocidade.
[...] O homem, de uma forma geral, é o grande culpado de todo o desequilíbrio ecológico, desde o aquecimento global, até a negligência de um prefeito que simplesmente decidiu não limpar as galerias, o que contribuiu, e muito, para a tragédia. Quem responderá por isso? E até quando isso acontecerá?

De acordo com esse texto, as tragédias naturais são causadas, de forma geral, pelo:`,
    opcoes: [
      "A) aquecimento global.",
      "B) desequilíbrio ecológico.",
      "C) homem.",
      "D) planeta.",
      "E) prefeito negligente."
    ],
    resposta: "C"
  },
 {
  //35
  pergunta: "(D20) (SAEPE). Leia o texto abaixo.\n\nManeira de amar\n\nO jardineiro conversava com as flores, e elas se habituaram ao diálogo. Passava manhãs contando coisas a uma cravina ou escutando o que lhe confiava um gerânio. O girassol não ia muito com sua cara, ou porque não fosse homem bonito, ou porque os girassóis são orgulhosos de natureza. Em vão o jardineiro tentava captar-lhe as graças, pois o girassol chegava a voltar-se contra a luz para não ver o rosto que lhe sorria. Era uma situação bastante embaraçosa, que as outras flores não comentavam. Nunca, entretanto, o jardineiro deixou de regar o pé de girassol e de renovar-lhe a terra, na ocasião devida.\nANDRADE, Carlos Drummond de. Maneira de amar. In: Histórias para o Rei. Rio de Janeiro: Record, 1999, p. 52.\n\nO conflito dessa narrativa se inicia com:",
  opcoes: [
    "A) a antipatia do girassol pelo jardineiro",
    "B) a ausência de comentários das outras flores",
    "C) a recusa do girassol em voltar-se para a luz",
    "D) o diálogo do jardineiro com as flores",
    "E) o relacionamento entre o gerânio e o jardineiro"
  ],
  resposta: "A"
},

  {
    //9
    pergunta: `(D8)(SEAPE). Leia o texto abaixo. 

MIB³ – Homens de Preto 3

Eis uma aposta arriscada: reconvocar os Homens de Preto, quase uma década depois da decepcionante continuação que afundou a franquia, para, com um dos orçamentos mais inflados da história do cinema [...], recuperar o charme excêntrico e empolgante do original de 97. Passaram-se 15 anos deste, e Will Smith e Tommy Lee Jones retornam como os agentes J e K. Pensando friamente, é um prognóstico desanimador, mas MIB³ – Homens de Preto 3 é um exemplar bem-sucedido da retomada da inventividade e da satisfatória dinâmica dos protagonistas, as qualidades que conquistaram o público (e a mim) muitos anos atrás. [...]
Apesar do longo hiato, a narrativa mantém intactos os melhores elementos do original, como a postura carrancuda de K, insensivelmente divertida no discurso de morte de Zed, e a boa química entre a dupla de agentes. Reproduzindo criativamente um salto no tempo, embora os efeitos especiais deixem a desejar, o filme acerta no casting do interessante Josh Brolin, que reproduz fielmente a entonação da voz texana de Tommy Lee Jones e os maneirismos de sua atuação [...]. 
No entanto, é impossível ignorar os enormes e grosseiros furos narrativos causados por um roteirista claramente incapaz de lidar com o conceito de viagem no tempo. [...]
Entretanto, a direção de Barry Sonnenfeld é suficientemente ágil para que não pensemos (muito) nos tropeços narrativos. Dosando o humor, ação e drama adequadamente [...], o cineasta desenvolveu uma aventura descompromissada [...]. 
Embora improvável que a aposta dos produtores tenha resultados além do morno, Homens de Preto 3 é bom o bastante para “neuralizar” o desastre do último episódio e manter uma lembrança agradável de J, K e esta inusitada agência secreta.

Nesse texto, sobre a tese de que o filme Homens de Preto 3 é bem-sucedido, há um argumento em:`,
    opcoes: [
      "A) “... com um dos orçamentos mais inflados da história do cinema...”. (1° parágrafo)",
      "B) “... Will Smith e Tommy Lee Jones retornam...”. (1° parágrafo)",
      "C) “... a narrativa mantém intactos os melhores elementos do original...”. (2° parágrafo)",
      "D) “... embora os efeitos especiais deixem a desejar...”. (2° parágrafo)",
      "E) “... é impossível ignorar os enormes e grosseiros furos narrativos...”. (3° parágrafo)"
    ],
    resposta: "C"
  },
  {
    //10
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
    opcoes: [
      "A) o barulho do trem.",
      "B) a voz do maquinista.",
      "C) a conversa dos passageiros.",
      "D) a voz da menina bonita.",
      "E) o linguajar do povo do sertão."
    ],
    resposta: "A"
  },
  {
    //11
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
    opcoes: [
      "A) fazer associações de sentido.",
      "B) refutar argumentos anteriores.",
      "C) detalhar sonhos e pretensões.",
      "D) apresentar explicações novas.",
      "E) reforçar a expressão dos desejos."
    ],
    resposta: "E"
  },
  // 1 a 11 já inseridas acima
  {
    //12
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
    opcoes: [
      "A) atitude fingida.",
      "B) anúncio de rebeldia.",
      "C) progressão da tristeza.",
      "D) sensação de culpa.",
      "E) sinal de fraqueza."
    ],
    resposta: "C"
  },
  {
    //13
    pergunta: `(D18)(SAEPE). Leia o texto abaixo. 

A brasileira Sandra Maria Feliciano Silva, 51, moradora de Porto Velho (RO), está entre os cem candidatos pré-selecionados para uma missão que pretende colonizar Marte em 2025, informou a fundação Mars One, que organiza a expedição.
De um total inicial de mais de 202 mil candidatos inscritos em 2013, apenas cem restaram na terceira seletiva da Mars One. Uma segunda fase de seleção já havia reduzido esse número para 1.058 candidatos.
“O grande corte de candidatos é um passo importante para sabermos quem tem as qualidades certas para ir a Marte”, disse em comunicado Bas Lansdorp, cofundador e diretor-executivo da fundação.
No perfil divulgado pela Mars One, Sandra afirma ser formada em administração e direito. 
Ela também é professora [...] especialista em segurança pública.
A candidata também mantém uma página no Facebook sobre aquários. Ela escreveu um livro de ficção chamado “Os Ancestrais”, publicado em dezembro passado. Entre os temas de interesse dela estão astronomia, física, biologia, administração de crise e ecologia de sistemas fechados.
Em um vídeo divulgado pela fundação, Sandra diz que tem “a coragem e o espírito certos” para participar desta missão.

Nesse texto, no trecho “... para participar desta missão.” a expressão destacada refere-se ao fato de:`,
    opcoes: [
      "A) colonizar Marte.",
      "B) escrever um livro de ficção.",
      "C) formar em direito.",
      "D) manter uma página sobre aquário.",
      "E) ser professora."
    ],
    resposta: "A"
  },
  {
    //14
    pergunta: `(D18)(Seduc-GO). Leia o texto abaixo. 

Choro
Rubem Braga

Eram todos negros: uma viola, um clarinete, um pandeiro e uma cabaça. Juntaram-se na varandinha de uma casa abandonada e ali ficaram chorando valsas, repinicando sambas. E a gente veio se ajuntando, calada, ouvindo. Alguém mandou no botequim da esquina trazer cerveja e cachaça. E em pé na calçada, ou sentados no chão da varanda, ou nos canteiros do jardinzinho, todos ficamos em silêncio ouvindo os negros.
Os que ouviam não batiam palmas nem pediam música nenhuma; ficavam simplesmente bebendo em silêncio aquele choro, o floreio do clarinete, o repinicado vivo e triste da viola.
Só essa música que nos arrasta e prende, nos dá alegria e tristeza, nos leva a outras noites de emoções – e grátis. Ainda há boas coisas grátis, nesta cidade de coisas tão caras e de tanta falta de coisas. Grátis – um favor dos negros.
Alma grátis, poesia grátis, duas horas de felicidade grátis – sim, só da gente do povo podemos esperar uma coisa assim nesta cidade de ganância e de injustiça. Só o pobre tem tanta riqueza para dar de graça.

Que efeito de sentido percebe-se no trecho “... ficavam simplesmente bebendo em silêncio aquele choro (...)”?`,
    opcoes: [
      "A) Descrição do comportamento das pessoas.",
      "B) Convite para as pessoas se ajuntarem.",
      "C) Ordem expressão por imperativos.",
      "D) Mistura de sentidos: paladar e audição.",
      "E) Descrição do ambiente físico."
    ],
    resposta: "D"
  },
  {
    //15
    pergunta: `(D15)(SPAEECE). Leia o texto abaixo. 

Entenda sua letra

Ana Cecília Amado Sette, psicopedagoga especializada em grafologia (técnica que analisa o perfil da personalidade por meio da escrita), há trinta anos pesquisa e trabalha para grandes empresas, elaborando laudos psicológicos sobre profissionais e candidatos a empregos. A especialista  explica que, assim como os rabiscos, a letra tem o poder de revelar o caráter e os atributos das pessoas. “A escrita é o resultado de processos neurológicos, físicos, psíquicos e emocionais, numa perfeita combinação entre cérebro, na sua forma concreta, e mente, no seu lado abstrato”, define a grafóloga. 
Quando se requisita um teste escrito para avaliação de um candidato a promoção ou admissão para um cargo, a redação é obrigatória. Em geral, os pretendentes sabem que serão analisados, e a maior preocupação é causar boa impressão, seja no aspecto formal como no pessoal. Contudo, depois de alguns minutos, a escrita se torna automática e inconsciente: é a partir daí que se colhem as informações que escapariam do campo de observações dos melhores entrevistadores. 
Conforme Ana Cecília, num texto de uma página e meia, um grafólogo é capaz de identificar mais de 300 particularidades. A letra revela desde doenças, dependências químicas e dramas familiares, até energia, equilíbrio emocional, empreendedorismo, capacidade de comunicação e relacionamento interpessoal, concentração, flexibilidade, além de iniciativa e organização entre outros. “Os índices de acerto são impressionantes, chegando a 90%”, informa a especialista.

No trecho “A especialista explica que, assim como os rabiscos, ... “ a palavra destacada estabelece relação semântica de:`,
    opcoes: [
      "A) causa.",
      "B) comparação.",
      "C) conformidade.",
      "D) consequência.",
      "E) proporção."
    ],
    resposta: "B"
  },
  {
    //16
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
    opcoes: [
      "A) a escolha da palavra na escrita.",
      "B) a importância dos olhos para a leitura.",
      "C) a mudança da leitura com o tempo.",
      "D) as transformações ocorridas no mundo.",
      "E) as várias possibilidades de leitura."
    ],
    resposta: "E"
  },
  {
    //17
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
    opcoes: [
      "A) Divulgam as possibilidades de uma nova profissão.",
      "B) Existem múltiplas possibilidades de trabalho para o perito.",
      "C) Ambos destacam a importância da ética profissional.",
      "D) A profissão depende de cursos técnicos especializados.",
      "E) Apenas engenheiros podem atuar como peritos."
    ],
    resposta: "A"
  },
  {
  //34
  pergunta: "(D19) (SAEPE). Leia o texto abaixo.\n\nA namorada\n\nHavia um muro alto entre nossas casas.\nDifícil de mandar recado para ela.\nNão havia e-mail.\nO pai era uma onça.\nA gente amarrava o bilhete numa pedra presa por um cordão\nE pinchava a pedra no quintal da casa dela.\nSe a namorada respondesse pela mesma pedra\nEra uma glória!\nMas por vezes o bilhete enganchava nos galhos da goiabeira\nE então era agonia.\nNo tempo do onça era assim.\nBARROS, Manoel de. Tratado geral das grandezas do ínfimo. Rio de Janeiro: Record, 2001, p. 17.\n\nNos versos “Era uma glória!” (v. 9) e “E então era agonia.” (v. 12), o emprego das palavras destacadas sugere:",
  opcoes: [
    "A) aproximação de ações",
    "B) comparação",
    "C) concordância de ideias",
    "D) exagero",
    "E) oposição de sentimento"
  ],
  resposta: "D"
},

{
  //33
  pergunta: "(D18) (PROEB). Leia o texto abaixo.\n\nComo surgiram o Dia das Mães e outros feriados comerciais?\nMarina Montomura\n\nNa verdade, o Dia das Mães não tem uma origem comercial. Desde a Grécia antiga, havia celebrações na entrada da primavera, em homenagem a Reia, mãe de Zeus e considerada matriarca de todos os deuses. Mas essa festa ancestral se perdeu, e o Dia das Mães atual só surgiu no início do século passado, nos Estados Unidos, como homenagem às mulheres que haviam perdido os filhos na Guerra Civil Americana. A americana Anna Jarvis conseguiu oficializar primeiro o feriado em sua cidade, Webster, depois no estado de Virgínia Ocidental e, em 1914, o feriado se tornou nacional em todo o país. No Brasil, a data começou a ser comemorada sob influência americana – foi introduzida pela Associação Cristã de Moços (ACM) em 1918 – e, em 1932, foi oficializada pelo presidente Getúlio Vargas. Só em 1949, a data ficou mais comercial, quando rolaram propagandas para aumentar as vendas. Outros feriados, que têm uma origem “nobre” fora do Brasil e aqui ganharam caráter mais comercial, são o Dia dos Namorados, Dia da Criança e o Dia dos Pais.\nMundo Estranho. São Paulo: Abril, ed. 87, p. 34. *Adaptado: Reforma Ortográfica.\n\nNo trecho “... o feriado se tornou nacional em todo o país.”, o termo destacado expressa:",
  opcoes: [
    "A) alteração de estado",
    "B) continuidade de estado",
    "C) manutenção de estado",
    "D) repetição de estado",
    "E) valorização de estado"
  ],
  resposta: "A"
},

  //20
{
pergunta: `Leia o texto e responda a questão.

Por que milho não vira pipoca?

Não importa a maneira de fazer a pipoca. Sempre que se chega ao final do saquinho, lá estão os duros e ruidosos grãos de milho que não estouraram. Essas bolinhas irritantes, que já deixaram muitos dentistas ocupados, estão com os dias contados. Cientistas norte-americanos dizem que agora sabem por que alguns grãos de milho de pipoca resistem ao estouro. 

Há algum tempo já se sabe que o milho de pipoca precisa de umidade no seu núcleo de amido, cerca de 15%, para explodir. Mas pesquisadores da Universidade Purdue descobriram que a chave para um bem sucedido estouro do milho está na casca. 

É indispensável uma excelente estrutura de casca para que o milho estoure. Cascas danificadas impedem que a umidade faça a pressão necessária para que o milho vire pipoca. “Se muita umidade escapar, o milho perde a habilidade de estourar e apenas fica ali”, explica Bruce Hamaker, um professor de química alimentar da Purdue.

Estado de Minas, 25 de abril de 2005.
 Para o milho estourar e virar pipoca é preciso que:`,
    opcoes: [
      "a) a casca seja mais úmida que o núcleo.",
      "b) a casca evite perda de umidade do núcleo.",
 "c) o núcleo de amido estoure bem devagar.",
   "d) o núcleo seja mais transparente que a casca.", 
   "e) a casca seja mais amarela que o núcleo."
    ],
    resposta: "b"
  },
  {
    //21
    pergunta: "Quais são as raízes do polinômio Q(x) = (x + 3)(x – 7)(x – 1)?",
    opcoes: [
      "A) 1, – 3 e – 7",
      "B) 1, 3 e 7",
      "C) 1, – 3 e 7",
      "D) – 1, 3 e – 7",
      "E) – 1, – 3 e – 7"
    ],
    resposta: "C"
  },
  {
    //22
    pergunta: "(D26)A decomposição do polinômio P(x) = x² - 7x + 10 em fatores do primeiro grau é",
    opcoes: [
      "A) P(x) = (x – 2).(x + 5)",
      "B) P(x) = (x + 2).(x – 5)",
      "C) P(x) = (x – 2).(x – 5)",
      "D) P(x) = (x – 7).(x + 10)",
      "E) P(x) = (x + 7).(x + 10)"
    ],
    resposta: "C"
  },
  {
    //23
    pergunta: "(D32) Os membros de uma banca examinadora escolheram 7 questões de Matemática, 5 questões de Português e 4 questões de Ciências. Desse grupo de questões, eles irão sortear 2 questões de Matemática, 2 de Português e 1 de Ciências para compor uma prova de um concurso. Quantas provas diferentes poderão ser elaboradas para esse concurso?",
    opcoes: [
      "A) 140",
      "B) 280",
      "C) 560",
      "D) 700",
      "E) 840"
    ],
    resposta: "E"
  },
  {
    //24
    pergunta: "(D32) Flamengo, Palmeiras, Internacional, Cruzeiro, Bahia, Náutico e Goiás disputam um torneio em cuja classificação final não pode haver empates. Qual é o número de possibilidades de classificação para os três primeiros lugares desse torneio?",
    opcoes: [
      "A) 21",
      "B) 24",
      "C) 42",
      "D) 210",
      "E) 343"
    ],
    resposta: "D"
  },
  {
    //25
    pergunta: "(D17) (APA – Crede-CE). A idade de Mariana é representada por um número que somado ao seu quadrado é igual a 12. Qual a idade de Mariana?",
    opcoes: [
      "A) 2 anos",
      "B) 3 anos",
      "C) 4 anos",
      "D) 5 anos",
      "E) 6 anos"
    ],
    resposta: "B"
  },
  {
    //26
    pergunta: "(D17) (SAEPE). Em uma gincana escolar, participaram três equipes. A equipe vencedora fez o quadrado de pontos da equipe que ficou em 3º lugar. A equipe que ficou em 2º lugar fez o quádruplo de pontos da equipe que ficou em 3º lugar. A soma da pontuação das equipes 1º e 2º foi igual a 140 pontos. Qual foi a pontuação da equipe que ficou em 1º lugar?",
    opcoes: [
      "A) 10",
      "B) 14",
      "C) 40",
      "D) 100",
      "E) 130"
    ],
    resposta: "D"
  },
  {
    //27
    pergunta: "(D17) (SAEPE). Em uma competição, um atleta arremessa um dardo, que percorre uma boa distância até atingir o solo. A distância d percorrida pelo dardo, em metros, é a solução da equação –4d² + 600d – 22500 = 0. Qual é a distância percorrida?",
    opcoes: [
      "A) 150",
      "B) 75",
      "C) 149",
      "D) 100",
      "E) 200"
    ],
    resposta: "B"
  },
  {
    //28
    pergunta: "(D17) (SAERO). Numa experiência de física, observou-se que a placa de metal esquentou obedecendo a função F(t) = t² + t – 6, t ≥ 0. Em quantos segundos a placa atingiu a temperatura de 0 ºC?",
    opcoes: [
      "A) 0",
      "B) 2",
      "C) 3",
      "D) 4",
      "E) 6"
    ],
    resposta: "B"
  },
  {
    //29
    pergunta: "(D18) (APA – Crede). Paulo é corretor de imóveis, recebendo mensalmente um salário fixo de R$ 1500,00 e mais uma comissão de 2,5% de cada imóvel vendido por ele. Considerando R a renda mensal e n o número de imóveis vendidos, qual a expressão algébrica que representa o rendimento mensal?",
    opcoes: [
      "A) R = 2,5n",
      "B) R = 1500 + 2,5xn",
      "C) R = 2,5 + 1500n",
      "D) R = 1500 + 0,25n",
      "E) R = 1500 + 0,025n"
    ],
    resposta: "E"
  },
 {
  //32
  pergunta: "(D22) (SAEMS). Sueli possui uma microempresa que fabrica pães e utiliza 256 kg de farinha de trigo na produção semanal desses pães. Ela pretende substituir de forma gradativa a produção de pães pela de bolos, porém utilizando a mesma quantidade semanal de farinha de trigo. Após essa decisão, ela utilizou 4 kg de farinha de trigo para a produção de bolos na primeira semana, 8 kg na segunda semana, e assim por diante, dobrando a quantidade até que todos os 256 kg de farinha de trigo fossem usados exclusivamente na produção de bolos. Em quantas semanas Sueli conseguiu substituir totalmente a fabricação de pães por bolos?",
  opcoes: [
    "A) 4",
    "B) 6",
    "C) 7",
    "D) 64",
    "E) 127"
  ],
  resposta: "C"
},

  {
    //31
    pergunta: "(D22) (AREAL). Pablo registra a amplitude da extensão de uma mola: 1º segundo 24 cm, 2º segundo 12 cm, e assim sucessivamente, cada segundo metade do anterior. Qual a amplitude registrada no 4º segundo?",
    opcoes: [
      "A) 3 centímetros",
      "B) 6 centímetros",
      "C) 12 centímetros",
      "D) 36 centímetros",
      "E) 45 centímetros"
    ],
    resposta: "A"
  },
  {
    //32
    pergunta: "(D22) (SAEPE). A empresa que realiza manutenção nas rodovias pintou faixas de 5 km no 1º dia e aumentou 5 km a cada dia subsequente. Quantos quilômetros no total foram pintados até o final do 6º dia?",
    opcoes: [
      "A) 90",
      "B) 95",
      "C) 100",
      "D) 105",
      "E) 125"
    ],
    resposta: "D"
  },
  {
    //33
    pergunta: "(D22) (SAEPE). Um fazendeiro fabricava queijos utilizando 512 litros de leite diariamente. Para diminuir a intensidade do trabalho, ele passou a vender parte do leite: 8 litros na 1ª semana, 16 litros na 2ª, 32 litros na 3ª e assim por diante. Quantas semanas foram necessárias para substituir totalmente a produção de queijos pela venda de leite?",
    opcoes: [
      "A) 3",
      "B) 6",
      "C) 7",
      "D) 33",
      "E) 64"
    ],
    resposta: "C"
  },
  // ... questões anteriores
  {
    //34
    pergunta: "(D22) (PROEB). Sebastião resolveu fazer caminhadas todos os dias. No primeiro dia, ele caminhou 200 m e, a partir do segundo dia, passou a caminhar 100 m a mais do que caminhou no dia anterior. No 31° dia, Sebastião caminhou:",
    opcoes: [
      "A) 3 100 m",
      "B) 3 200 m",
      "C) 3 300 m",
      "D) 6 100 m",
      "E) 6 300 m"
    ],
    resposta: "B"
  },
  {
    //35
    pergunta: "(D26) As raízes do polinômio P(x) = (x - 3) . (x + 3) são:",
    opcoes: [
      "A) –2 e 1",
      "B) 3 e –1",
      "C) –3 e 1",
      "D) 3 e 1",
      "E) –3 e –1"
    ],
    resposta: "B"
  },
  {
    //36
    pergunta: "(D26) Um polinômio p(x) de terceiro grau tem raízes iguais a -3, 2 e 4. Das expressões abaixo, qual pode representar p(x)?",
    opcoes: [
      "A) (x - 3) (x + 2) (x + 4)",
      "B) (x + 3) (x - 2) (x - 4)",
      "C) (x + 3) (x + 2) (x + 4)",
      "D) (x - 3) (x - 2) (x - 4)",
      "E) (x - 3) (x - 2) (x + 4)"
    ],
    resposta: "B"
  },
  {
    //37
    pergunta: "(D26) (Saresp 2007). Fatorando-se x² + 6x + 9, obtém-se:",
    opcoes: [
      "A) (x + 9)²",
      "B) (x + 3)²",
      "C) (x + 3)(x - 3)",
      "D) (x - 3)²",
      "E) (x - 3)(x - 3)"
    ],
    resposta: "B"
  },
  {
    //38
    pergunta: "(D26) (SAEPE). Observe o polinômio p(x) = x.(x – 3).(x + 2). Quais são as raízes desse polinômio?",
    opcoes: [
      "A) –6, –1 e 1",
      "B) –3, 0 e 2",
      "C) –3 e 2",
      "D) –2 e 3",
      "E) –2, 0 e 3"
    ],
    resposta: "E"
  },
  {
    //39
    pergunta: "(D32) Um pintor dispõe de 6 cores diferentes de tinta para pintar uma casa e precisa escolher uma cor para o interior e outra diferente para o exterior. De quantas maneiras diferentes a casa pode ser pintada usando apenas essas cores?",
    opcoes: [
      "A) 6",
      "B) 15",
      "C) 20",
      "D) 30",
      "E) 60"
    ],
    resposta: "D"
  },
  {
    //40
  pergunta: "(D32) Treze competidores disputam um campeonato de xadrez em que cada competidor joga uma vez com todos os outros. Quantos jogos serão realizados nesse campeonato?",
    opcoes: [
      "A) 26",
      "B) 65",
      "C) 78",
      "D) 130",
      "E) 169"
    ],
    resposta: "C"
  }
];

// Guarda uma cópia intacta das perguntas originais, usada para reiniciar o jogo
const questionsBackup = questions.map(q => ({ ...q, opcoes: [...q.opcoes] }));
const totalQuestions = questionsBackup.length;

// funçao8
//O que esse trecho faz?
//Ele prepara todos os elementos do jogo na tela e cria algumas variáveis de controle que vão ser usadas para rodar a roleta, mostrar perguntas e controlar o fluxo do jogo.

const canvas = document.getElementById("wheel");            // Pega o elemento <canvas> da roleta na página
const ctx = canvas.getContext("2d");                        // Cria o contexto 2D para desenhar dentro do canvas
const spinBtn = document.getElementById("spin-btn");        // Pega o botão de girar a roleta
const nextBtn = document.getElementById("next-btn");        // Pega o botão para passar para a próxima pergunta
const selectedQuestionEl = document.getElementById("selected-question");  // Pega o elemento onde a pergunta será mostrada
const messageEl = document.getElementById("message");       // Pega o elemento onde mensagens como "Acertou" ou "Errou" aparecerão
const scoreboardEl = document.getElementById("scoreboard"); // Pega o elemento onde o placar do jogo será mostrado
const turnIndicatorEl = document.getElementById("turn-indicator"); // Pega o elemento que mostra de quem é a vez
const progressEl = document.getElementById("progress");     // Pega o elemento que mostra o progresso das perguntas


// Criar botão para ver placar final (inicialmente escondido)
const finalScoreBtn = document.createElement("button");          // Cria um botão novo dinamicamente
finalScoreBtn.textContent = "Ver placar final";                  // Define o texto do botão como "Ver placar final"
finalScoreBtn.style.display = "none";                            // Inicialmente esconde o botão
finalScoreBtn.style.marginTop = "10px";                          // Adiciona uma margem superior para separar visualmente
finalScoreBtn.onclick = showFinalScoreboard;                     // Define que, ao clicar, chama a função para mostrar o placar final
selectedQuestionEl.parentNode.appendChild(finalScoreBtn);       // Adiciona o botão na página, logo após a área de perguntas

// Criar botão para reiniciar o jogo (inicialmente escondido)
const restartBtn = document.createElement("button");             // Cria um botão novo dinamicamente
restartBtn.textContent = "🔄 Jogar novamente";                    // Define o texto do botão
restartBtn.id = "restart-btn";
restartBtn.style.display = "none";                                // Inicialmente esconde o botão
restartBtn.style.marginTop = "10px";                               // Adiciona uma margem superior
restartBtn.onclick = restartGame;                                  // Define que, ao clicar, chama a função de reinício
selectedQuestionEl.parentNode.appendChild(restartBtn);            // Adiciona o botão na página


let angle = 0;                 // Guarda o ângulo atual da roleta (posição de giro)
let spinning = false;          // Indica se a roleta está girando ou não
let currentQuestion = null;    // Armazena a pergunta que está sendo respondida no momento
let questionAnswered = true;   // Indica se a pergunta atual já foi respondida (true = sim, false = não)












// FUNÇAO 1
// O que essa função faz?
//Essa função desenha a roleta ( faz fica redonda )
//usando o canvas do HTML, que é uma tela onde podemos desenhar com código.
function drawWheel() {  
  const numSegments = questions.length;                     // Define quantas fatias a roleta terá, igual ao número de perguntas
  const angleStep = (2 * Math.PI) / numSegments;           // Calcula o ângulo de cada fatia em radianos

  ctx.clearRect(0, 0, canvas.width, canvas.height);        // Limpa o canvas para redesenhar a roleta

  for (let i = 0; i < numSegments; i++) {                 
    const startAngle = i * angleStep;                      // Define o ângulo inicial da fatia
    const endAngle = startAngle + angleStep;               // Define o ângulo final da fatia

    ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff6600";  // Alterna cores das fatias para visual mais bonito
    ctx.beginPath();                                       // Inicia o desenho da fatia
    ctx.moveTo(175, 175);                                  // Move para o centro da roleta
    ctx.arc(175, 175, 175, startAngle, endAngle);         // Desenha o arco da fatia
    ctx.closePath();                                       // Fecha o caminho da fatia
    ctx.fill();                                            // Preenche a fatia com a cor definida

    ctx.save();                                            // Salva o estado atual do canvas
    ctx.translate(175, 175);                               // Move o ponto de referência para o centro
    ctx.rotate(startAngle + angleStep / 2);               // Rotaciona para escrever o número da pergunta no centro da fatia
    ctx.textAlign = "right";                               // Alinha o texto à direita
    ctx.fillStyle = "#fff";                                // Cor do texto (branco)
    ctx.font = "bold 14px Arial";                          // Fonte e tamanho do texto
    ctx.fillText("Q" + (i + 1), 160, 5);                  // Escreve "Q1", "Q2", etc., em cada fatia
    ctx.restore();                                         // Restaura o estado do canvas para desenhar a próxima fatia
  }
}





















// função 2
//Essa função atualiza o placar do jogo na tela.
//Ela mostra os grupos, muda a cor de fundo conforme o grupo da vez, e escreve quantos pontos cada grupo tem.
function updateScoreboard() {  
  scoreboardEl.className = 'default-bg';  // Define a classe do placar como "default-bg", limpando estilos anteriores

  const group = groups[currentGroupIndex];  // Pega o grupo que está na vez no momento
  switch (group.name) {                     // Verifica qual é o grupo atual pelo nome
    case "Grupo Azul":
      scoreboardEl.classList.add('bg-azul');    // Se for o Grupo Azul → aplica a cor azul no placar
      break;
    case "Grupo Vermelho":
      scoreboardEl.classList.add('bg-vermelho');// Se for o Grupo Vermelho → aplica a cor vermelha no placar
      break;
    case "Grupo Verde":
      scoreboardEl.classList.add('bg-verde');   // Se for o Grupo Verde → aplica a cor verde no placar
      break;
    case "Grupo Amarelo":
      scoreboardEl.classList.add('bg-amarelo'); // Se for o Grupo Amarelo → aplica a cor amarela no placar
      break;
    case "Grupo Roxo":
      scoreboardEl.classList.add('bg-roxo');    // Se for o Grupo Roxo → aplica a cor roxa no placar
      break;
  } // Assim, o placar muda de cor de fundo conforme o grupo que está jogando


  scoreboardEl.innerHTML = "<h3>Placar</h3> ";  // Define o título "Placar" no placar, limpando o conteúdo anterior

groups.forEach(g => {  // Percorre todos os grupos da lista "groups"
  const groupDiv = document.createElement("div");  // Cria um elemento <div> para representar cada grupo
  groupDiv.className = "scoreboard-group";         // Adiciona a classe "scoreboard-group" para estilização
  if (g === group) {                                // Se for o grupo da vez...
    groupDiv.classList.add("active-group");         // ...destaca visualmente esse grupo no placar
  }

  const nameEl = document.createElement("div");    // Cria um <div> para mostrar o nome do grupo
  nameEl.className = "group-name";                 // Define a classe "group-name"
  nameEl.textContent = g.name;                     // Coloca o nome do grupo dentro da <div>

  const scoreEl = document.createElement("div");   // Cria um <div> para mostrar a pontuação do grupo
  scoreEl.className = "group-score";               // Define a classe "group-score"
  scoreEl.textContent = `${g.score} ponto${g.score !== 1 ? 's' : ''}`; // Mostra a pontuação (se >1 coloca "pontos")

  groupDiv.appendChild(nameEl);   // Adiciona o nome do grupo dentro da div principal do grupo
  groupDiv.appendChild(scoreEl);  // Adiciona a pontuação dentro da div principal do grupo

  scoreboardEl.appendChild(groupDiv); // Adiciona a div do grupo dentro do placar principal
});

  turnIndicatorEl.textContent = `🎯 Vez do: ${group.name}`; // Mostra de quem é a vez de jogar
} // Resultado: o placar mostra todos os grupos com seus nomes e pontos atualizados, e destaca o grupo da vez


// Atualiza o texto de progresso, mostrando quantas perguntas já foram respondidas
function updateProgress() {
  const answered = totalQuestions - questions.length;   // Calcula quantas perguntas já saíram da roleta
  progressEl.textContent = `Pergunta ${Math.min(answered + 1, totalQuestions)} de ${totalQuestions} — ${questions.length} restante${questions.length !== 1 ? 's' : ''}`;
}

























// função 3
//O que essa função faz?

//Essa função mostra uma pergunta na tela com várias opções de resposta.
//Cada opção vira um botão, e quando a pessoa clica, o sistema vai verificar se está certo ou errado.
function showQuestion(q) {  
  selectedQuestionEl.innerHTML = q.pergunta + "<br><br>";  // Mostra o texto da pergunta na tela, com duas quebras de linha

  q.opcoes.forEach(op => {   // Percorre todas as opções de resposta da pergunta recebida (q.opcoes)
    const btn = document.createElement("button");   // Cria um botão para cada opção
    btn.className = "option-btn";                   // Define a classe "option-btn" para estilização
    btn.textContent = op;                           // Define o texto do botão como o texto da opção
    btn.onclick = () => checkAnswer(op, q.resposta, btn); // Quando o botão for clicado, chama a função checkAnswer
                                                     // passando a opção escolhida, a resposta correta e o próprio botão
    selectedQuestionEl.appendChild(btn);            // Adiciona o botão na tela, logo abaixo da pergunta
  });
} // Resultado: mostra a pergunta e cria os botões para que o jogador escolha uma resposta




















// função 4
//O que essa função faz?
//Ela é chamada quando alguém escolhe uma opção de resposta.
//A função confere se a resposta está certa ou errada, dá os pontos e atualiza o placar.
function checkAnswer(op, correct, btnEl) {
  const currentGroup = groups[currentGroupIndex];   // Pega o grupo que está jogando no momento
  const selectedLetter = op.trim().charAt(0).toUpperCase(); // Pega a primeira letra da opção escolhida e deixa em maiúscula
  const correctLetter = correct.trim().toUpperCase(); // Normaliza a letra correta para maiúscula

  if (selectedLetter === correctLetter) {   // Verifica se a letra escolhida é igual à resposta correta
    messageEl.textContent = "✅ Acertou! +1 ponto";  // Mostra mensagem de acerto na tela
    currentGroup.score++;                           // Adiciona +1 ponto ao grupo atual
  } else {
    messageEl.textContent = "❌ Errou! Resposta correta: " + correct; // Mostra mensagem de erro e a resposta certa
  }

  updateScoreboard();   // Atualiza o placar depois da resposta

  document.querySelectorAll(".option-btn").forEach(b => {
    b.disabled = true;                               // Desativa todos os botões de opções, para não poder clicar de novo na mesma pergunta
    const letter = b.textContent.trim().charAt(0).toUpperCase();
    if (letter === correctLetter) {
      b.classList.add("correct");                    // Destaca em verde a opção correta
    } else if (b === btnEl) {
      b.classList.add("wrong");                       // Destaca em vermelho a opção errada escolhida
    }
  });

  // Remove a pergunta respondida do array para não repetir
  const indexToRemove = questions.indexOf(currentQuestion); // Acha a posição da pergunta atual no array
  if (indexToRemove > -1) {
    questions.splice(indexToRemove, 1);   // Remove a pergunta da lista
  }

  questionAnswered = true;   // Marca que a pergunta já foi respondida
  updateProgress();          // Atualiza o texto de progresso

  if (questions.length === 0) {    // Se não houver mais perguntas...
    spinBtn.disabled = true;       // Desativa o botão de girar
    nextBtn.style.display = "none"; // Esconde o botão de próxima pergunta
    finalScoreBtn.style.display = "inline-block"; // Mostra o botão para ver o placar final
  } else {
    nextBtn.style.display = "inline-block"; // Se ainda tem perguntas, mostra o botão de próxima pergunta
  }

  spinBtn.disabled = true;   // Desativa o botão de girar até passar para a próxima rodada
}


nextBtn.addEventListener("click", () => {                 // Quando o botão "Próxima Pergunta" for clicado, executa a função
  if (questions.length === 0) return; // Não faz nada se acabou  // Se não houver mais perguntas, sai da função e não faz nada

  currentGroupIndex = (currentGroupIndex + 1) % groups.length;  // Passa a vez para o próximo grupo (volta ao primeiro se chegar no último)
  turmaScreenEl.style.background = groups[currentGroupIndex].color; // Muda a cor de fundo da página para a cor do grupo atual
  selectedQuestionEl.innerHTML = "";  // Limpa a área da pergunta na tela
  messageEl.textContent = "";         // Limpa a mensagem de acerto/erro
  nextBtn.style.display = "none";     // Esconde o botão "Próxima Pergunta"

  spinBtn.disabled = false;           // Reativa o botão de girar a roleta

  drawWheel();                        // Redesenha a roleta com as perguntas restantes
  updateScoreboard();                 // Atualiza o placar e o indicador de turno para o novo grupo
});

























//funçao 5 
//O que essa função faz?
//Essa função faz a roleta girar quando o jogador clica no botão.
//Depois que a roleta para de girar, ela escolhe uma pergunta aleatória, mostra na tela e impede que a roleta seja girada novamente até que a pergunta seja respondida.
spinBtn.addEventListener("click", () => {   // Quando o botão "Girar a Roleta" for clicado, executa a função
  if (spinning || !questionAnswered || questions.length === 0) return; 
  // Se a roleta já estiver girando, ou a pergunta anterior ainda não foi respondida,
  // ou não houver mais perguntas, a função para e não faz nada.

  spinning = true;             // Marca que a roleta está girando
  questionAnswered = false;    // Marca que ainda não tem pergunta respondida nessa rodada

  const numSegments = questions.length;    // Conta quantos segmentos (perguntas) ainda existem
  const randomSpin = Math.floor(Math.random() * 360) + 720;  
  // Gera um valor aleatório para o giro (entre 720° e 1080° = de 2 a 3 voltas completas)
  const finalAngle = angle + randomSpin;   // Soma o ângulo atual com o novo giro

  canvas.style.transition = "transform 3s ease-out"; // Define uma animação de 3 segundos para girar suavemente
  canvas.style.transform = `rotate(${finalAngle}deg)`; // Gira a roleta até o ângulo calculado

  setTimeout(() => {   // Depois de 3 segundos (tempo da animação) executa:
    angle = finalAngle % 360;  // Atualiza o ângulo para a posição final da roleta
    const anglePerSegment = 360 / numSegments;
    // O ponteiro fica fixo no topo (posição 270° no sistema de ângulos do canvas).
    // Depois de girar o canvas "angle" graus no sentido horário, descobrimos qual
    // fatia original ficou sob o ponteiro fazendo o caminho inverso.
    const pointerAngle = ((270 - angle) % 360 + 360) % 360;
    const selectedIndex = Math.floor(pointerAngle / anglePerSegment) % numSegments;
    // Calcula qual segmento (pergunta) caiu sob o ponteiro, baseado no ângulo final

    currentQuestion = questions[selectedIndex];  // Define a pergunta sorteada como a atual
    showQuestion(currentQuestion);               // Mostra a pergunta e as opções na tela

    spinBtn.disabled = true;  // Desativa o botão de girar até a rodada terminar

    spinning = false;         // Marca que a roleta parou de girar
  }, 3000);                   // Tempo de espera = 3 segundos (igual à animação)
});


























//funçao 6
//O que essa função faz?

//Essa função mostra o placar final do jogo quando todas as perguntas foram respondidas.
//Ela indica quem venceu ou se houve empate, mostra os pontos de todos os grupos e esconde os botões que não são mais necessários.
function showFinalScoreboard() {
  selectedQuestionEl.innerHTML = "<h2>Fim do jogo!</h2>"; // Mostra o título de encerramento
  messageEl.textContent = ""; // Limpa qualquer mensagem anterior
  finalScoreBtn.style.display = "none"; // Esconde o botão de mostrar placar final (se tiver)

  // Ordena os grupos por pontuação em ordem decrescente
  const sortedGroups = [...groups].sort((a, b) => b.score - a.score);

  // Pega a maior pontuação
  const maxScore = sortedGroups[0].score;

  // Verifica se há empate (mais de um com a mesma pontuação máxima)
  const winners = sortedGroups.filter(g => g.score === maxScore);

  // Define a mensagem do vencedor ou do empate
  let winnerText = winners.length === 1
    ? `🏆 Vencedor: ${winners[0].name} com ${winners[0].score} ponto${winners[0].score !== 1 ? 's' : ''}!`
    : `🏆 Empate entre: ${winners.map(g => g.name).join(", ")} com ${maxScore} pontos!`;

  // Monta o HTML do placar final
  let scoreboardHTML = "<h3>Placar Final</h3>";
  sortedGroups.forEach(g => {
    scoreboardHTML += `<div><strong>${g.name}:</strong> ${g.score} ponto${g.score !== 1 ? 's' : ''}</div>`;
  });

  // Exibe o vencedor e o placar na tela
  selectedQuestionEl.innerHTML += `<p>${winnerText}</p>${scoreboardHTML}`;

  // Esconde os botões de girar e avançar, já que o jogo terminou
  spinBtn.style.display = "none";
  nextBtn.style.display = "none";
  progressEl.textContent = "";        // Limpa o texto de progresso
  turnIndicatorEl.textContent = "";   // Limpa o indicador de turno

  // Mostra o botão para jogar novamente
  restartBtn.style.display = "inline-block";
}


// função 7
// Reinicia o jogo do zero: zera os placares, restaura as perguntas originais
// e devolve a roleta e os botões ao estado inicial.
function restartGame() {
  groups.forEach(g => g.score = 0);         // Zera a pontuação de todos os grupos
  currentGroupIndex = 0;                    // Volta para o primeiro grupo
  turmaScreenEl.style.background = groups[currentGroupIndex].color; // Restaura a cor de fundo inicial

  questions.length = 0;                     // Esvazia a lista de perguntas atual
  questionsBackup.forEach(q => questions.push({ ...q, opcoes: [...q.opcoes] })); // Repõe todas as perguntas originais

  canvas.style.transition = "none";         // Remove a animação temporariamente
  canvas.style.transform = "rotate(0deg)";  // Reseta a rotação visual da roleta
  void canvas.offsetWidth;                  // Força o navegador a aplicar o reset antes de reativar a transição
  canvas.style.transition = "";             // Reativa a animação de giro

  angle = 0;                                // Reseta o ângulo acumulado
  spinning = false;                         // Garante que a roleta não está girando
  currentQuestion = null;                   // Limpa a pergunta atual
  questionAnswered = true;                  // Libera o botão de girar

  selectedQuestionEl.innerHTML = "";        // Limpa a área de pergunta
  messageEl.textContent = "";               // Limpa a mensagem de acerto/erro

  spinBtn.style.display = "inline-block";   // Mostra novamente o botão de girar
  spinBtn.disabled = false;                 // Reativa o botão de girar
  nextBtn.style.display = "none";           // Esconde o botão de próxima pergunta
  finalScoreBtn.style.display = "none";     // Esconde o botão de placar final
  restartBtn.style.display = "none";        // Esconde o botão de reiniciar

  drawWheel();          // Redesenha a roleta completa
  updateScoreboard();    // Atualiza o placar e o indicador de turno
  updateProgress();      // Atualiza o texto de progresso
}


// Inicialização
drawWheel();
updateScoreboard();
updateProgress();

})();
