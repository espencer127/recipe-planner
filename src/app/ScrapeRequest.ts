export class ScrapeRequest {
    url: string;
    wildWestMode: boolean;

    constructor(url: any, wildMode?: any) {
        this.url = url;
        this.wildWestMode = wildMode;
    }
}