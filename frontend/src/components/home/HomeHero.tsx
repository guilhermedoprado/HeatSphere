import styles from './HomeHero.module.css';

const HomeHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h2>Lorem</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nihil temporibus modi commodi consequuntur, tempora ipsa consectetur. Mollitia temporibus cumque facere quas eos debitis nihil obcaecati maxime. Rerum, quis ut?
        </p>
      </div>
      <div className={styles.heroCard} role="presentation">
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente aperiam nemo amet repellat illum tempora excepturi, natus officia, odit corporis autem pariatur sequi. Fugiat dolorum quasi vitae aperiam assumenda odio?</h3>
        <ul>
          <li>lorem</li>
          <li>lorem</li>
          <li>lorem</li>
        </ul>
      </div>
    </section>
  );
};

export default HomeHero;
