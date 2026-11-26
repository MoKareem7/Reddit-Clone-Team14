
import { useState } from "react";
import {
  House,
  Users,
  PlusCircle,
  Hash,
  ChevronDown
} from "lucide-react";

export default function Sidebar({
  communities = [],
  isOpen = false,
  onNavigate
}) {
  const [communitiesOpen, setCommunitiesOpen] = useState(true);

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <nav className="sidebar__nav" aria-label="Main navigation">

        {/* Home */}
        <a
          href="/"
          className="sidebar__item sidebar__item--active"
          onClick={onNavigate}
        >
          <House className="sidebar__item-icon" />
          <span className="sidebar__item-label">Home</span>
        </a>

        {/* Communities */}
        <a
          href="/communities"
          className="sidebar__item"
          onClick={onNavigate}
        >
          <Users className="sidebar__item-icon" />
          <span className="sidebar__item-label">Communities</span>
        </a>

        <hr className="sidebar__divider" />

        {/* Your Communities */}
        <section className={`sidebar__section ${communitiesOpen ? "" : "sidebar__section--collapsed"}`}>

          <button
            type="button"
            className="sidebar__section-header"
            onClick={() => setCommunitiesOpen(!communitiesOpen)}
            aria-expanded={communitiesOpen}
          >
            <span className="sidebar__section-title">
              Your Communities
            </span>

            <ChevronDown className="sidebar__section-chevron" />
          </button>

          <div className="sidebar__section-list">
            <a
              href="/communities/create"
              className="sidebar__item"
              onClick={onNavigate}
            >
              <PlusCircle className="sidebar__item-icon" />
              <span className="sidebar__item-label">
                Create Community
              </span>
            </a>

            {communities.map((community) => (
              <a
                key={community.id}
                href={`/communities/${community.id}`}
                className="sidebar__item"
                onClick={onNavigate}
              >
                <Hash className="sidebar__item-icon" />
                <span className="sidebar__item-label">
                  r/{community.name}
                </span>
              </a>
            ))}
          </div>
        </section>
      </nav>
    </aside>
  );
}
