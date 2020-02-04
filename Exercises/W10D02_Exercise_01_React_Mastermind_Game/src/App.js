import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './components/GameBoard/GameBoard';     //! Import the GameBoard
import ColorPicker from './components/ColorPicker/ColorPicker';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">React Mastermind</header>
                <GameBoard />
                <ColorPicker />
            </div>
        );
    }
}

export default App;