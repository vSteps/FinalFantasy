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

        // Realizar um turno
        Console.Write("Escolha uma ação (attack, defend, heal): ");
        string action = Console.ReadLine();

        Console.Write("Informe o poder da ação (0-30): ");
        int power = int.Parse(Console.ReadLine());

        var turnResponse = client.TakeTurn(new TurnRequest
        {
            PlayerId = playerId,
            Action = action,
            AttackPower = action == "attack" ? power : 0,
            DefensePower = action == "defend" ? power : 0,
            HealPower = action == "heal" ? power : 0
        });

        Console.WriteLine(turnResponse.Message);

        // Verificar o estado do jogo
        var gameStateResponse = client.GetGameState(new GameStateRequest { GameId = "game1" });
        Console.WriteLine($"Jogador 1: {gameStateResponse.Player1} | HP: {gameStateResponse.Player1State.Hp}");
        Console.WriteLine($"Jogador 2: {gameStateResponse.Player2} | HP: {gameStateResponse.Player2State.Hp}");
    }
}
