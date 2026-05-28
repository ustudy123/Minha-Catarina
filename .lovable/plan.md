## Objetivo
Tornar o play das frases instantâneo em todas as páginas, fazendo preload em background dos áudios assim que a página carrega.

## Páginas afetadas
1. `src/pages/Library.tsx` — biblioteca principal
2. `src/pages/Presentation.tsx` — apresentação da Catarina
3. `src/pages/DailyPhrases.tsx` — frases do dia
4. `src/pages/Routines.tsx` — rotinas
5. `src/pages/Favorites.tsx` — favoritos (bônus, mesma lógica)
6. `src/pages/Languages.tsx` — lições de idioma

## Como vai funcionar

```text
Página monta
   ↓
useEffect dispara preloadMany() das frases visíveis
   ↓
áudios baixam em background (2 por vez, sem toast)
   ↓
ficam salvos em audioCache (Map em memória)
   ↓
Usuário clica Play → useTextToSpeech.generate() encontra no cache → toca instantâneo
```

## Estratégia de preload (para não estourar quota ElevenLabs)

- **Library**: preload só das frases da categoria/subcategoria selecionada (máx 20 por vez). Re-dispara quando o usuário muda de categoria.
- **Presentation**: preload de todas (são só 6-8 frases).
- **DailyPhrases**: preload das frases filtradas visíveis (máx 15).
- **Routines**: preload das frases da rotina aberta quando o usuário expande uma.
- **Favorites**: preload dos primeiros 15 favoritos.
- **Languages**: preload da lição visível.

## Feedback visual instantâneo

No `PlayButton`, quando `isLoading=true` mas o áudio **já está no cache**, pular o spinner — clicar deve ir direto pra animação de onda (`AudioWaveAnimation`). Vou adicionar uma prop `isCached` opcional ao botão pra ele saber que não precisa mostrar loader.

## Detalhes técnicos

- `useAudioPreloader` já existe e funciona — só precisa ser chamado nas páginas.
- `audioCache` é Map global em memória, persiste entre navegações enquanto a aba estiver aberta.
- Cache key = `${text}_${language}_${voiceId}` — se o usuário trocar voz/idioma, refaz preload automaticamente (via dependência no `useEffect`).
- Sem toasts durante preload (silencioso).
- Logs no console pra debugar (`[Preloader] ...`).
- Respeita limite de 2 requests concorrentes com 200ms entre batches.

## Custo de API (estimativa)

Cada preload gera 1 chamada ElevenLabs por frase nova. Uma vez em cache, **zero chamadas adicionais** mesmo navegando entre páginas. Pior caso na primeira visita: ~60-80 frases pré-carregadas no total. Depois disso, navegação é gratuita.

## Risco / mitigação

- **Quota**: limitar preload a frases visíveis evita gerar áudio pras 500+ frases da biblioteca.
- **Memória**: blobs MP3 são pequenos (~20-50KB cada), 100 frases = ~5MB, OK.
- **Race conditions**: se usuário clicar Play antes do preload terminar daquela frase, fluxo atual de `generate()` ainda funciona (cai no caminho normal).
