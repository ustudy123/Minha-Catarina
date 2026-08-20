-- Limpeza do cache de áudio gerado no período em que o app usou o modelo
-- eleven_turbo_v2_5 (aprox. após a otimização de custos até o revert).
--
-- Problema: as vozes da Catarina são Instant Voice Clones que degradam para
-- uma voz genérica no turbo. Todo áudio cacheado nesse período está com a
-- voz errada e será servido para sempre se não for removido, mesmo após o
-- modelo ter voltado para multilingual_v2 (a chave de cache não muda).
--
-- Estratégia: como a tabela não guarda o model_id usado, limpamos por data.
-- Todo cache criado após a introdução do turbo é suspeito. O custo de
-- regenerar é aceitável (as frases repopulam sob demanda com a voz correta).
--
-- ATENÇÃO: ajuste a data se necessário. A troca para turbo ocorreu em
-- meados de agosto de 2026.

DELETE FROM audio_cache
WHERE created_at >= '2026-08-13';

-- Opcional: conferir quantas linhas sobraram
-- SELECT COUNT(*) FROM audio_cache;
