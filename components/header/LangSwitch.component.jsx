import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getLang} from '../user/userSelectors';
import {switchLang} from '../user/userActions';
import {LANGUAGES} from '../../config/i18n.config';
import styleConfig from '../../config/style.config';

const LangSwitch = ({currentLang, onSwitchLang}) => (
    <div>
        {LANGUAGES.map((lang) =>
            <button onClick={() => onSwitchLang(lang)}
                  key={`langSwitchLanguage-${lang}`}
                  style={{
                      color: getLangColor(lang, currentLang)
                  }}>
                {lang}
            </button>
        )}
    </div>
);

LangSwitch.propTypes = {
    currentLang: PropTypes.string,
    onSwitchLang: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LangSwitch);

function mapStateToProps(state) {
    return {
        currentLang: getLang(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSwitchLang: (selectedLang) => {
            dispatch(switchLang(selectedLang));
        }
    };
}

function getLangColor(lang, currentLang) {
    return (lang === currentLang) ? styleConfig.color.primary : 'inherit';
}