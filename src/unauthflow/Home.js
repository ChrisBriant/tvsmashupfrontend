import smashuplogo from '../assets/smashuplogo2.svg';
import Spacer from '../components/Spacer';
import SmashupList from '../neutral/SmashupList';

const Home = () => {
  return (
    <>
      <header className ="header" >
        <Spacer height="1rem"/>
        <h1>See your Favourite Shows Battle Each Other Out</h1>
        <Spacer height="2rem"/>
        <div><img alt="hero" src={smashuplogo}/></div>
        <a href="#smashups">See the latest here</a>
      </header>
      <section id="smashups">
        <SmashupList />
      </section>
    </>
  )
}

export default Home;
