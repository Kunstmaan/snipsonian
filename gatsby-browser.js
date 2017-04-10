import wrapRootComponentWithReduxAndIntlProvider from './utils/wrapRootComponentWithReduxAndIntlProvider';

exports.wrapRootComponent = (Root) => wrapRootComponentWithReduxAndIntlProvider(Root);

// exports.onRouteUpdate = (...any) => {
//     console.log(`onRouteUpdate params: ${JSON.stringify(any)}`)
//
//     // TODO notify google analytics ?
// };
