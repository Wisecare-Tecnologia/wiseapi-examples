# React Room - Exemplo WiseAPI Frontend

Este é um exemplo de implementação frontend em React utilizando a **WiseAPI** para gerenciamento de salas de videoconferência. O projeto demonstra como criar uma interface de usuário para criar e entrar em salas de videoconferência com funcionalidades completas.

## Sobre o Projeto

Este projeto é uma aplicação React + Vite que integra com a WiseAPI para:
- **Criar** novas salas de videoconferência
- **Entrar** em salas existentes como participante ou moderador
- **Iniciar** conferências de vídeo diretamente no navegador
- **Gerenciar** sessões de videoconferência com controles de áudio/vídeo

## Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces de usuário
- **Vite** - Build tool rápido e moderno
- **WiseAPI** - SDK para integração com o sistema de videoconferência
- **Axios** - Cliente HTTP para comunicação com a API backend
- **TypeScript** - Linguagem tipada para desenvolvimento
- **ESLint** - Linter para qualidade de código

## Instalação

### Pré-requisitos
- Node.js 18+ instalado
- pnpm (ou npm/yarn)
- Backend rodando (veja [node-room](../node-room/README.md))

### Passos

1. Clone o repositório e navegue até o diretório:
```bash
cd react-room
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env
```

Edite o arquivo `.env` caso precise customizar as URLs:
```env
VITE_API_BASE_URL=https://session-manager.homolog.v4h.cloud/api/v1
VITE_API_DOMAIN=conf.homolog.v4h.cloud
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

A aplicação estará rodando em `http://localhost:5173`

## Configuração das Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente (opcionais, definidas no arquivo `.env`):

### Configuração WiseAPI

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_BASE_URL` | URL base da API do gerenciador de sessões | `https://session-manager.homolog.v4h.cloud/api/v1` |
| `VITE_API_DOMAIN` | Domínio do servidor de conferência | `conf.homolog.v4h.cloud` |

**Nota**: Se as variáveis não forem definidas, a aplicação utilizará os valores padrão configurados em [src/config.ts](src/config.ts).

## 🛠️ Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento com hot reload
- `pnpm build` - Compila o TypeScript e faz o build para produção
- `pnpm preview` - Visualiza o build de produção localmente
- `pnpm lint` - Executa o ESLint para verificar a qualidade do código

## 📋 Funcionalidades

### Criação de Sala
1. Clique no botão "Criar Sala"
2. Uma nova sala será criada automaticamente
3. O ID da sala será exibido na tela

### Entrada em Sala
1. Insira o ID da sala
2. Preencha seu nome e sobrenome
3. Escolha se deseja entrar como moderador (checkbox)
4. Clique em "Entrar na Sala"
5. A conferência iniciará automaticamente

### Controles da Conferência
- **Áudio**: Controle de microfone (inicialmente mutado)
- **Vídeo**: Controle de câmera (inicialmente desabilitado)
- **Moderação**: Funcionalidades extras para moderadores
- **Sair**: Encerra a conferência e fecha a sessão

## Estrutura do Projeto

```
react-room/
├── src/
│   ├── App.tsx           # Componente principal com toda a lógica
│   ├── config.ts         # Configurações centralizadas
│   ├── service.ts        # Serviços de comunicação com backend
│   └── main.tsx          # Entry point da aplicação
├── .env.example          # Exemplo de variáveis de ambiente
├── package.json          # Dependências e scripts
└── README.md            # Este arquivo
```

## Integração com Backend

Esta aplicação frontend depende do backend [node-room](../node-room) para:
- Criar novas salas
- Gerar tokens de acesso para entrada em salas
- Gerenciar autenticação com a WiseAPI

**Importante**: Certifique-se de que o backend está rodando em `http://localhost:3334` antes de usar esta aplicação.

Para configurar e iniciar o backend, consulte o [README do node-room](../node-room/README.md).

## Notas Importantes

1. **Configuração Centralizada**:
   - Todas as configurações da API estão centralizadas no arquivo `src/config.ts`
   - Suporta variáveis de ambiente para diferentes ambientes (dev, staging, prod)
   - Valores padrão disponíveis caso as variáveis não sejam definidas

2. **Segurança**:
   - O arquivo `.env` não deve ser commitado (já está no `.gitignore`)
   - Use variáveis de ambiente seguras em produção
   - As credenciais são gerenciadas pelo backend

3. **Compatibilidade**:
   - A aplicação funciona nos navegadores modernos que suportam WebRTC
   - Requer permissões de câmera e microfone do navegador

4. **Desenvolvimento**:
   - O projeto usa TypeScript para type-safety
   - Hot Module Replacement (HMR) está habilitado para desenvolvimento rápido
   - ESLint configurado para manter qualidade de código

## Troubleshooting

### Erro ao criar sala
- Verifique se o backend está rodando
- Confirme se as credenciais no backend estão corretas
- Verifique o console do navegador para mais detalhes

### Erro ao entrar na sala
- Certifique-se de que o ID da sala é válido
- Verifique se todos os campos obrigatórios foram preenchidos
- Confirme as permissões de câmera e microfone no navegador

### Vídeo/áudio não funciona
- Verifique as permissões do navegador
- Teste em um navegador diferente
- Confirme se seu dispositivo tem câmera/microfone disponíveis

## Documentação Adicional

Para mais informações sobre a WiseAPI, consulte a [documentação oficial](https://www.npmjs.com/package/wise-api).
