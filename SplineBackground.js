// src/SplineBackground.js
import dynamic from 'next/dynamic';

// Dynamically import the Spline component
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false, // Disable server-side rendering for this component
});

const SplineBackground = () => {
  return (
    <div className="hero">
      {/* Embed the Spline design */}
      <Spline scene="https://my.spline.design/glowingplanetparticles-ffd9a9da6ee45de76d3451dab34b66ad/" />
    </div>
  );
};

export default SplineBackground;