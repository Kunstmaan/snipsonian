import React from 'react';
import {connect} from 'react-redux';

import {getLang} from '../user/userSelectors';
import {switchLang} from '../user/userActions';
import {LANGUAGES} from '../../config/i18n.config';
import styleConfig from '../../config/style.config';
import {rhythm} from '../../utils/typography';

const LangSwitch = ({
    currentLang,
    onSwitchLang
}) => (
    <div>
        {LANGUAGES.map((lang, index) =>
            <span onClick={() => onSwitchLang(lang)}
                  key={index}
                  style={{
                      color: getLangColor(lang, currentLang),
                      paddingRight: `${rhythm(1/3)}`
                  }}>
                {lang}
            </span>
        )}
    </div>
);

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