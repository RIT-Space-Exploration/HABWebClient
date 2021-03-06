import React, { PropTypes } from 'react';
import HighChartsComponent from '../components/HighChartsComponent';
import { ChartTypes } from '../utils/Charts';

const Chart = React.createClass({
  propTypes: {
    title: PropTypes.string,
    source: PropTypes.string.isRequired,
    type: PropTypes.oneOf(ChartTypes).isRequired,
    container: PropTypes.string.isRequired,
  },

  render() {
    const { title, source, type, container } = this.props;
    return (
      <div className="statistics-chart">
        <HighChartsComponent
        title={title}
        source={source}
        type={type}
        container={container}
        />
      </div>
    );
  },

});

export default Chart;
