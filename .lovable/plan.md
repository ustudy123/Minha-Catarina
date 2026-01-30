
# Plano: Nova Categoria "Idiomas" na Biblioteca

## Resumo
Criar uma nova categoria principal chamada "Idiomas" na Biblioteca que servirá como porta de entrada para duas subcategorias: "Aprendendo Inglês" e "Aprendendo Espanhol". Ao clicar em "Idiomas", o usuário será levado a uma nova página dedicada onde poderá escolher qual idioma deseja aprender.

## Estrutura Proposta

```text
Biblioteca
├── Todas
├── Músicas
├── Histórias e Poemas
├── Carinho
├── Dia a Dia
├── Educação
├── Brincadeiras
├── Sons
├── Orações
├── Idiomas (NOVA) ──────▶ Página separada com:
│                            ├── Aprendendo Inglês
│                            └── Aprendendo Espanhol
└── Minhas Frases (Premium)
```

## Etapas de Implementação

### 1. Criar Nova Página de Idiomas
Criar `src/pages/Languages.tsx` com:
- Cabeçalho com botão voltar para a Biblioteca
- Dois cards grandes para seleção:
  - "Aprendendo Inglês" (com bandeira 🇺🇸/🇬🇧)
  - "Aprendendo Espanhol" (com bandeira 🇪🇸)
- Cada card exibe uma lista de frases educativas no idioma escolhido
- Botão de play para ouvir a pronúncia
- Design consistente com o resto da aplicação

### 2. Atualizar Arquivo de Rotas
Modificar `src/App.tsx`:
- Adicionar rota `/languages` protegida

### 3. Atualizar Biblioteca
Modificar `src/pages/Library.tsx`:
- Adicionar categoria "Idiomas" com ícone `Languages` do Lucide
- Ao clicar, redirecionar para `/languages` em vez de filtrar frases

### 4. Adicionar Traduções
Modificar `src/translations/index.ts`:
- Adicionar traduções para a nova seção em PT, EN e ES:
  - Título da página
  - Nome das subcategorias
  - Frases educativas para cada idioma

### 5. Conteúdo das Frases

**Aprendendo Inglês** (frases para ensinar inglês às crianças):
- Cores: "Red is vermelho", "Blue is azul", "Yellow is amarelo"
- Números: "One, two, three - Um, dois, três"
- Saudações: "Hello means Olá", "Goodbye means Tchau"
- Animais: "Dog is cachorro", "Cat is gato"
- Família: "Mom is mamãe", "Dad is papai"

**Aprendendo Espanhol** (frases para ensinar espanhol às crianças):
- Cores: "Rojo es vermelho", "Azul es azul", "Amarillo es amarelo"
- Números: "Uno, dos, tres - Um, dois, três"
- Saudações: "Hola significa Olá", "Adiós significa Tchau"
- Animais: "Perro es cachorro", "Gato es gato"
- Família: "Mamá es mamãe", "Papá es papai"

---

## Detalhes Técnicos

### Novo Arquivo: `src/pages/Languages.tsx`
- Componente React com Tabs para alternar entre inglês e espanhol
- Reutiliza `PlayButton`, `AudioControls` e hooks existentes
- Usa `useTextToSpeech` para gerar áudio das frases
- Cards com layout similar à página da Biblioteca

### Modificação em `src/pages/Library.tsx`
- Nova entrada no array `categories`:
```javascript
{ id: "languages", name: t.library.categories.languages, icon: Languages, isLink: true, linkTo: "/languages" }
```
- Lógica para redirecionar ao clicar na categoria

### Modificação em `src/translations/index.ts`
- Adicionar novo objeto `languageLearning` em cada idioma (pt, en, es) contendo:
  - `title`: Título da página
  - `subtitle`: Subtítulo
  - `learningEnglish`: "Aprendendo Inglês"
  - `learningSpanish`: "Aprendendo Espanhol"
  - `englishPhrases`: Array de frases para aprender inglês
  - `spanishPhrases`: Array de frases para aprender espanhol

### Modificação em `src/App.tsx`
- Importar nova página `Languages`
- Adicionar rota protegida `/languages`
