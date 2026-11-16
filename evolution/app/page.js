import { profile, list } from './data';
import ThemeToggle from './components/ThemeToggle';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="container">
      <div className="topbar"><ThemeToggle /></div>
      <header className="hero">
        <h1>{profile.fullName}</h1>
        <p className="role">{profile.updatedTitle}</p>
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
        <h2>Certifications</h2>
        <ul className="cards">
          {list(profile.certifications).map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Projets DevOps &amp; Cloud</h2>
        <ul className="cards">
          {list(profile.devopsProjects).map((p) => (
            <li key={p}>{p}</li>
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
