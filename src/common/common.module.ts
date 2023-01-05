import { Module } from '@nestjs/common';
import { AxiosAdapter } from './httpAdapters/axios.adapter';
import { FetchAdapter } from './httpAdapters/fetch.adapter';

@Module({
    providers: [AxiosAdapter, FetchAdapter],
    exports: [AxiosAdapter, FetchAdapter]
})
export class CommonModule { }
