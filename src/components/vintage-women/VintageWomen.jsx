"use client";

import styles from "./VintageWomen.module.css";

const images = [
  { id: 1, url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770237865/download_79_adetvp.jpg", alt: "Timeless Heel" },
  { id: 2, url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770237798/download_81_lzlqog.jpg", alt: "Elegant Pump" },
  { id: 3, url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770237862/download_80_uakzby.jpg", alt: "Vintage Sandal" },
  { id: 4, url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770240520/SLM_wuxcfh.jpg", alt: "Luxe Flats" },
  { id: 5, url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770240521/download_85_qwxgh0.jpg", alt: "Court Shoe" },
  { id: 6, url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770240525/download_84_g3d3hy.jpg", alt: "Heritage Heel" },
];

export default function VintageWomen() {
  return (
    <section className={styles.section} aria-labelledby="vintage-women-head">
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 id="vintage-women-head" className={styles.headline}>
            Timeless Women’s Elegance
          </h3>
          <p className={styles.copy}>
            A curated edit of feminine silhouettes where careful craft and gentle
            refinement meet enduring style.
          </p>
          <div className={styles.accent} aria-hidden="true" />
        </header>

        <div className={styles.gallery}>
          <div className={`${styles.tile} ${styles.tileLarge}`}>
            <img src={images[0].url} alt={images[0].alt} loading="lazy" />
          </div>

          <div className={`${styles.tile} ${styles.tileSmall}`}>
            <img src={images[1].url} alt={images[1].alt} loading="lazy" />
          </div>

          <div className={`${styles.tile} ${styles.tileFloating}`}>
            <img src={images[2].url} alt={images[2].alt} loading="lazy" />
          </div>

          <div className={`${styles.tile} ${styles.tileMedium}`}>
            <img src={images[3].url} alt={images[3].alt} loading="lazy" />
          </div>

          <div className={`${styles.tile} ${styles.tileSmall2}`}>
            <img src={images[4].url} alt={images[4].alt} loading="lazy" />
          </div>

          <div className={`${styles.tile} ${styles.tileMedium2}`}>
            <img src={images[5].url} alt={images[5].alt} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
