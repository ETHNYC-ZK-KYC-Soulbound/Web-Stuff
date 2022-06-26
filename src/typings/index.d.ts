// // Type definitions for redux-logger 3.0
// // Project: https://github.com/theaqua/redux-logger
// // Definitions by: Alexander Rusakov <https://github.com/arusakov>
// //                 Kevin Groat <https://github.com/kgroat>
// // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
// export as namespace ReduxLogger;
//
// import * as Redux from 'redux';
//
// export const logger: Redux.Middleware;
//
// export type LoggerPredicate = (
//   getState: () => any,
//   action: any,
//   logEntry?: LogEntryObject
// ) => boolean;
//
// export type StateToString = (state: any) => string;
// export type ActionToString = (action: any) => string;
// export type ErrorToString = (error: any, prevState: any) => string;
//
// export interface ColorsObject {
//   title?: ActionToString | boolean | undefined;
//   prevState?: StateToString | boolean | undefined;
//   action?: ActionToString | boolean | undefined;
//   nextState?: StateToString | boolean | undefined;
//   error?: ErrorToString | boolean | undefined;
// }
//
// export interface LevelObject {
//   prevState?: StateToString | boolean | string | undefined;
//   action?: ActionToString | boolean | string | undefined;
//   nextState?: StateToString | boolean | string | undefined;
//   error?: ErrorToString | boolean | string | undefined;
// }
//
// export interface LogEntryObject {
//   action?: ActionToString | boolean | string | undefined;
//   started?: number | undefined;
//   startedTime?: Date | undefined;
//   took?: number | undefined;
//   error?(error: any): any;
//   nextState?(state: any): any;
//   prevState?(state: any): any;
// }
//
// export interface ReduxLoggerOptions {
//   level?: ActionToString | LevelObject | string | undefined;
//   duration?: boolean | undefined;
//   timestamp?: boolean | undefined;
//   colors?: ColorsObject | false | undefined;
//   titleFormatter?(formattedAction: any, formattedTime: string, took: number): string;
//   logger?: any;
//   logErrors?: boolean | undefined;
//   collapsed?: LoggerPredicate | boolean | undefined;
//   predicate?: LoggerPredicate | undefined;
//   diff?: boolean | undefined;
//   diffPredicate?: LoggerPredicate | undefined;
//   stateTransformer?(state: any): any;
//   actionTransformer?(action: any): any;
//   errorTransformer?(error: any): any;
// }
//
// export function createLogger(options?: ReduxLoggerOptions): Redux.Middleware;
//
// export default logger;
