// components/AnimatedBackground.jsx
const AnimatedBackground = () => (
  <div className="fixed top-0 left-0 w-full h-full -z-10 animate-pulse" style={{
    animationDuration: '20s',
    animationIterationCount: 'infinite'
  }}>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-cyan-900/20"></div>
    <div className="absolute top-0 left-0 w-full h-full" style={{
      background: 'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.1) 0%, transparent 50%)'
    }}></div>
    <div className="absolute top-0 left-0 w-full h-full" style={{
      background: 'radial-gradient(circle at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 50%)'
    }}></div>
    <div className="absolute top-0 left-0 w-full h-full" style={{
      background: 'radial-gradient(circle at 40% 40%, rgba(6,182,212,0.1) 0%, transparent 50%)'
    }}></div>
  </div>
);

export default AnimatedBackground;