

## Plan: Reorganizar Histórias, Poemas, Músicas e Categorias da Biblioteca

### Problemas Identificados

1. **Histórias**: Todas as 20+ histórias estão misturadas numa única subcategoria `"historias"`. Cada história deveria ser uma subcategoria separada (Os Três Porquinhos, Chapeuzinho Vermelho, etc.)

2. **Poemas**: Todos os poemas estão numa única subcategoria `"poemas"`. Cada poema deveria ser separado (Dedinhos, Batatinha, Uni Duni, etc.), com as 9 frases introdutórias antes dos poemas individuais.

3. **Músicas**: Todas as músicas estão sem subcategoria, misturadas. Cada música deveria ser uma subcategoria separada (Ciranda Cirandinha, Barata, Alecrim, etc.), com as 4 frases introdutórias antes.

4. **Categoria "Carinho" (affection)** não existe mais no documento. Foi substituída por: **Acolhimento**, **Sentimentos**, **Bons Costumes**, **Quando a Criança Chora**, **Entrevista com a Criança**.

### Mudanças Planejadas

#### 1. Atualizar `src/data/libraryPhrases.ts`

**Histórias** - Cada história ganha sua própria `subCategory`:
- Frases 1-4 introdutórias ficam em `subCategory: "introducao-historias"`
- `"tres-porquinhos"`, `"chapeuzinho-vermelho"`, `"galinha-ruiva"`, `"coelhinho-pascoa"`, `"leao-e-ratinho"`, `"sapo-bocarrao"`, `"nuvem-dividir"`, `"ursinho-esperar"`, `"coelhinha-verdade"`, `"leao-gentil"`, `"dragao-raiva"`, `"macaquinho-brinquedos"`, `"lebre-tartaruga"`, `"branca-de-neve"`, `"aladim"`, `"cinderela"`, `"pinoquio"`, `"viloes-aprender"`, `"grande-baile"`, `"jardim-eden"`, `"sementinha-corajosa"`, `"tartaruga-apressada"`, `"princesa-escola"`, `"lapis-magico"`, `"pirata-tesouros"`, `"astronauta-estrelas"`

**Poemas** - Cada poema ganha sua própria `subCategory`:
- Frases 1-9 introdutórias em `subCategory: "introducao-poemas"`
- `"dedinhos"`, `"batatinha"`, `"uni-duni"`, `"1-2-3"`, `"sou-pequena"`, `"mamae-papai"`, `"rei-capitao"`, `"casinha-vo"`, `"bruxinha"`, `"galinha"`, `"colo"`

**Músicas** - Cada música ganha sua própria `subCategory`:
- Frases 1-4 introdutórias em `subCategory: "introducao-musicas"`
- `"ciranda"`, `"abraco"`, `"barata"`, `"alecrim"`, `"pombinha-branca"`, `"indiozinho"`, `"numero-zero"`, `"mestre-andre"`, `"boi-cara-preta"`, `"bota-aqui"`, `"requebradinha"`, `"borboletas"`, `"achou"`, `"dedinhos-musica"`, `"parabens"`, `"casinha"`, `"vira-virou"`, `"estatua"`, `"banho"`, `"parque"`, `"guarda"`, `"janta"`

**Categorias reformuladas** - Substituir `"affection"` (Carinho):
- `category: "affection"` com `subCategory: "acolhimento"` (frases 1-17 do Acolhimento)
- `category: "affection"` com `subCategory: "sentimentos"` (frases 1-30 dos Sentimentos)
- `category: "affection"` com `subCategory: "bons-costumes"` → mover de education para affection (ou manter em education)
- `category: "affection"` com `subCategory: "quando-chora"` (frases 1-6)
- `category: "affection"` com `subCategory: "entrevista"` (frases 1-12)

#### 2. Atualizar `src/pages/Library.tsx`

- Atualizar `subCategoryDefinitions` para incluir todas as novas subcategorias de histórias, poemas e músicas
- Renomear a categoria "Carinho" para usar as novas subcategorias (Acolhimento, Sentimentos, Quando a Criança Chora, Entrevista)
- Adicionar ícones apropriados para cada subcategoria

#### 3. Atualizar `src/translations/index.ts`

- Atualizar o nome da categoria "Carinho" se necessário
- Garantir que os nomes das subcategorias estejam corretos

### Resultado Final

- Ao entrar em **Histórias**, o usuário verá cards para cada história individual (Os Três Porquinhos, Chapeuzinho, etc.)
- Ao entrar em **Poemas**, verá cards para cada poema (Dedinhos, Batatinha, etc.)
- Ao entrar em **Músicas**, verá cards para cada música (Ciranda, Barata, etc.)
- A reprodução automática continua funcionando dentro de cada subcategoria
- A navegação hierárquica segue o mesmo padrão já existente (Educação, Brincadeiras, etc.)

