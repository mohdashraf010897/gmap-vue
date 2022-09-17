import type { IGoogleMapProp, IPluginOptions, IVueProp } from '@/interfaces/gmap-vue.interface';
import type { AutocompleteHtmlInput, GmapVuePluginProps, LazyValueGetterFn } from '@/types/gmap-vue.types';
import { type ComponentPublicInstance, nextTick, watch } from 'vue';

/**
 * This function helps you to bind events from Google Maps API to Vue events
 *
 * Note: For options API. This function should not be used on setup script.
 *
 * @param  {Object} vueInst the Vue instance
 * @param  {Object} googleMapsInst the Google Maps instance
 * @param  {string[]} events an array of string with all events that you want to bind
 * @returns {void}
 */
export function bindEvents(
  vueInst: ComponentPublicInstance & { $gmapOptions: IPluginOptions },
  googleMapsInst: Record<string, any>,
  events: string[]
): void {
  events.forEach((eventName) => {
    if (vueInst.$gmapOptions.autoBindAllEvents || vueInst.$attrs[eventName]) {
      googleMapsInst.addListener(eventName, (ev: any) => {
        vueInst.$emit(eventName, ev);
      });
    }
  });
}

/**
 * Function that helps you to capitalize the first letter on a word
 *
 * @param  {string} text the text that you want to capitalize
 * @returns {string}
 */
export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Function that helps you to get all non nullable props from a component
 *
 * @param  {Object} vueInst the Vue component instance
 * @param  {Object} props the props object
 * @returns {Object}
 */
export function getPropsValues(
  props: Record<string, any>,
  vueInst?: ComponentPublicInstance
): { [key: string]: IVueProp } {
  if (vueInst) {
    return Object.keys(props).reduce((acc, propKey) => {
      if ((vueInst?.$props as any)[propKey] != null) {
        acc[propKey] = (vueInst?.$props as any)[propKey];
      }

      return acc;
    }, {} as { [key: string]: IVueProp });
  }

  return Object.keys(props).reduce((acc, propKey) => {
    if ((props as any)[propKey] != null) {
      acc[propKey] = (props as any)[propKey];
    }

    return acc;
  }, {} as { [key: string]: IVueProp });
}

/**
 * This function is a helper for return to the user the internal Google Maps promise
 * and can wait until it is ready.
 * This piece of code was orignally written by sindresorhus and can be seen here
 * @see https://github.com/sindresorhus/lazy-value/blob/master/index.js
 *
 *  @param  {Function} fn a function that actually return the promise or async value
 * @returns {Function} anonymous function that returns the value returned by the fn parameter
 */
export function getLazyValue(fn: () => Promise<any>): LazyValueGetterFn {
  let called = false;
  let ret: Promise<any>;

  return (): Promise<any> => {
    if (!called) {
      called = true;
      ret = fn();
    }

    return ret;
  };
}

/**
 * Strips out the extraneous properties we have in our
 * mapped props definitions
 *
 * @param {Object} mappedProps the mapped props object
 * @returns {Object}
 */
export function filterVuePropsOptions<T extends GmapVuePluginProps>(
  mappedProps: T
): {
  [key in keyof T]: IVueProp;
} {
  return (
    Object.entries(mappedProps).map(([key, prop]) => {
      const value: IVueProp = {};

      if ('type' in prop) value.type = prop.type;
      if ('default' in prop) value.default = prop.default;
      if ('required' in prop) value.required = prop.required;

      return [key, value];
    }) as Array<[keyof T, IVueProp]>
  ).reduce((acc, [key, val]) => {
    acc[key] = val;

    return acc;
  }, {} as { [key in keyof T]: IVueProp });
}

/**
 * This function simulates a down arrow key event when user
 * hits return (enter) on the autocomplete component selection
 * the first occurrence in the list.
 *
 * This piece of code was orignally written by amirnissim
 * and has been ported to Vanilla.js by GuillaumeLeclerc
 * @see http://stackoverflow.com/a/11703018/2694653
 *
 * @param  {Object} input the HTML input node element reference
 * @returns {void}
 */
