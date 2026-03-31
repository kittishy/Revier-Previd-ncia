const http = require('http');
const https = require('https');

// LISTA DE MODELOS (ORDEM DE PRIORIDADE)
const MODELS = [
  "minimax/minimax-m2.5:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "liquid/lfm-40b:free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "google/gemini-flash-1.5-exp:free",
  "deepseek/deepseek-v3",
  "groq/llama-3.3-70b-versatile"
];

const server = http.createServer((req, res) => {
  // O Claude Code faz requisições POST para /v1/messages
  // (Note que o ANTHROPIC_BASE_URL no settings.json terá /api no final, 
  // e o Claude Code adiciona /v1/messages automaticamente)
  if (req.method === 'POST' && req.url.includes('/messages')) {
    let body = Buffer.alloc(0);
    req.on('data', chunk => body = Buffer.concat([body, chunk]));
    req.on('end', () => {
      try {
        const payload = JSON.parse(body.toString());
        const authHeader = req.headers['authorization'] || '';
        
        console.log(`\n[Proxy] Requisição recebida do Claude Code. Processando...`);
        handleRequest(payload, authHeader, 0, res);
      } catch (e) {
        console.error("[Proxy] Erro ao processar JSON:", e.message);
        res.writeHead(400);
        res.end("Invalid JSON");
      }
    });
  } else {
    // Para outros endpoints (como verificação de versão ou similar)
    console.log(`[Proxy] Ignorando requisição: ${req.method} ${req.url}`);
    res.writeHead(404);
    res.end();
  }
});

function handleRequest(payload, authHeader, modelIdx, clientRes) {
  if (modelIdx >= MODELS.length) {
    console.error("[Proxy] ❌ ERRO: Todos os modelos falharam ou atingiram o limite.");
    clientRes.writeHead(429, { 'Content-Type': 'application/json' });
    clientRes.end(JSON.stringify({ 
      error: { 
        message: "Todos os modelos na lista do Proxy atingiram o Rate Limit. Tente novamente mais tarde." 
      } 
    }));
    return;
  }

  const model = MODELS[modelIdx];
  payload.model = model; // Sobrescreve o modelo solicitado pelo do Proxy
  console.log(`[Proxy] [Tentativa ${modelIdx + 1}/${MODELS.length}] Usando: ${model}`);

  const reqOptions = {
    hostname: 'openrouter.ai',
    path: '/api/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Claude Code Router Proxy'
    }
  };

  const proxyReq = https.request(reqOptions, (proxyRes) => {
    // Se o OpenRouter retornar 429 (Rate Limit) ou 502/503 (Erro de Provedor Temporário)
    if (proxyRes.statusCode === 429 || proxyRes.statusCode >= 500) {
      console.warn(`[Proxy] ⚠️  Modelo ${model} indisponível (Status ${proxyRes.statusCode}). Tentando próximo...`);
      // IMPORTANTE: Só podemos tentar o próximo se não enviamos nada pro cliente ainda
      if (!clientRes.headersSent) {
        handleRequest(payload, authHeader, modelIdx + 1, clientRes);
      }
      return;
    }

    // Sucesso ou outro erro que não queremos "pular"
    console.log(`[Proxy] ✅ Canal aberto com ${model} (Status ${proxyRes.statusCode})`);
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(clientRes);
  });

  proxyReq.on('error', (e) => {
    console.error(`[Proxy] Erro de rede: ${e.message}`);
    if (!clientRes.headersSent) {
      handleRequest(payload, authHeader, modelIdx + 1, clientRes);
    }
  });

  proxyReq.write(JSON.stringify(payload));
  proxyReq.end();
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log('==============================================');
  console.log(`🚀 CLAUDE CODE ROUTER PROXY ATIVO`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📂 Roteando entre ${MODELS.length} modelos.`);
  console.log('---');
  console.log(`MANTENHA ESTA JANELA ABERTA PARA USAR O CLAUDE`);
  console.log('==============================================');
});
