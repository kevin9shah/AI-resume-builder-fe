import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Titles from '../components/home/Titles'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Titles title='Build your resume' description='Descriptionnn' />
      <Footer />
    </div>

  )
}

export default Home