# Node session - Exemplo WiseAPI Backend

Este é um exemplo de implementação backend em Node.js utilizando a **WiseAPI** para gerenciamento de sessões de videoconferência. O projeto demonstra como criar, abrir e entrar em sessões utilizando uma API REST construída com Fastify.

## Sobre o Projeto

Este projeto é uma API Fastify que integra com a WiseAPI para:
- **Criar** novas sessões de videoconferência
- **Abrir** sessões existentes
- **Permitir que usuários entrem** nas sessões

## Tecnologias Utilizadas

- **Fastify** - Framework web rápido e de baixa sobrecarga
- **WiseAPI** - SDK para integração com o sistema de videoconferência
- **Zod** - Validação de schemas TypeScript-first
- **TypeScript** - Linguagem tipada para desenvolvimento
- **tsx** - Runtime TypeScript para desenvolvimento
- **dotenv** - Gerenciamento de variáveis de ambiente

## Instalação

### Pré-requisitos
- Node.js 18+ instalado
- pnpm (ou npm/yarn)

### Passos

1. Clone o repositório e navegue até o diretório:
```bash
cd node-session
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
WISE_BASE_URL=https://session-manager.homolog.v4h.cloud/api/v1
WISE_DOMAIN=conf.homolog.v4h.cloud
WISE_LOGIN=seu-login-aqui
WISE_PASSWORD=sua-senha-aqui

WISE_ORG=sua-organizacao
WISE_ORG_UNIT=sua-unidade

SESSION_JOIN_PWD=senha-para-entrar-sessão

PORT=3334
HOST=0.0.0.0
```

4. Inicie o servidor:
```bash
pnpm start
```

O servidor estará rodando em `http://localhost:3334`

## Configuração das Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente (definidas no arquivo `.env`):

### Configuração WiseAPI

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `WISE_BASE_URL` | URL base da API do gerenciador de sessões | `https://session-manager.homolog.v4h.cloud/api/v1` |
| `WISE_DOMAIN` | Domínio do servidor de conferência | `conf.homolog.v4h.cloud` |
| `WISE_LOGIN` | Credencial de login (UUID ou username) | `9062e0fe-0a7f-4a13-aefb-fa0c206e8077` |
| `WISE_PASSWORD` | Senha de acesso | `sua-senha-aqui` |

### Configuração de Sessão

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `WISE_ORG` | Organização responsável pela sessão | `sua-organização` |
| `WISE_ORG_UNIT` | Unidade organizacional | `seu-setor` |
| `SESSION_JOIN_PWD` | Senha para entrar na sessão | `senha123` |

### Configuração do Servidor

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3334` |
| `HOST` | Host do servidor | `0.0.0.0` |

## 🛠️ Scripts Disponíveis

- `pnpm start` - Inicia o servidor em modo watch (recarrega automaticamente)

## Notas Importantes

1. **Validação de Variáveis de Ambiente**:
   - O projeto utiliza **Zod** para validar todas as variáveis de ambiente na inicialização
   - Se alguma variável estiver faltando ou inválida, o servidor não iniciará e mostrará mensagens de erro claras
   - A validação garante type-safety e previne erros em runtime

2. **Segurança**:
   - Nunca exponha suas credenciais em código versionado
   - O arquivo `.env` não deve ser commitado (já está no `.gitignore`)
   - Use variáveis de ambiente seguras em produção

3. **CORS**:
   - O projeto está configurado com CORS aberto (`origin: '*'`)
   - Ajuste conforme necessário para produção

4. **Senhas**:
   - Configure senhas fortes no arquivo `.env`
   - As senhas são validadas e devem estar presentes para o servidor iniciar

## Documentação Adicional

Para mais informações sobre a WiseAPI, consulte a [documentação oficial](https://www.npmjs.com/package/wise-api).