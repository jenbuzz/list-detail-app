export interface Element {
    id: number;
    title?: string;
    description?: string;
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
