import React from 'react';

import Svg, { Path } from 'react-native-svg';

const IconDone = (viewbox, width, height, fillColor) => {
	return (
		<Svg 
		viewBox={viewbox}
		width={width}
		height={height}
		fill={fillColor}
		>
		<Path
			d="M453,574h62a10,10,0,0,1,10,10v62a10,10,0,0,0-10-10H473a10,10,0,0,1-10-10V584A10,10,0,0,0,453,574Z"
			transform="translate(-453 -574)"
		/>
		</Svg>
	);
};

export { IconDone };
