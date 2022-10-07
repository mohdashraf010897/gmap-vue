import type {
  IGoogleMapProp,
  ILoadPluginOptions,
  IPluginOptions,
  IVueProp,
} from '@/interfaces/gmap-vue.interface';

export type PluginComponentNames =
  | 'GmapMap'
  | 'GmapMarker'
  | 'GmapCluster'
  | 'GmapInfoWindow';
/**
 * @typedef {Object} SinglePluginComponentConfig
 * @property {string[]} noBind - Props with should not be bind to Google Maps. Has precedence over twoWay
 * @property {string[]} twoWay - Props that should be bind in two-way data binding
 * @property {Object} trackProperties - Object with nested properties of a prop that should be watched
 * @property {string} trackProperties.key - Should be a string
 * @property {string[]} trackProperties.value - Should be an array of nested properties of the prop that should be watched
 * @property {Object} events - Events should be bind on the component
 * @property {string[]} events.auto - Events of the Google Maps component instance that should be bind
 * @property {string[]} events.manual - Manual events that should emit or bind
 */
export type SinglePluginComponentConfig = {
  noBind: string[];
  twoWay: string[];
  trackProperties: { [key: string]: string[] };
  events: {
    auto: string[];
    manual: string[];
  };
};
export type PluginComponentConfig = {
  [key in PluginComponentNames]: SinglePluginComponentConfig;
};
export type GlobalGoogleObject = { [key: string]: any };
export type GoogleMapsAPIInitializerFn = (
  options: ILoadPluginOptions,
  loadCn?: boolean
) => void;
export type LazyValueGetterFn = () => Promise<any>;
export type PromiseLazyCreatorFn = (
  options: IPluginOptions
) => LazyValueGetterFn;
export type AutocompleteHtmlInput = HTMLInputElement & {
  attachEvent: Function;
};
export type GmapVuePluginProps = { [key: string]: IVueProp & IGoogleMapProp };