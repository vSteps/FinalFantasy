import grpc
from concurrent import futures
import random
import jogo_pb2
import jogo_pb2_grpc


class TurnBasedGameService(jogo_pb2_grpc.TurnBasedGameServicer):
    def __init__(self):
        self.games = {}

    def JoinGame(self, request, context):
        if request.player_id not in self.games:
            self.games[request.player_id] = {
                "character": {
                    "name": "Default",
                    "hp": 100,
                    "defending": False
                }
            }
            return jogo_pb2.JoinGameResponse(
                status="Success", message=f"Jogador {request.player_id} entrou no jogo!"
            )
        return jogo_pb2.JoinGameResponse(
            status="Error", message="Jogador já está no jogo!"
        )

    def TakeTurn(self, request, context):
        player = self.games.get(request.player_id)
        if not player:
            return jogo_pb2.TurnResponse(status="Error", message="Jogador não encontrado!")

        opponent_id = [id for id in self.games if id != request.player_id]
        if not opponent_id:
            return jogo_pb2.TurnResponse(status="Error", message="Nenhum oponente encontrado!")

        opponent = self.games[opponent_id[0]]

        # Lógica do turno
        if request.action == "attack":
            damage = random.randint(10, 30) + request.attack_power
            if opponent["character"]["defending"]:
                damage //= 2
                opponent["character"]["defending"] = False
            opponent["character"]["hp"] -= damage
            if opponent["character"]["hp"] < 0:
                opponent["character"]["hp"] = 0
            return jogo_pb2.TurnResponse(
                status="Success", 
                message=f"Ataque causou {damage} de dano!",
                player_health=player["character"]["hp"],
                enemy_health=opponent["character"]["hp"]
            )
        
        elif request.action == "defend":
            player["character"]["defending"] = True
            return jogo_pb2.TurnResponse(
                status="Success", 
                message="Modo de defesa ativado! Dano reduzido no próximo ataque.",
                player_health=player["character"]["hp"],
                enemy_health=opponent["character"]["hp"]
            )
        
        elif request.action == "heal":
            heal = random.randint(15, 25) + request.heal_power
            player["character"]["hp"] += heal
            if player["character"]["hp"] > 100:
                player["character"]["hp"] = 100
            return jogo_pb2.TurnResponse(
                status="Success", 
                message=f"Curou {heal} pontos de vida!",
                player_health=player["character"]["hp"],
                enemy_health=opponent["character"]["hp"]
            )

        return jogo_pb2.TurnResponse(status="Error", message="Ação inválida!")

    def GetGameState(self, request, context):
        players = list(self.games.keys())

        if len(players) < 2:
            return jogo_pb2.GameStateResponse(
                player1="", player2="", current_turn=""
            )

        player1 = players[0]
        player2 = players[1]

        return jogo_pb2.GameStateResponse(
            player1=player1,
            player2=player2,
            player1_state=self._to_player_state(self.games[player1]["character"]),
            player2_state=self._to_player_state(self.games[player2]["character"]),
            current_turn="player1"
        )

    def _to_player_state(self, character):
        return jogo_pb2.PlayerState(
            hp=character["hp"], defending=character["defending"]
        )


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    jogo_pb2_grpc.add_TurnBasedGameServicer_to_server(TurnBasedGameService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Servidor gRPC rodando em localhost:50051...")
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
