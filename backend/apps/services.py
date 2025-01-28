from protos import accounts_pb2  # type: ignore
from protos import accounts_pb2_grpc# type: ignore

class AccountService(accounts_pb2_grpc.AccountServiceServicer):
    def CreateAccount(self, request, context):

        return accounts_pb2.AccountResponse(
            status="SUCCESS", message="Conta criada com sucesso."
        )

    def Login(self, request, context):

        return accounts_pb2.LoginResponse(
            status="SUCCESS", token="fake-jwt-token"
        )

    def GetProfile(self, request, context):

        return accounts_pb2.ProfileResponse(
            username="usuario_teste",
            email="teste@email.com",
            status="ACTIVE"
        )
