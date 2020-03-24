import * as React from 'react';
import 'canvas-gauges';
import { client } from './connect';
import '../stylesheets/global.less';
// import { ExpRadialGauge } from './ExpRadialGauge';

let stream = {
  windSpeed: {
    value: 0,
    timestamp: 0,
  },
  windAngle: {
    value: 0,
    timestamp: 0,
  },
  windDirection: 'N',
};

export class App extends React.Component {
  static convertRadToDegrees(rad) {
    return rad * 57.2958;
  }

  static convertMSToKnots(speed) {
    return Math.floor(speed * 1.94);
  }

  static getWindHeading(direction) {
    let heading = null;

    const degrees = App.convertRadToDegrees(direction);

    if (degrees < 22) heading = 'N';
    else if (degrees < 67) heading = 'NE';
    else if (degrees < 112) heading = 'E';
    else if (degrees < 157) heading = 'SE';
    else if (degrees < 212) heading = 'S';
    else if (degrees < 247) heading = 'SW';
    else if (degrees < 292) heading = 'W';
    else if (degrees < 337) heading = 'NW';
    else heading = 'N';

    return heading;
  }

  constructor(props) {
    super(props);
    this.state = {
      ...stream,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(stream);
    }, 1000);

    client.on('delta', (data) => {
      switch (data.updates[0].values[0].path) {
        case 'environment.wind.angleApparent': {
          const windDirection = App.getWindHeading(data.updates[0].values[0].value);

          stream = {
            ...stream,
            windAngle: {
              value: data.updates[0].values[0].value,
              timestamp: data.updates[0].timestamp,
            },
            windDirection,
          };
          break;
        }

        case 'environment.wind.speedApparent': {
          const windSpeed = App.convertMSToKnots(data.updates[0].values[0].value);

          stream = {
            ...stream,
            windSpeed: {
              value: windSpeed,
              timestamp: data.updates[0].timestamp,
            },
          };
          break;
        }
      }
    });
  }

  render() {
    const { windSpeed, windAngle } = this.state;
    const degrees = App.convertRadToDegrees(windAngle.value);
    const colorProps = {
      'data-highlights': false,
      'data-color-plate': '#E6E4E1',
      'data-color-numbers': '#291611',
      'data-color-major-ticks': '#291611',
      'data-color-minor-ticks': '#291611',
      'data-color-circle-inner': '#291611',
      'data-color-needle-circle-outer': '#291611',
      'data-needle-circle-outer': false,
      'data-font-title-size': 19,
    };

    return (
      <div className="boat">
        {/* <ExpRadialGauge
          width="400"
          height="400"
          maxRange="50"
        /> */}

        <div className="boat__instruments">
          <div className="boat__instrument-wind">
            <canvas
              id="gauge"
              data-title="speed"
              data-type="radial-gauge"
              data-width="400"
              data-height="400"
              data-value={windSpeed.value}
              data-animation-rule="bounce"
              data-animation-duration="600"
              data-units="kn"
              {...colorProps}
            />
          </div>
          <div className="boat__instrument-wind">
            <canvas
              data-value={degrees}
              data-width="400"
              data-height="400"
              data-type="radial-gauge"
              data-min-value="0"
              data-max-value="360"
              data-major-ticks="N,NE,E,SE,S,SW,W,NW,N"
              data-minor-ticks="22"
              data-ticks-angle="360"
              data-start-angle="180"
              data-stroke-ticks="false"
              data-highlights="false"
              data-value-box="false"
              data-value-text-shadow="false"
              data-needle-circle-size="15"
              data-needle-circle-outer="false"
              data-animation-rule="linear"
              data-needle-type="line"
              data-needle-start="75"
              data-needle-end="99"
              data-needle-width="3"
              data-borders="true"
              data-border-inner-width="0"
              data-border-middle-width="0"
              data-border-outer-width="10"
              data-color-border-outer="#ccc"
              data-color-border-outer-end="#ccc"
              data-color-needle-shadow-down="#222"
              data-border-shadow-width="0"
              data-animation-target="plate"
              data-title="direction"
              data-animation-duration="1500"
              {...colorProps}
            />
          </div>
        </div>
      </div>
    );
  }
}
