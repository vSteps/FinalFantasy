from concurrent import futures
import grpc
from apps.services import AccountService
from protos import accounts_pb2_grpc

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    accounts_pb2_grpc.add_AccountServiceServicer_to_server(AccountService(), server)
    server.add_insecure_port('[::]:50051')
    print("Servidor gRPC rodando na porta 50051.")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
