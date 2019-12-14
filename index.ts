import * as fs from 'fs';

export interface IRequest {
    filePath: string;
}

export class Queue {
    private queueItems: IRequest[] = [];

    constructor(private filePath: string) {
        if (fs.existsSync(filePath)) {
            this.queueItems = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    }

    public getNext(): IRequest {
        if(this.queueItems.length > 0) {
            return this.queueItems[0];
        }
    }

    public remove(request: IRequest): void {
        this.queueItems = this.queueItems.filter(item => item !== request);
        fs.writeFileSync(this.filePath, JSON.stringify(this.queueItems), 'utf8');
    }

    public add(request: IRequest): void {
        this.queueItems = this.queueItems.concat(request);
        fs.writeFileSync(this.filePath, JSON.stringify(this.queueItems), 'utf8');
    }
}
