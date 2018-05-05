export interface Element {
    id: number;
    title?: string;
    internal_link?: string;
    external_link?: string;
    image: string;
    source: string;
}

export interface Config {
    metaTags: any;
    api: any;
    elementFieldMapping: any;
    styling: any;
    text: any;
}
