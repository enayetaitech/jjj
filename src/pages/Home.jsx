import Footer from '../components/Footer'
import Hero from '../components/Hero'
import CreateHomePage from './CreateHomePage'
import CreateUi from './CreateUI'
import VideoCreationWizard from './CreateUI2'
import View from './View'

const Home = () => {
  return (
    <div className=''>
      {/* <Navbar/> */}
      <Hero/>
      <VideoCreationWizard/>
      {/* <View/> */}
      {/* <CreateUi/> */}
      {/* <CreateHomePage/> */}
      {/* <HowWork/>
      <Pricing/>*/}
     <Footer/> 
    </div>
  )
}

export default Home