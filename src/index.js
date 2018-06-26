import React from 'react';
import Bubbles from './bubbles';
import PropTypes from 'prop-types';

class ReactBubbleChart extends React.Component {
  render() {
    const { data, width, height, center, title, forceStrength } = this.props;
    return (
      <svg width={width} height={height}>
        <Bubbles data={data} forceStrength={forceStrength} center={center} />
      </svg>
    );
  }
}

ReactBubbleChart.defaultProps = {
  data: [
    {
      index: 0,
      name: 'A',
      color: '#f48fb1',
      radius: 56,
      value: 56,
      tooltip: 'tooltip 0'
    },
    {
      index: 1,
      name: 'B',
      color: '#ffab91',
      value: 34,
      radius: 34,
      tooltip: 'tooltip 1'
    },
    {
      index: 2,
      name: 'C',
      color: '#b87fe9',
      value: 32,
      radius: 32,
      tooltip: 'tooltip 2'
    },
    {
      index: 3,
      name: 'D',
      color: '#64b5f6',
      value: 32,
      radius: 32,
      tooltip: 'tooltip 3'
    }
  ],
  width: 400,
  height: 250,
  center: { x: 200, y: 125 },
  title: 'React Bubble Chart',
  forceStrength: 0.03
};
ReactBubbleChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  center: PropTypes.object,
  title: PropTypes.string.isRequired,
  forceStrength: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
};
export default ReactBubbleChart;
