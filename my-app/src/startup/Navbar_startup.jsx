function Navbar_startup() {
    return (
      <header className="header">
        <nav className="nav-menu">
          <a href="#pitchers" className="pitchers">Pitchers</a>
          <a href="#profile" className="nav-link">Profile</a>
          <a href="/investor_search" className="nav-link">Explore investors</a>
          <a href="#connect" className="nav-link">Connect</a>
        </nav>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfc635694c159c96b6d50dd7185a85d1978e1a8e68015742d94784c7323b3fb0?placeholderIfAbsent=true&apiKey=bf587ccec06c42a682f4f9dae620cfde" alt="LogOut" className="logOut" />
        <style >{`
          .header {
            background-color: #fff;
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: 14px 49px;
            color: #402e7a;
            font: 600 15px Inter, sans-serif;
          }
          .nav-menu {
            display: flex;
            gap: 40px;
          }
          .nav-link {
          margin-left:1rem;
          margin-top:0.8rem;
            text-decoration: none;
            color: inherit;
          }
          .nav-link:hover{
             font-weight:800;
          }
  
          .pitchers {
            color: #c95827;
            font-size: 25px;
            font-weight: 800;
          }
          .logOut {
            width: 147px;
            height: auto;
          }
          @media (max-width: 991px) {
            .header {
              padding: 14px 20px;
            }
            .nav-menu {
              gap: 20px;
            }
          }
        `}</style>
      </header>
    );
  }
  
  export default Navbar_startup;