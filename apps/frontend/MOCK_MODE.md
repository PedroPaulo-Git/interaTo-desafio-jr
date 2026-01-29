# Sistema de Mock (Modo Desenvolvedor)

## 📝 Descrição

O frontend possui um **modo desenvolvedor** que permite executar a aplicação **sem backend**, ideal para demonstrações e deploy apenas do frontend (ex: Vercel).

## 🚀 Como usar

1. Na tela de login, clique no botão **"🚀 Entrar como Desenvolvedor (Mock)"**
2. Você será autenticado com um usuário mockado
3. Todos os dados serão armazenados no **localStorage** do navegador
4. Todas as operações (CRUD) funcionam normalmente:
   - ✅ Listar animais
   - ✅ Criar novo animal
   - ✅ Editar animal
   - ✅ Deletar animal
   - ✅ Alternar view mode (grid/list)

## 🔄 Limpar dados

- Faça **logout** para limpar todos os dados mockados
- Ao clicar novamente em "Entrar como Desenvolvedor", os dados iniciais serão restaurados

## 📦 Dados Mockados Iniciais

- **Usuário**: Desenvolvedor (dev@petshop.com)
- **Animais**:
  - Rex (Golden Retriever, 3 anos)
  - Mimi (Siamês, 2 anos)
  - Bob (Bulldog, 5 anos - de outro usuário)

## 🏗️ Arquitetura

### Arquivos Envolvidos:

1. **`src/lib/mock-data.ts`**: Funções CRUD para dados mockados
2. **`src/lib/auth/auth-context.tsx`**: Lógica de autenticação com suporte a mock
3. **`src/lib/api/animals-api.ts`**: Interceptação de chamadas API quando em modo mock
4. **`src/app/(auth)/login/page.tsx`**: Botão para ativar modo desenvolvedor

### Fluxo:

```
Usuário clica em "Entrar como Desenvolvedor"
    ↓
AuthContext.loginAsDeveloper() é chamado
    ↓
Mock data é inicializado no localStorage
    ↓
isMockMode = true
    ↓
Todas as chamadas API são interceptadas
    ↓
Dados são lidos/escritos no localStorage ao invés do backend
```

## ⚠️ Importante

- O modo mock **NÃO afeta o backend** e pode coexistir com ele
- Ideal para **deploy standalone** do frontend
- Dados são **persistidos apenas no navegador** (localStorage)
- **Não usar em produção real**, apenas para demonstrações
