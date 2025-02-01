# Final Fantasy - gRPC  

Este é um jogo de turnos inspirado em RPGs clássicos, principalmente um em específico que joguei e gosto bastante: **Final Fantasy**.  
Nesta implementação, dois jogadores podem atacar, defender e curar em batalhas estratégicas.  
O projeto utiliza **gRPC** para comunicação entre o servidor (Python) e o cliente (C#).  

## 📌 Tecnologias Utilizadas  
- **Backend**: Python com gRPC  
- **Frontend (Cliente CLI)**: C# com gRPC  
- **Protocolo de Comunicação**: Protocol Buffers (protobuf)  

## ⚔️ Como Jogar  
1. Inicie o servidor gRPC.  
2. Execute o cliente C# e insira o seu ID de jogador.  
3. Escolha uma ação a cada turno:  
   - `attack`: Ataca o oponente com uma força aleatória entre **10 e 30**.  
   - `defend`: Ativa a defesa, reduzindo o dano do próximo ataque recebido.  
   - `heal`: Cura uma quantidade aleatória de HP entre **15 e 25**.  
4. O jogo continua até que um dos jogadores fique com **0 HP**.  

---

## 🚀 Como Executar  

### Servidor (Python)  

#### 1. Configurar Ambiente Virtual (venv)  

#### Windows: 

1. Abra o terminal.  
2. Navegue até a pasta do projeto.
   
```sh
cd FinalFantasy
```

4. Crie um ambiente virtual:
    
```sh
python -m venv venv
```
   
5. Ative o ambiente virtual:

```sh
venv\Scripts\activate
```
#### Linux:
1. Abra o terminal.

2. Navegue até a pasta do projeto.
   
```sh
cd FinalFantasy
```

3. Crie um ambiente virtual:

```sh
python3 -m venv venv
```

4. Ative o ambiente virtual:

```sh
source venv/bin/activate
```
#### 2. Instalar Dependências
No terminal (com o ambiente virtual ativado), execute:

```sh
pip install grpcio grpcio-tools
```

#### 3. Iniciar o Servidor
Execute o servidor:

```sh
python server.py
```
### Cliente (C#)
#### 1. Instalar o .NET SDK(9.0)
Verifique se o .NET SDK está instalado:

```sh
dotnet --version
```
Se não estiver instalado, ou a versão for menor que a 9.0 baixe e instale a versão mais nova em [Link para download](dotnet.microsoft.com/download).

#### 2. Instalar Dependências do gRPC
No terminal, navegue até a pasta do projeto C# e instale as dependências:

```sh
dotnet add package Grpc.Net.Client
dotnet add package Google.Protobuf
dotnet add package Grpc.Tools
```
#### 3. Compilar e Executar o Cliente
Execute o cliente:

```sh
dotnet run
```
##📜 Estrutura do Projeto
```bash
📂 FinalFantasy
│   ├── server.py         # Código do servidor gRPC
│   ├── jogo.proto        # Definição dos serviços gRPC
│   ├── jogo_pb2.py       # Arquivo gerado pelo protobuf
│   ├── jogo_pb2_grpc.py  # Arquivo gerado pelo protobuf (gRPC)
│
│── 📂 projeto
│    │── 📂 Protos
│    │    ├── jogo.proto  # Definição dos serviços gRPC
│    │── 📂 bin/Debug/net9.0
│    │── 📂 obj
│   ├── Program.cs        # Código do cliente C#
│   ├── projeto.csproj 
│
│── README.md
│── .gitignore  
```          
## 🛠 Melhorias Futuras

### 💎 Adicionar um sistema de IA para jogar contra um bot.

### 💎 Criar uma interface gráfica para melhorar a experiência do usuário.

### 💎 Implementar a funcionalidade de turnos de forma correta.

### 💎 Adicionar mais mecânicas de combate.

## 📌 Licença
Este projeto foi desenvolvido para aprendizado e não possui uma licença oficial. Sinta-se livre para modificar e expandir como desejar!

## Divirta-se jogando! 🎮🔥
