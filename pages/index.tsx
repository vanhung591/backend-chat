import React from "react";
import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Management App</title>
        <meta name="description" content="Trang cho phép quản lý dữ liệu của ứng dụng chat"/>
        <link rel="icon"
              href="https://www.creativefabrica.com/wp-content/uploads/2019/04/Chat-icon-by-ahlangraphic-39.jpg"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://client-slack.web.app">Management App!</a>
        </h1>

        <div className={styles.grid}>
          <Link href="/home" >
            <div className={styles.card}>
              <h2>Home &rarr;</h2>
              <p>Trang tổng quan xem dữ liệu.</p>
            </div>
          </Link>

          <Link href="/channels" >
            <div className={styles.card}>
              <h2>Channels &rarr;</h2>
              <p>Cho phép quản lý kênh chat!</p>
            </div>
          </Link>

          <Link
            href="/users"

          >
            <div className={styles.card}>
              <h2>User &rarr;</h2>
              <p>Cho phép quản lý người dùng!</p>
            </div>
          </Link>

          <Link
            href="/roles"
          >
            <div className={styles.card}>
              <h2>Roles &rarr;</h2>
              <p>
              Cho phép quản lý chức năng người dùng!
              </p>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home