# Começando

> **Nota**: Certifique-se de ter concluído as instruções do [React Native - Configuração do Ambiente](https://reactnative.dev/docs/environment-setup) até a etapa "Criando uma nova aplicação" antes de continuar.

## Instalação

```bash
# usando npm
npm install

# OU usando Yarn
yarn install
```

## Passo 1: Inicie o Metro Server

Primeiro, você precisará iniciar o **Metro**, o _bundler_ JavaScript que acompanha o React Native.

Para iniciar o Metro, execute o seguinte comando a partir do diretório _root_ do seu projeto React Native:

```bash
# usando npm
npm start

# OU usando Yarn
yarn start
```

## Passo 2: Inicie sua Aplicação

Deixe o Metro Bundler rodando em um terminal _separado_. Abra um _novo_ terminal a partir do diretório _root_ do seu projeto React Native. Execute o seguinte comando para iniciar seu app no _Android_ ou no _iOS_:

### Para Android

```bash
# usando npm
npm run android

# OU usando Yarn
yarn android
```

### Para iOS

```bash
# usando npm
npm run ios

# OU usando Yarn
yarn ios
```

Se tudo estiver configurado _corretamente_, você verá seu novo aplicativo rodando no seu _Emulador Android_ ou _Simulador iOS_ em breve, desde que tenha configurado o emulador/simulador corretamente.

Esta é uma maneira de rodar seu aplicativo — você também pode rodá-lo diretamente dentro do Android Studio ou do Xcode, respectivamente.

# Solução de Problemas

Se você não conseguir fazer isso funcionar, consulte a página de [Solução de Problemas](https://reactnative.dev/docs/troubleshooting).

### Problemas Comuns no Build iOS

A maioria dos problemas encontrados durante o processo de build no iOS está relacionada às permissões de acesso à pasta `ios` ou à pasta geral do projeto. Para resolver, você pode ajustar manualmente as permissões ou rodar os comandos em modo **sudo**. Caso prefira, execute o seguinte comando para liberar as permissões:

```bash
chmod 777 "PASTA/ARQUIVO"
```

Para mais informações sobre como ajustar permissões manualmente, consulte o artigo oficial da Apple:  
[Altere as permissões para arquivos, pastas ou discos no Mac](https://support.apple.com/pt-br/guide/mac-help/mchlp1203/mac#:~:text=Para%20aplicar%20permiss%C3%B5es%20a%20todos,e%20escolha%20Arquivo%20%3E%20Obter%20Informa%C3%A7%C3%B5es.&text=ao%20lado%20de%20Compartilhamento%20e%20Permiss%C3%B5es.)

### Problemas Relacionados a Ícones ou Assets

Se os ícones ou o formato dos assets não estiverem no padrão aceito pela Apple, você pode utilizar ferramentas como o **Makeappicon** para gerar os assets no formato correto.

- **Erro**: _Watchkit AppIcon - The app icon set named "AppIcon" did not have any applicable content_  
  **Solução**: Utilize o site [Makeappicon](https://makeappicon.com/) para criar os assets compatíveis.

Mais detalhes:  
[Stack Overflow - Watchkit AppIcon Issue](https://stackoverflow.com/questions/29335509/watchkit-appicon-the-app-icon-set-named-appicon-did-not-have-any-applicable)

### Erros de Sandbox

Se você encontrar erros relacionados à **Sandbox**, como o abaixo:

- **Erro**: _Sandbox: rsync.samba (13105) deny(1) file-write-create, Flutter failed to write to a file_  
  **Solução**: Habilite as permissões para os arquivos descritos na mensagem de erro ou siga a solução descrita no link abaixo:

[Stack Overflow - Sandbox Error Solution](https://stackoverflow.com/questions/76590131/error-while-build-ios-app-in-xcode-sandbox-rsync-samba-13105-deny1-file-w)

### Outros Erros Relacionados ao Xcode

- **Erro**: _No such file or directory error_  
  **Solução**: Certifique-se de que os arquivos mencionados na mensagem de erro estão presentes e habilite as permissões, ou siga as instruções detalhadas no link abaixo:

[Stack Overflow - No Such File or Directory Error](https://stackoverflow.com/questions/10167442/whats-the-xcode-no-such-file-or-directory-error)

### Problemas com `Pod Install` ou `Pod Update`

Se você encontrar erros relacionados ao **Pod Install** ou **Pod Update**, siga as etapas descritas no link abaixo para atualizar os arquivos do projeto `ios`:

[Stack Overflow - Swift Unable to Open File](https://stackoverflow.com/questions/53117077/swift-unable-to-open-file-in-target-xcode-10)

Essas soluções cobrem os principais problemas encontrados durante o desenvolvimento no iOS. Certifique-se de seguir os links de referência para detalhes adicionais.

Aqui está um exemplo de como você pode criar uma seção explicativa em sua documentação ou código para destacar a importância de preencher corretamente as variáveis de ambiente no arquivo `.env`:

### **Configuração de Variáveis de Ambiente**

Certifique-se de preencher o arquivo `.env` corretamente antes de iniciar o projeto. As variáveis abaixo são fundamentais para o funcionamento da aplicação. Aqui está o detalhamento de cada uma delas:

#### **1. AUDIE_API_URL**  
- **Descrição**: URL base da API do sistema AUDIE.  
- **Importância**: Todas as requisições relacionadas ao sistema AUDIE utilizam essa URL como ponto de partida. Alterar esse valor pode desconectar a aplicação do servidor correto.  
- **Exemplo**:
  ```env
  AUDIE_API_URL=https://audieappapi.playlistsolutions.com/
  ```

#### **2. AUDIE_API_KEY**  
- **Descrição**: Chave de autenticação para acessar a API do AUDIE.  
- **Importância**: Sem essa chave, as requisições à API do AUDIE serão recusadas.  
- **Exemplo**:
  ```env
  AUDIE_API_KEY=sua-chave-aqui
  ```

#### **3. VAGALUME_API_KEY**  
- **Descrição**: Chave de API para acessar o serviço de letras de música e metadados do Vagalume.  
- **Importância**: Necessária para buscar letras, informações e outros dados musicais.  
- **Exemplo**:
  ```env
  VAGALUME_API_KEY=sua-chave-aqui
  ```
#### **3.1 Gerando a VAGALUME_API_KEY**
- **Passo a Passo**:
  1. Acesse o site oficial do [Vagalume API](https://api.vagalume.com.br/).
  2. Acesse a documentação e acessa a aba de **credenciais de autorização** no informativo abaixo clique em **Cadastrar-se** ou faça login caso já tenha uma conta.
  3. Após o login, acesse **Meus Dados** no painel do usuário.
  4. Selecione a opção **API**.
  5. Crie uma nova aplicação fornecendo as informações necessárias (nome, descrição, etc.).
  6. Após salvar, sua chave de API estará disponível no painel. Copie a chave gerada.
  7. Adicione a chave ao arquivo `.env`:
     ```env
     VAGALUME_API_KEY=sua-chave-aqui
     ```

#### **4. DISCOGS_KEY e DISCOGS_SECRET**  
- **Descrição**: Chave e segredo para autenticação no Discogs, uma base de dados de músicas e artistas.  
- **Importância**: Permite que a aplicação obtenha informações detalhadas sobre álbuns, artistas e faixas.  
- **Exemplo**:
  
  ```env
  DISCOGS_KEY=sua-chave-aqui
  DISCOGS_SECRET=seu-segredo-aqui
  ```
#### **4.1 Gerando DISCOGS_KEY e DISCOGS_SECRET**
- **Passo a Passo**:
  1. Acesse o site oficial do [Discogs Developers](https://www.discogs.com/developers).
  2. Faça login com sua conta Discogs ou crie uma nova conta, se necessário - **Create an App**.
  3. Após o login, clique em **Perfil** > **Configurações** na seção de **Desenvolvedor**.
  4. Selecione criar uma aplicação preencha o formulário com as informações solicitadas (nome da aplicação, URL, descrição, etc.).
  5. Ao criar a aplicação, você verá as chaves geradas: **Consumer Key** e **Consumer Secret**.
  6. Copie essas informações e adicione-as ao arquivo `.env`:
     ```env
     DISCOGS_KEY=sua-chave-aqui
     DISCOGS_SECRET=seu-segredo-aqui
     ```

### **Passos para Configuração**
- Solicite as chaves de acesso apropriadas com o administrador ou nos respectivos serviços das APIs.
- Preencha o arquivo `.env` com os valores corretos.
- Reinicie o servidor de desenvolvimento para que as alterações sejam aplicadas:
   
   ```bash
   npm start --reset-cache
   ```

### **Importante!**
- **Segurança**: Nunca compartilhe o arquivo `.env` ou exponha suas chaves em repositórios públicos.
- **Ambientes Diferentes**: Certifique-se de utilizar chaves e URLs específicas para cada ambiente (`dev`, `staging`, `prod`) para evitar configurações erradas.

Seguindo essas instruções, sua aplicação estará pronta para consumir os serviços necessários! 🚀
