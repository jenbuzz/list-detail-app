export interface Element {
    id: number;
    title?: string;
    description?: string;
    internal_link?: string;
    external_link?: string | Link[];
    external_link_icon?: string;
    image?: string;
    source?: string;
    icons?: string[];
}

export interface Link {
    url?: string;
    icon?: string;
}

export interface Config {
    metaTags: ConfigMetaTags;
    api: any;
    elementFieldMapping: ConfigElementFieldMapping;
    styling: ConfigStyling;
    text: ConfigText;
}

export interface ConfigMetaTags {
    url?: string;
    title?: string;
    titleSuffix?: string;
    image?: string;
}

export interface ConfigStyling {
    themeMainColor?: string;
}

export interface ConfigText {
    title?: string;
    search?: string;
    goback?: string;
    readmore?: string;
    externallink?: string;
}

export interface ConfigElementFieldMapping {
    id?: string[];
    title?: string[];
    description?: string[];
    internal_link?: string[];
    external_link?: string[];
    external_link_icon?: string[];
    image?: string[];
    source?: string[];
}
