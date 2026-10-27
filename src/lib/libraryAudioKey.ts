// Chave estável para a tabela `library_audio` (áudio fixo das frases da
// Biblioteca). Não depende da posição da frase na lista, então remover ou
// reordenar frases em `libraryPhrases.ts` não desalinha os áudios.
//
// - Itens com `audioKey` (músicas) usam essa chave fixa: corrigir a letra
//   exibida não desvincula o MP3 enviado.
// - Os demais usam um hash do texto: mudou o texto, o áudio antigo deixa de
//   valer (o que é o esperado, já que a fala mudou).
//
// Sem idioma na chave: a Biblioteca sempre toca o texto original em PT.

function hashText(text: string): string {
  let hash = 5381;
  const input = text.trim().toLowerCase();
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

export function getLibraryAudioKey(phrase: { text: string; category: string; audioKey?: string }): string {
  if (phrase.audioKey) return `${phrase.category}_${phrase.audioKey}`;
  return `${phrase.category}_${hashText(phrase.text)}`;
}
