import { profile, list } from './data';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <h1>{profile.fullName}</h1>
        <p className="role">{profile.title}</p>
      </header>
      <section>
        <h2>About</h2>
        <p>{profile.bio}</p>
      </section>
      <section>
        <h2>Skills</h2>
        <ul className="tags">
          {list(profile.skills).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Contact</h2>
        <p><a href={'mailto:' + profile.email}>{profile.email}</a></p>
      </section>
      <footer>Version {process.env.APP_VERSION || 'dev'}</footer>
    </main>
  );
}
