import { Injectable } from '@angular/core';
import { GrpcClient } from '@ngx-grpc/core';

@Injectable({
    providedIn: 'root',
})
export class GrpcClientService {
    constructor(private grpc: GrpcClient) {}

    login(username: string, password: string) {
        return this.grpc.makeUnaryRequest('AccountService/Login', { username, password });
    }
}
