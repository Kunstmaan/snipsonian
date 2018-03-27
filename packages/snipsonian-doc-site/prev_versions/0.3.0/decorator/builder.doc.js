import builder from './builder';
import {decorate, snippet, name, desc, param, returns, examples, authors, JS_DOC_TYPE} from '../_docRef';

class builderDoc {}
decorate(builderDoc).with(
    snippet(builder),
    name('builder'),
    desc('Decorator to make a target (or an array of targets) into a builder. A "builder" offers a fluent api ' +
        'using "with" functions to eventually "build" a result object.'),
    param({
        type: JS_DOC_TYPE.OBJECT,
        desc: 'Optional. Object containing the initial properties of the result/object to be build. ' +
        'By default an empty object (= no initial params) is used.',
        name: 'initialBuildParams',
        isOptional: true
    }),
    param({
        type: JS_DOC_TYPE.STRING,
        desc: 'Optional. To override the \'internal\' name that the builder will use to store the properties ' +
        'until the \'build\' function is called. Uses "_builder" by default.',
        name: 'buildStateName',
        isOptional: true
    }),
    returns({
        type: JS_DOC_TYPE.FUNCTION,
        desc: 'Function that will do the decoration of the target input. This input can be a single target, ' +
        'or an array of targets (in which case all targets will get the extra property).'
    }),
    examples(
        `
            class AddressBuilder {}
            const initialBuildParams = {
                country: 'Belgium'
            };

            builder({initialBuildParams})(AddressBuilder);

            const kunstmaanAddress = AddressBuilder
                .with('postalCode', 3001)
                .with('city', 'Leuven')
                .with('street', 'Philipssite')
                .with('houseNbr', '5')
                .with('box', '10')
                .build();

            console.log(kunstmaanAddress);
            // => {country: 'Belgium', postcalCode: 3001, city: 'Leuven', ...}
        `
    ),
    authors('Ben')
);

export default builderDoc;