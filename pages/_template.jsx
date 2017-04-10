import React from 'react'
import {Container} from 'react-responsive-grid'

import '../css/markdown-styles.css'
import '../css/common.scss'

import {rhythm} from '../utils/typography'
import Header from '../components/header/Header.component';
import styleConfig from '../config/style.config';

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    return (
      <div>
        <Header />
        <Container
          style={{
            maxWidth: styleConfig.container.maxWidth,
            padding: `${rhythm(1)} ${rhythm(3/4)}`,
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </Container>
      </div>
    )
  },
})
