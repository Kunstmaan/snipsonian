import dummy from './dummy';
import {snippet, name, desc, authors, signature, since} from '../_docRef';

@name('dummy')
@desc('Vestibulum id ligula porta felis euismod semper.')
@authors('thomasse')
@since('0.7.14')
@signature('const dummy = ({foo = true, bar = \'baz\', boo}) => {')
@snippet(dummy)
class dummyDoc {
}

export default dummyDoc;
