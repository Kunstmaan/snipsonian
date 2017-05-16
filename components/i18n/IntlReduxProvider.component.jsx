import {connect} from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import nlLocale from 'react-intl/locale-data/nl';

import {getLang} from '../user/userSelectors';
import {MESSAGES} from '../../config/i18n.config';

addLocaleData(nlLocale);

export default connect(
    mapStateToProps
)(IntlProvider);

function mapStateToProps(state) {
    const locale = getLang(state);

    return {
        locale,
        messages: MESSAGES[locale]
    };
}
