import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainRouter from "./components/Routing/MainRouter";
import { languageContext } from "./components/context/language";
import { useState } from "react";

function App() {
  let [language, setLanguage] = useState("en");
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
  };
  return (
    <>
      <BrowserRouter>
        <languageContext.Provider value={{ language, toggleLanguage }}>
          <Header />
          <div className="conatiner">
            <MainRouter />
          </div>
        </languageContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
