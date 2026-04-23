
## Plano: Canto Automático com IA (Sem Gravação Manual)

Sim, é totalmente possível fazer a IA cantar de forma **100% automática**, sem que o usuário precise gravar nada. A solução combina três tecnologias da ElevenLabs e da Lovable AI Gateway que já temos disponíveis no projeto.

### 🎯 Estratégia Geral
Em vez de pedir para o usuário gravar a melodia, **a própria IA gera a música cantada** usando uma combinação de APIs especializadas. O sistema detecta automaticamente quando uma frase é uma música e aplica o tratamento adequado.

---

### 1. Detecção Automática de Músicas
*   O sistema já sabe quais frases são músicas (categoria `songs` na biblioteca).
*   Para frases personalizadas criadas pelo usuário, adicionaremos um botão **"Modo Música 🎵"** ao lado do botão de gerar voz.
*   Quando ativado, o backend trata o texto como letra de música em vez de fala normal.

---

### 2. Três Abordagens Técnicas (em ordem de qualidade)

#### **Opção A — ElevenLabs Music API (RECOMENDADA - Canto Real) 🎤**
*   A ElevenLabs possui uma API chamada **Music Generation** (`/v1/music`) que gera música cantada de verdade a partir de um prompt.
*   **Como funciona automaticamente:**
    1.  O usuário clica em "Cantar Ciranda Cirandinha" (ou qualquer música).
    2.  Backend monta o prompt: `"Children's song with a sweet little girl's voice singing in Portuguese: [letra completa]. Soft acoustic melody, lullaby style, warm and gentle."`
    3.  A API retorna um áudio MP3 com a música cantada de verdade — voz, melodia, ritmo e instrumentos.
    4.  O áudio é cacheado no Supabase Storage para uso futuro (custo zero nas próximas vezes).
*   **Vantagem:** Resultado é uma música cantada de verdade, sem necessidade de gravação humana.
*   **Limitação:** A voz cantada pode não ser idêntica à voz "Moranguinho 2" escolhida nas configurações (a Music API usa vozes próprias).

#### **Opção B — TTS com Parâmetros Musicais (Mantém a voz da boneca) 🗣️**
*   Usa a mesma voz da boneca, mas processa o texto para **soar mais melódico**:
    *   **Pré-processamento via IA Gateway:** O Gemini reescreve o texto adicionando alongamentos de vogais, pausas rítmicas e quebras musicais. Exemplo: `"Ciranda cirandinha"` vira `"Ciraaaanda... cirandiiiinha... vamos toooodos cirandaaaar..."`.
    *   **Voice settings ajustados:** `stability: 0.1` (muito expressivo), `style: 1.0` (máxima entonação), `speed: 0.85` (mais lento, como canto).
*   **Vantagem:** Mantém a voz Moranguinho 2 que o usuário escolheu.
*   **Limitação:** Não é canto real — é uma fala muito entoada e ritmada (parece quem está "cantarolando" a melodia).

#### **Opção C — Híbrido: TTS + Trilha Musical de Fundo 🎶**
*   Combina a voz cantada (Opção B) com uma trilha instrumental gerada pela API de **Sound Effects** (`/v1/sound-generation`).
*   Backend mistura os dois áudios sobrepostos antes de enviar ao app.
*   **Vantagem:** Cria atmosfera musical completa.
*   **Limitação:** Mais lento e custoso (duas chamadas de API por música).

---

### 3. Implementação Sugerida (em fases)

**Fase 1 — Implementar Opção A (Music API):**
1.  Criar nova edge function `text-to-song` em `supabase/functions/text-to-song/index.ts`.
2.  Aceita parâmetros: `text` (letra), `style` (ex: "lullaby", "cheerful", "calm").
3.  Chama `https://api.elevenlabs.io/v1/music` com prompt otimizado para infantil.
4.  Cacheia o resultado em `library-audio` Storage e na tabela `audio_cache`.

**Fase 2 — Integrar à Biblioteca:**
1.  Em `src/pages/Library.tsx`, no método `handlePlayPhrase`, detectar se `phrase.category === 'songs'`.
2.  Se for música → chamar `text-to-song` em vez de `text-to-speech`.
3.  Pré-gerar todas as ~22 músicas da biblioteca uma única vez (script administrativo) e salvar em `library_audio`.

**Fase 3 — Adicionar Modo Música em Frases Personalizadas:**
1.  Em `src/pages/CreatePhrase.tsx`, adicionar um Toggle "🎵 Modo Música".
2.  Quando ativado, usar a edge function `text-to-song` em vez de `text-to-speech`.

**Fase 4 (Opcional) — Fallback Inteligente:**
1.  Se o usuário não gostar da voz da Music API, oferecer botão "Usar voz da boneca" → cai na Opção B.

---

### 💰 Custos e Considerações
*   **ElevenLabs Music API:** Consome créditos por segundo de áudio gerado (aprox. 1000 caracteres = 1 minuto de música).
*   **Cache agressivo:** Toda música gerada é salva permanentemente, então uma música popular como "Ciranda" só é gerada **1 vez na vida** — todos os usuários reutilizam.
*   Para 22 músicas pré-gravadas da biblioteca, custo estimado único: ~$2-5 USD.

---

### 🎯 Recomendação Final
Implementar **Opção A (Music API)** para a categoria de Músicas da biblioteca. É a única que entrega "canto real automático" sem gravação humana, e o cache mata o custo recorrente.

**Aguardando aprovação para implementar.**
