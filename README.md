# PieceFans

Catálogo de One Piece em português, com React 19, Tailwind CSS 4 e Express 5. Projeto de fãs sem vínculo oficial com a obra. O conteúdo inclui spoilers.

## Desenvolvimento

Requer Node.js 22.12+ (validado com Node 24) e npm.

```sh
npm ci --cache /tmp/piecefans-npm-cache
npm run dev
```

O Vite usa a porta 5173 e encaminha `/api` para o Express na porta 3001. A API também pode usar `PORT`. Execute os comandos na raiz do repositório.

## Verificação e produção

```sh
npm test
npm run build
npm start
```

Em produção, o Express serve a API e o frontend compilado na porta 3001. Nenhuma credencial ou banco de dados é necessário. O catálogo editorial fica em `backend/data/catalog.js`; os favoritos ficam no armazenamento local do navegador. As imagens são servidas localmente (fontes e créditos em `frontend/public/images/SOURCES.md`). As fontes do Google são opcionais e têm fallback local.

## API

- `GET /api/health`
- `GET /api/categories`
- `GET /api/entries?category=personagens&q=luffy&group=Chapéus%20de%20Palha`
- `GET /api/entries/:id`

Categorias: `personagens`, `frutas`, `ilhas`, `bandos`, `curiosidades`.
