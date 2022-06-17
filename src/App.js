import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IndexProvider } from "./context/IndexContext";
import { HomePage, MoviePage, DisplayMovie } from "./pages/index";
import { Navbar, Footer, ErrorPage } from "./components/index";

function App() {
    return (
        <IndexProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/cinema-movie" element={<HomePage />} />
                    <Route path="/movie" element={<MoviePage />}>
                        <Route path=":id" element={<DisplayMovie />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </Router>
        </IndexProvider>
    );
}

export default App;
