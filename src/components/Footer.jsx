import styles from './Footer.module.css';
import { personal } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brandMark}>
              <span className={styles.brandStar} aria-hidden="true">★</span>
              <span className={styles.brandName}>ASTRA STUDIO</span>
            </div>
            <p className={styles.brandTagline}>
              A personal creative identity.
              <br />
              Not a corporation. Not a startup.
              <br />
              Just a guy from Surat with internet access.
            </p>
          </div>

          <div className={styles.infoCol}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>NAME</span>
              <span className={styles.infoVal}>{personal.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>LOCATION</span>
              <span className={styles.infoVal}>{personal.location}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>EMAIL</span>
              <a href={`mailto:${personal.email}`} className={styles.infoLink}>{personal.email}</a>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>STATUS</span>
              <span className={styles.infoStatus}>
                <span className={styles.statusDot} aria-hidden="true" />
                ONLINE
              </span>
            </div>
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {year} ASTRA Studio / Mayank Madhyani
          </span>
          <span className={styles.microCopy}>
            built in a browser. held together by vibes.
          </span>
        </div>
      </div>
    </footer>
  );
}
