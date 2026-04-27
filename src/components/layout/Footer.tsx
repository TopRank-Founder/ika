'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>इंटरनेट की आवाज़</h3>
              <p>सच की आवाज़, हर ख़बर आपके साथ। लखनऊ, गोंडा और पूरे उत्तर प्रदेश की ताज़ा और विश्वसनीय खबरें।</p>
              <div className="footer-social">
                <a href="https://www.facebook.com/Internetkiawaaz/" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/internetkiawaaz" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/internetkiawaaz" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
                <a href="https://wa.me/917905895936" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
                <a href="https://share.google/hPRsqUP08zQfwfrJN" target="_blank" rel="noreferrer"><i className="fab fa-google"></i></a>
              </div>
            </div>
            <div className="footer-col">
              <h3>श्रेणियाँ</h3>
              <ul>
                <li><Link href="/category/politics"><i className="fas fa-chevron-right"></i> राजनीति</Link></li>
                <li><Link href="/category/crime"><i className="fas fa-chevron-right"></i> अपराध</Link></li>
                <li><Link href="/category/sports"><i className="fas fa-chevron-right"></i> खेल</Link></li>
                <li><Link href="/category/entertainment"><i className="fas fa-chevron-right"></i> मनोरंजन</Link></li>
                <li><Link href="/category/business"><i className="fas fa-chevron-right"></i> व्यापार</Link></li>
                <li><Link href="/category/local"><i className="fas fa-chevron-right"></i> स्थानीय खबरें</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>त्वरित लिंक</h3>
              <ul>
                <li><Link href="/about"><i className="fas fa-chevron-right"></i> हमारे बारे में</Link></li>
                <li><Link href="/contact"><i className="fas fa-chevron-right"></i> संपर्क करें</Link></li>
                <li><Link href="/terms"><i className="fas fa-chevron-right"></i> नियम और शर्तें</Link></li>
                <li><Link href="/privacy"><i className="fas fa-chevron-right"></i> गोपनीयता नीति</Link></li>
                <li><Link href="/disclaimer"><i className="fas fa-chevron-right"></i> अस्वीकरण</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>संपर्क</h3>
              <p><i className="fas fa-map-marker-alt"></i> लखनऊ, उत्तर प्रदेश, भारत</p>
              <p><i className="fas fa-envelope"></i> info@internetkiawaaz.com</p>
              <p><i className="fas fa-phone"></i> +91-7905895936</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} इंटरनेट की आवाज़ | Internet Ki Awaaz. सर्वाधिकार सुरक्षित।</p>
            <p>Designed with ❤️ in Lucknow</p>
          </div>
        </div>
      </footer>
      
      <button className="back-to-top show" id="back-to-top" aria-label="Back to top" onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}
