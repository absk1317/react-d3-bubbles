import React from 'react';
import Bubbles from './bubbles';
import PropTypes from 'prop-types';

class ReactBubbleChart extends React.Component {
  render() {
    const { data, width, height, center, title, forceStrength } = this.props;
    return (
      <div className="card bubblechart">
        <div className="card__header">
          <h5 className="card__title">{title}</h5>
        </div>
        <div className="card__content">
          <div className="card__body py-0">
            <div>
              <svg width={width} height={height}>
                <Bubbles
                  data={data}
                  forceStrength={forceStrength}
                  center={center}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactBubbleChart.defaultProps = {
  data: [
    {
      index: 0,
      name: 'Overall',
      color: '#f48fb1',
      radius: 56
    },
    {
      index: 1,
      name: 'VTK',
      color: '#ffab91',
      radius: 34
    },
    {
      index: 2,
      name: 'ISI',
      color: '#b87fe9',
      radius: 32
    },
    {
      index: 3,
      name: 'PPV',
      color: '#64b5f6',
      radius: 32
    }
  ],
  width: 400,
  height: 250,
  center: { x: width / 2, y: height / 2 },
  title: 'React Bubble Chart',
  forceStrength: 0.03
};
ReactBubbleChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  forceStrength: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
};
export default ReactBubbleChart;
