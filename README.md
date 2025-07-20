# MERX Energia - Teste Prático TI 2025 🚀

Este projeto consome a **Marvel Comics API** e exibe uma interface moderna e intuitiva para listar personagens, visualizar detalhes e aplicar filtros de pesquisa.

🗕️ **Prazo de entrega:** 20/07/2025\
📌 **Autor:** Pedro Felipe

---

## 🌐 Deploy do Projeto

🔗 [Acessar o site](https://projeto-marvel-teste-tecnico.vercel.app/)

---

## ⚡ Tecnologias Utilizadas

- **Next.js** (React Framework)
- **Typescript** (tipagem segura)
- **TailwindCSS** (estilização responsiva e rápida)
- **Axios** (requisições HTTP)
- **md5** (hash para autenticação da API Marvel)
- **Vercel** (deploy)

---

## 🖥️ Funcionalidades Implementadas

✔️ **Página inicial** com listagem de personagens da Marvel\
✔️ **Modal de detalhes** ao clicar em um personagem\
✔️ **Search input** para buscar personagens por nome\
✔️ **Filtros adicionais:**

- Por série (Avengers, X-Men, etc.)
- Por ordem de data que foi inserida na API (no mock são datas fictícias)
- 
---

## 📦 Instalação e Execução

### 🔑 Pré-requisitos

- Node.js 18+
- npm ou yarn

### 🚀 Passos

1. Clone o repositório:
   ```bash
   git clone [https://github.com/pedrofelipeot/projeto-marvel.git](https://github.com/pedrofelipeot/projeto-marvel.git)
   ```
    ```bash
   cd projeto-marvel
   ```


2. Instale as dependências:
```bash
npm install
````

ou

```bash
yarn
```

3. Crie um arquivo `.env.local` na raiz com as seguintes variáveis:
   ```env
   NEXT_PUBLIC_MARVEL_PUBLIC_KEY=SUA_CHAVE
   MARVEL_PRIVATE_KEY=SUA_CHAVE
   NEXT_PUBLIC_USE_MOCK=true
   ```

4. **Modo mock (offline)**  
- Com `USE_MOCK=true`, o projeto usa dados **mockados** (em `/src/mocks/characters.json`).  
- Ideal enquanto a API real está fora do ar.

5. **Modo API (online)**  
- Quando a API Marvel voltar, defina:
  ```env
  USE_MOCK=false
  ```
- Certifique-se de preencher as chaves `MARVEL_PUBLIC_KEY` e `MARVEL_PRIVATE_KEY` obtidas no [Marvel Developer Portal](https://developer.marvel.com/).

6. Rode o projeto localmente:
```bash
npm run dev
````

ou

```bash
yarn dev
```

7. Acesse no navegador:
   ```
   [http://localhost:3000](http://localhost:3000)
   ```
---

## 📝 Explicação do Mock

A **Marvel Comics API** está com instabilidade no momento do desenvolvimento. Por isso:

✔️ Dados reais foram exportados e salvos em `/src/mocks/characters.json`  
✔️ O projeto verifica a variável `USE_MOCK`:
- `USE_MOCK=true`: usa os dados mockados
- `USE_MOCK=false`: faz requisições reais à API Marvel

Essa abordagem garante que o site funcione mesmo com a API indisponível.

---

## 🔖 Pontos de Atenção

🔒 **Chaves da API**
- É obrigatório ter uma conta no [Marvel Developer Portal](https://developer.marvel.com/)
- Gere suas chaves pública e privada e adicione no `.env.local`

## 🗓️ Regras Atendidas

✔️ Listagem de personagens com limite de 20\
✔️ Modal com detalhes do personagem\
✔️ Busca com nova requisição à API\
✔️ Filtros aplicados sem necessidade de nova requisição (para aparições)\
✔️ Deploy realizado (link no início deste README)\
✔️ Documentação completa com instruções e explicações

---

## 📂 Estrutura do Projeto

```
src/
├── app/               # Rotas Next.js
├── components/        # Componentes React
│   ├── CharacterCard.tsx
│   ├── CharacterModal.tsx
    ├── CharacterPage.tsx
├── Interface/
    └── character.ts
├── lib/               # Funções auxiliares (API)
│   └── marvelApi.ts
    └── marvel-characters.ts
├── mocks/             # Dados mockados
│   └── characters.json
```
---

## ✨ Autor

Pedro Felipe\
[GitHub](https://github.com/pedrofelipeot) | [LinkedIn](https://www.linkedin.com/in/pedrofelipeot/)

---

