import "./App.scss";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Nav from "./Nav";
import { LanguageProvider } from "./LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Nav />
        <Gallery />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
