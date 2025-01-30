# Final Fantasy - gRPC  

Este é um jogo de turnos inspirado em RPGs clássicos, principalmente um em específico que joguei e gosto bastante: Final Fantasy. Nesta implementação, dois jogadores podem atacar, defender e curar em batalhas estratégicas. O projeto utiliza **gRPC** para comunicação entre o servidor (Python) e o cliente (C#).  

## 📌 Tecnologias Utilizadas  
- **Backend**: Python com gRPC  
- **Frontend (Cliente CLI)**: C# com gRPC  
- **Protocolo de Comunicação**: Protocol Buffers (protobuf)  

## ⚔️ Como Jogar  
1. Inicie o servidor gRPC.  
2. Execute o cliente C# e insira o seu ID de jogador.  
3. Escolha uma ação a cada turno:  
   - `attack`: Ataca o oponente com uma força aleatória entre 10 e 30.  
   - `defend`: Ativa a defesa, reduzindo o dano do próximo ataque recebido.  
   - `heal`: Cura uma quantidade aleatória de HP entre 15 e 25.  
4. O jogo continua até que um dos jogadores fique com **0 HP**.  

## 🚀 Como Executar  

### Servidor (Python)  
1. Instale as dependências:  
   ```sh
   pip install grpcio grpcio-tools
