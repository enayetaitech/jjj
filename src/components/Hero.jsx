import { FaRocket, FaVideo, FaRobot } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className='max-w-6xl mx-auto px-5 pt-16 md:pt-24 pb-10 md:pb-14'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className="bg-gradient-to-r from-primary to-blue-700 text-4xl sm:text-5xl lg:text-7xl text-center font-bold leading-tight sm:leading-snug mb-6 sm:mb-8" style={{ backgroundClip: 'text' }}>
          Faceless Videos on Auto-Pilot: Effortless Creation
        </h1>
        <p className='text-xl sm:text-2xl text-textColor text-center my-6 sm:my-10 max-w-3xl'>
          Our powerful AI video creation platform allows you to fully automate a faceless channel. Unleash your creativity without showing your face!
        </p>
        <div className='flex flex-wrap justify-center gap-6 sm:gap-8 my-8 sm:my-12'>
          <FeatureCard icon={<FaRocket />} title="Quick & Easy" description="Create videos in minutes, not hours" />
          <FeatureCard icon={<FaVideo />} title="Professional Quality" description="High-quality videos without expensive equipment" />
          <FeatureCard icon={<FaRobot />} title="AI-Powered" description="Leverage cutting-edge AI for content creation" />
        </div>
        <button className='bg-gradient-to-r from-primary to-blue-700 text-white py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1'>
          Start Creating Now - It's Free!
        </button>
        <p className='text-sm text-gray-500 pt-4 sm:pt-5'>No credit card required</p>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className='flex flex-col items-center bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 w-full sm:w-64'>
    <div className='text-3xl sm:text-4xl text-primary mb-3 sm:mb-4'>{icon}</div>
    <h3 className='text-lg sm:text-xl font-semibold mb-2'>{title}</h3>
    <p className='text-center text-gray-600 text-sm sm:text-base'>{description}</p>
  </div>
)

export default Hero
