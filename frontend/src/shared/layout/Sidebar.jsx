
import {
  House,
  Users,
  PlusCircle
} from "lucide-react";

export default function Sidebar({
  communities = [],
  onNavigate
}) {
  return (
    <nav className="sidebar-navigation">
      <a href="/" className="sidebar-link"
         onClick={onNavigate}>
        <House size={20} />
        Home
      </a>

      <a href="/communities" className="sidebar-link"
         onClick={onNavigate}>
        <Users size={20} />
        Communities
      </a>

      <hr />

      <p className="sidebar-heading">YOUR COMMUNITIES</p>

      {communities.map((community) => (
        <a
          key={community.id}
          href={`/communities/${community.id}`}
          className="sidebar-link"
          onClick={onNavigate}
        >
          r/{community.name}
        </a>
      ))}

      <a href="/communities/create"
         className="sidebar-link"
         onClick={onNavigate}>
        <PlusCircle size={20} />
        Create Community
      </a>
    </nav>
  );
}
