
import MainLayout from "./shared/layout/MainLayout";

function App() {
  const demoCommunities = [
    { id: "1", name: "programming" },
    { id: "2", name: "webdev" },
    { id: "3", name: "gaming" }
  ];

  return (
    <MainLayout
      communities={demoCommunities}
      rightSidebar={
        <div>
          <h3>About Reddit</h3>
          <p>Discover communities and discussions.</p>
        </div>
      }
    >
      <h1>Home</h1>
      <p>Welcome to our Reddit Clone!</p>
      <p>Team 2 will implement the feed here.</p>
    </MainLayout>
  );
}

export default App;
