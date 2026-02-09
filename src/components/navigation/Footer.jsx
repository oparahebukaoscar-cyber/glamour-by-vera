import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} bg-cream border-t border-cocoa/10`}> 
      <div className={`${styles.inner} max-w-7xl mx-auto px-6 py-12`}>
        <div className={`${styles.grid}`}>
          <div>
            <div className={styles.brand}>Glamour by Vera</div>
            <div className={styles.tagline}>Luxury leather crafted for timeless elegance.</div>
          </div>

          <div>
            <h4 style={{ marginBottom: 12, color: 'rgba(245,241,235,0.95)', fontWeight: 600 }}>Company</h4>
            <ul className={styles.links}>
              <li><Link to="/about" className={styles.link}>About Us</Link></li>
              <li><Link to="/our-story" className={styles.link}>Our Story</Link></li>
              <li><Link to="/contact" className={styles.link}>Contact Us</Link></li>
              <li><Link to="/admin/login" className={styles.link}>Admin Login</Link></li>
              <li><Link to="/admin/signup" className={styles.link}>Admin Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: 12, color: '#4A3726', fontWeight: 600 }} className="font-heading">Shop</h4>
            <ul className={styles.links}>
              <li><Link to="/shopping" className={`${styles.link} vintage-link`}>Bags</Link></li>
              <li><Link to="/shopping" className={`${styles.link} vintage-link`}>Shoes</Link></li>
              <li><Link to="/shopping" className={`${styles.link} vintage-link`}>Sneakers</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.dividerTop}>
          © {new Date().getFullYear()} Glamour by Vera. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}