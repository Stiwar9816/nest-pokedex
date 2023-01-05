import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchAdapter implements HttpAdapter {
    async get<T>(url: string): Promise<T> {
        try {
            const res = await fetch(url);
            const data: T = await res.json();
            console.log("con fetch");
            return data;

        } catch (error) {
            throw new Error('This is an error - Check logs')
        }
    }
}