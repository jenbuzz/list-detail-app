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
    labels?: string[];
}

export interface Link {
    url?: string;
    icon?: string;
}

export interface Config {
    metaTags: ConfigMetaTags;
    api: ConfigApi;
    elementFieldMapping: ConfigElementFieldMapping;
    filters: ConfigFilters;
    styling: ConfigStyling;
    settings: ConfigSettings;
    translation: ConfigTranslation;
}

export interface ConfigMetaTags {
    disableMetaTags?: boolean;
    url?: string;
    title?: string;
    titleSuffix?: string;
    image?: string;
}

export interface ConfigApi {
    authToken?: any;
    list?: any;
    detail?: any;
    dataPath?: any;
    image?: any;
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

export interface ConfigFilters {
    mainFilter?: string[];
}

export interface ConfigStyling {
    themeMainColor?: string;
}

export interface ConfigSettings {
    showSourceTextOnBtn?: boolean;
    showSquareImage?: boolean;
    useHtmlImage?: boolean;
}

export interface ConfigTranslation {
    fallbackLanguage?: string;
    useLocalStorage?: boolean;
    useHtmlLang?: boolean;
    translations?: any;
}
