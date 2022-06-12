import Link from 'next/link'

export default function Page404() {
  return <>
    <h1>Cette page n'existe pas</h1>
    <Link href="/">
      <a>
        Revenir à l'accueil
      </a>
    </Link>
  </>
}