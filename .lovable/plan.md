
1.  **Mapeamento de Músicas da Biblioteca**:
    *   Utilizar a tabela existente `library_audio` no banco de dados para vincular as letras das músicas a arquivos de áudio de alta qualidade (já cantados pela IA).
    *   Dessa forma, quando o usuário clicar em uma música como "Alecrim Dourado", o app tocará automaticamente a versão cantada em vez de gerar uma leitura de texto.

2.  **Novo "Modo Música" para Frases Personalizadas**:
    *   Adicionar um botão de alternância (Toggle) na tela de criação chamado "Modo Música".
    *   Quando ativado, o sistema aplicará automaticamente duas técnicas:
        *   **Formatação Fonética**: O texto será processado (via IA secundária) para alongar vogais e adicionar pontuações rítmicas (ex: "Bom diaaa... tudo beeeeem...") que induzem a IA a entoar de forma melódica.
        *   **Ajuste de Parâmetros de Voz**: Enviar comandos específicos para a ElevenLabs (reduzindo a "estabilidade" e aumentando o "estilo"), o que torna a voz mais expressiva e menos robótica, simulando o tom de canto.

3.  **Injeção Automática de Símbolos Musicais**:
    *   O sistema inserirá automaticamente emojis de notas musicais (🎶) no início e fim do texto enviado para a API, o que ajuda alguns modelos de IA a entender que o contexto é melódico.

4.  **Backend Inteligente**:
    *   Atualizar a função `text-to-speech` para reconhecer o parâmetro `isSong`. Se verdadeiro, ela aplicará um perfil de voz otimizado para canto, garantindo que a entonação seja variada e rítmica.