export function downArrowSimulator(input: AutocompleteHtmlInput): void {
  // eslint-disable-next-line no-underscore-dangle -- Is old style should be analyzed
  const _addEventListener = input.addEventListener
    ? input.addEventListener
    : input.attachEvent;

  /**
   * Add event listener wrapper that will replace to default addEventListener or attachEvent function
   *
   * @param  {string} type the event type
   * @param  {Function} listener function should be executed when the event is fired
   * @returns {void}
   */
  function addEventListenerWrapper(type: string, listener: Function): void {
    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
    // and then trigger the original listener.
    if (type === 'keydown') {
      const origListener = listener;
      // eslint-disable-next-line no-param-reassign -- Is old style this should be analyzed
      listener = (event: KeyboardEvent) => {
        const suggestionSelected =
          document.getElementsByClassName('pac-item-selected').length > 0;
        if (event.which === 13 && !suggestionSelected) {
          const simulatedEvent = document.createEvent('Event') as Event & {
            keyCode: any;
            which: any;
          };
          simulatedEvent.keyCode = 40;
          simulatedEvent.which = 40;
          origListener.apply(input, [simulatedEvent]);
        }

        origListener.apply(input, [event]);
      };
    }

    _addEventListener.apply(input, [type, listener]);
  }

  input.addEventListener = addEventListenerWrapper as any;
  input.attachEvent = addEventListenerWrapper;
}

/**
 * When you have two-way bindings, but the actual bound value will not equal
 * the value you initially passed in, then to avoid an infinite loop you
 * need to increment a counter every time you pass in a value, decrement the
 * same counter every time the bound value changed, but only bubble up
 * the event when the counter is zero.
 *
 * @param  {Function} fn Function to be executed to determine if the event was executed
 *
 Example:

 Let's say DrawingRecognitionCanvas is a deep-learning backed canvas
 that, when given the name of an object (e.g. 'dog'), draws a dog.
 But whenever the drawing on it changes, it also sends back its interpretation
 of the image by way of the @newObjectRecognized event.

 <input
 type="text"
 placeholder="an object, e.g. Dog, Cat, Frog"
 v-model="identifiedObject" />
 <DrawingRecognitionCanvas
 :object="identifiedObject"
 @newObjectRecognized="identifiedObject = $event"
 />

 new TwoWayBindingWrapper((increment, decrement, shouldUpdate) => {
      this.$watch('identifiedObject', () => {
        // new object passed in
        increment()
      })
      this.$deepLearningBackend.on('drawingChanged', () => {
        recognizeObject(this.$deepLearningBackend)
          .then((object) => {
            decrement()
            if (shouldUpdate()) {
              this.$emit('newObjectRecognized', object.name)
            }
          })
      })
    })
 */
export function twoWayBindingWrapper(fn: Function): void {
  let counter = 0;

  fn(
    () => {
      counter += 1;
    },
    () => {
      counter = Math.max(0, counter - 1);
    },
    () => counter === 0
  );
}

/**
 * Watch the individual properties of a PoD object, instead of the object
 * per se. This is different from a deep watch where both the reference
 * and the individual values are watched.
 *
 * In effect, it throttles the multiple $watch to execute at most once per tick.
 *
 * @param  {string[]} propertiesToTrack string array with all properties that you want to track
 * @param  {Function} handler function to be fired when the prop change
 * @param  {boolean} immediate=false
 * @param  {Object?} vueInst the component instance
 * @returns {void}
 */
export function watchPrimitiveProperties(
  propertiesToTrack: string[],
  handler: Function,
  immediate = false,
  vueInst?: ComponentPublicInstance
): void {
  let isHandled = false;

  /**
   * Function in charge to execute the handler function if it was not fired
   *
   * @returns void
   */
  function requestHandle(): void {
    if (!isHandled) {
      isHandled = true;
      if (vueInst) {
        vueInst.$nextTick(() => {
          isHandled = false;
          handler();
        });
      } else {
        nextTick(() => {
          isHandled = false;
          handler();
        });
      }
    }
  }

  propertiesToTrack.forEach((prop) => {
    if (vueInst) {
      vueInst.$watch(prop, requestHandle, { immediate });
    } else {
      watch(() => prop, requestHandle, { immediate });
    }
  });
}

/**
 * Binds the properties defined in props to the google maps instance.
 * If the prop is an Object type, and we wish to track the properties
 * of the object (e.g. the lat and lng of a LatLng), then we do a deep
 * watch. For deep watch, we also prevent the _changed event from being
 * emitted if the data source was external.
 *
 * Note: For options API. This function should not be used on setup script.
 *
 * @param  {Object} vueInst the component instance
 * @param  {Object} googleMapsInst the Google Maps instance
 * @param  {Object} props object with the component props tha should be synched with the Google Maps instances props
 * @returns {void}
 */
