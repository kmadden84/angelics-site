import '../styles/globals.css'
import Header from '../components/header/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import Footer from '../components/footer/Footer';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    var header = document.querySelector(".navbar");
    var btns = header.getElementsByClassName("header-link");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }

  }, [])

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
