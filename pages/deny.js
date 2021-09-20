import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home = () => {

    return (
        <div className={styles.container}>
            <Head>
                <title>Un available</title>
                <meta name="description" content="intersection" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main} style={{ height: "100%" }}>
                Your not a user in our system
            </main>
        </div>
    );

}

export default Home;