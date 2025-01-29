using System;
using Grpc.Net.Client;
using Turnbasedgame;

class Program
{
    static void Main(string[] args)
    {
        var channel = GrpcChannel.ForAddress("http://localhost:50051");
        var client = new TurnBasedGame.TurnBasedGameClient(channel);

        Console.WriteLine("Bem-vindo ao jogo de batalha!");
        Console.Write("Insira seu ID de jogador: ");
        string playerId = Console.ReadLine();

        // Entrar no jogo
        var joinResponse = client.JoinGame(new JoinGameRequest { PlayerId = playerId });
        Console.WriteLine(joinResponse.Message);

        bool gameOver = false;
        Random random = new Random(); // Instanciando o gerador de números aleatórios

        while (!gameOver)
        {
            // Escolher a ação
            Console.Write("Escolha uma ação (attack, defend, heal): ");
            string action = Console.ReadLine();

            int randomizedPower = 0;

            // Randomização do poder
            if (action == "attack")
            {
                randomizedPower = random.Next(10, 30); // Ataque randomizado entre 10 e 30
            }
            else if (action == "heal")
            {
                randomizedPower = random.Next(15, 25); // Cura randomizada entre 15 e 25
            }
            // Caso a ação seja "defend", não há randomização de poder
            else if (action != "defend")
            {
                Console.WriteLine("Ação inválida. Tente novamente.");
                continue; // Volta para a escolha de ação
            }

            // Realizar o turno com a ação e poder randomizados
            var turnResponse = client.TakeTurn(new TurnRequest
            {
                PlayerId = playerId,
                Action = action,
                AttackPower = action == "attack" ? randomizedPower : 0,
                DefensePower = action == "defend" ? randomizedPower : 0,
                HealPower = action == "heal" ? randomizedPower : 0
            });

            Console.WriteLine(turnResponse.Message);

            // Verificar o estado do jogo
            var gameStateResponse = client.GetGameState(new GameStateRequest { GameId = "game1" });
            Console.WriteLine($"Jogador 1: {gameStateResponse.Player1} | HP: {gameStateResponse.Player1State.Hp}");
            Console.WriteLine($"Jogador 2: {gameStateResponse.Player2} | HP: {gameStateResponse.Player2State.Hp}");

            // Verificar se algum jogador foi derrotado
            if (gameStateResponse.Player1State.Hp == 0 || gameStateResponse.Player2State.Hp == 0)
            {
                Console.WriteLine("O jogo acabou!");
                gameOver = true; // Finaliza o loop quando o jogo termina
            }
        }

        Console.WriteLine("Obrigado por jogar!");
    }
}