export function bindProps(
  vueInst: ComponentPublicInstance & { $gmapOptions: IPluginOptions },
  googleMapsInst: Record<string, any>,
  props: GmapVuePluginProps
): void {
  Object.keys(props).forEach((propKey) => {
    const { twoWay, type, trackProperties, noBind } = props[propKey];

    if (!noBind) {
      const setMethodName = `set${capitalizeFirstLetter(propKey)}`;
      const getMethodName = `get${capitalizeFirstLetter(propKey)}`;
      const eventName = `${propKey.toLowerCase()}_changed`;
      const initialValue = (vueInst.$props as any)[propKey];

      if (typeof googleMapsInst[setMethodName] === 'undefined') {
        throw new Error(
          // TODO: Analyze all disabled rules in the file
          // eslint-disable-next-line no-underscore-dangle -- old code should be analyzed
          `${setMethodName} is not a method of (the Maps object corresponding to) ${vueInst.$options._componentTag}`
        );
      }

      // We need to avoid an endless
      // propChanged -> event emitted -> propChanged -> event emitted loop
      // although this may really be the user's responsibility
      if (type !== Object || !trackProperties) {
        // Track the object deeply
        vueInst.$watch(
          propKey,
          () => {
            const attributeValue = (vueInst.$props as any)[propKey];

            googleMapsInst[setMethodName](attributeValue);
          },
          {
            immediate: typeof initialValue !== 'undefined',
            deep: type === Object,
          }
        );
      } else {
        watchPrimitiveProperties(
          trackProperties.map((prop) => `${propKey}.${prop}`),
          () => {
            googleMapsInst[setMethodName]((vueInst.$props as any)[propKey]);
          },
          (vueInst.$props as any)[propKey] !== undefined,
          vueInst
        );
      }

      if (
        twoWay &&
        (vueInst.$gmapOptions.autoBindAllEvents || vueInst.$attrs[eventName])
      ) {
        googleMapsInst.addListener(eventName, () => {
          vueInst.$emit(eventName, googleMapsInst[getMethodName]());
        });
      }
    }
  });
}

/**
 * The object which contain all event names to and params that should be used to add listener to the Google Maps instance
 * @typedef {Object} PropEvents
 * @property {string[]} eventNames - The event names
 * @property {[string, () => void][]} emitParams - The array of params to use on every emit call
 */
/**
 * Binds the properties defined in props to the google maps instance.
 * If the prop is an Object type, and we wish to track the properties
 * of the object (e.g. the lat and lng of a LatLng), then we do a deep
 * watch. For deep watch, we also prevent the _changed event from being
 * emitted if the data source was external.
 *
 * Note: For composition API. This function should be used on setup script.
 *
 * @param  {Object} googleMapsInst - the Google Maps instance
 * @param  {Object} props - object with the component props tha should be synched with the Google Maps instances props
 * @param  {IPluginOptions} gmapOptions - the component instance
 * @param  {Object} attrs - The vue attrs object that is get from useAttrs macro function
 * @returns {PropEvents} The object which contain all event names to and params that should be used to add listener to the Google Maps instance
 */
export function bindPropsOnSetup(
  googleMapsInst: Record<string, any>,
  props: Record<string, any>,
  gmapOptions: IPluginOptions,
  attrs: Record<string, unknown>
): {
  eventNames: string[];
  emitParams: [string, () => any][];
} {
  const eventNames: string[] = [];
  const emitParams: [string, () => any][] = [];

  Object.keys(props).forEach((propKey) => {
    const {
      twoWay,
      type: propertyType,
      trackProperties,
      noBind,
    } = props[propKey] as IVueProp & IGoogleMapProp;

    if (!noBind) {
      const setMethodName = `set${capitalizeFirstLetter(propKey)}`;
      const getMethodName = `get${capitalizeFirstLetter(propKey)}`;
      const eventName = `${propKey.toLowerCase()}_changed`;
      const initialValue = (props as any)[propKey];

      if (typeof googleMapsInst[setMethodName] !== 'undefined') {
        // We need to avoid an endless
        // propChanged -> event emitted -> propChanged -> event emitted loop
        // although this may really be the user's responsibility
        if (propertyType !== Object || !trackProperties) {
          // Track the object deeply
          watch(
            () => propKey,
            () => {
              const attributeValue = props[propKey];

              googleMapsInst[setMethodName](attributeValue);
            },
            {
              immediate: typeof initialValue !== 'undefined',
              deep: propertyType === Object,
            }
          );
        } else {
          watchPrimitiveProperties(
            trackProperties.map((prop) => `${propKey}.${prop}`),
            () => {
              googleMapsInst[setMethodName](props[propKey]);
            },
            props[propKey] !== undefined
          );
        }

        if (twoWay && (gmapOptions.autoBindAllEvents || attrs[eventName])) {
          eventNames.push(eventName);
          emitParams.push([eventName, googleMapsInst[getMethodName]]);
        }
      }
    }
  });

  return { eventNames, emitParams };
}
