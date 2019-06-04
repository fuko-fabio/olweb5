import React from 'react';
import { Link } from "react-router-dom";

function Home() {
    return (
        <header>
            <h2>HOC</h2>
            <ul>
                <li>
                    <Link to="/hoc/1">OK example</Link>
                </li>
                <li>
                    <Link to="/hoc/123">ERROR example</Link>
                </li>
            </ul>
            <h2>Hook</h2>
            <ul>
                <li>
                    <Link to="/hook/1">Custom hook OK example</Link>
                </li>
                <li>
                    <Link to="/hook/12345">Custom hook ERROR example</Link>
                </li>
            </ul>
            <h2>Playground</h2>
            <ul>
                <li>
                    <Link to="/counters">Counters</Link>
                </li>
            </ul>
        </header>
    );
}

export default Home;
