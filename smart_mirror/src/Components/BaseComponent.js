import React from 'react';
import PropTypes from 'prop-types';

export default class BaseComponent extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
    };

    static defaultProps = {
        visible: true,
    };

    onEvent(event) {}
}
