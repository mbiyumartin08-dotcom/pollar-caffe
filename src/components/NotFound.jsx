
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page empty-state">
      <h1 className="page-title">404</h1>
      <p className="muted">Sorry, we couldn't find that page.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}
