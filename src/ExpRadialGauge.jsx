import * as React from 'react';
import '../stylesheets/radialGauge.less';

export const ExpRadialGauge = (props) => {
  let index = 0;
  const { maxRange, height, width } = props;
  const ticks = new Array(maxRange).fill(1);
  const wrapperStyle = {
    height: `${height}px`,
    width: `${width}px`,
  };
  const interval = (height / maxRange);

  return (
    <div className="radial__wrapper">
      <div className="radial__instrument" style={wrapperStyle}>
        {ticks.map(() => {
          const style = {
            left: interval * index,
          };
          index += 1;
          return <div key={(index)} style={style} className="radial__tick" />;
        })}
      </div>
    </div>
  );
};
