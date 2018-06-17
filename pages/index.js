import React, { Component } from 'react'
import axios from 'axios'
import { geolocated } from 'react-geolocated'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: null,
      city: '',
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const key = '8b32fbfbaf4be8b2121738c2f93a5634'
    let city = 'stockholm'
    this.setState({ city: city })

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`,
      )
      .then(response => {
        let temprature = response.data.main.temp
        this.setState({
          temp: temprature,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  changeCity(chosedCity) {
    const key = '8b32fbfbaf4be8b2121738c2f93a5634'
    let city = chosedCity
    this.setState({
      city: city,
    })

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`,
      )
      .then(response => {
        let temprature = response.data.main.temp
        this.setState({
          temp: temprature,
        })
      })
      .catch(error => {
        this.setState({
          error: true,
        })
      })
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  render() {
    let tempCelsius = this.state.temp - 273.15
    tempCelsius = Math.round(tempCelsius)
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          height: '100vh',
          width: '100%',
          background: 'dodgerblue',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="search">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Sök stad"
          />

          <button
            className="searchButton"
            onClick={() => this.changeCity(this.state.value)}
          >
            Search
          </button>
        </div>

        <div className="buttons">
          <button onClick={() => this.changeCity('bangkok')}>Bangkok</button>
          <button onClick={() => this.changeCity('malmo')}>Malmö</button>
          <button onClick={() => this.changeCity('vasteras')}>Västerås</button>
          <button onClick={() => this.changeCity('singapore')}>
            Singapore
          </button>
          <button onClick={() => this.changeCity('stockholm')}>
            Stockholm
          </button>
        </div>
        <h1
          style={{
            padding: '0px',
            margin: '0px',
            color: 'white',
            fontSize: '40px',
            fontFamily: 'Roboto',
            fontWeight: '400',
            textTransform: 'capitalize',
          }}
        >
          Väder {this.state.city}
        </h1>

        {this.state.error == true ? (
          <h2
            style={{
              padding: '0px',
              marginTop: '58px',
              fontSize: '50px',
              fontFamily: 'Roboto',
              fontWeight: '400',
              color: 'white',
              background: 'rgba(255,255,255, .2)',
              borderRadius: '100px',
              padding: '15px 80px 15px 80px',
            }}
          >
            Staden finns inte
          </h2>
        ) : (
          <h2
            style={{
              padding: '0px',
              marginTop: '58px',
              fontSize: '50px',
              fontFamily: 'Roboto',
              fontWeight: '400',
              color: 'white',
              background: 'rgba(255,255,255, .2)',
              borderRadius: '100px',
              padding: '15px 30px 15px 30px',
            }}
          >
            {tempCelsius}°C
          </h2>
        )}

        <style jsx global>{`
          * {
            padding: 0;
            margin: 0;
          }

          .buttons {
            display: flex;
            flex-direction: row;
            padding-bottom: 40px;
          }

          button {
            background: skyblue;
            border-radius: 5px;
            color: white;
            border: none;
            font-size: 18px;
            padding: 20px 30px 20px 30px;
            margin: 10px;
            transition: 0.2s ease-out 0s;
          }

          button:hover {
            background: lightblue;
            transition: 0.2s ease-out 0s;
          }

          button:focus {
            outline: none;
          }

          .search {
            padding-bottom: 20px;
          }

          input {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            padding: 15px 30px 15px 25px;
            border-radius: 100px;
            color: white;
            font-size: 18px;
          }

          input::placeholder {
            color: white;
            opacity: 0.5;
          }

          input:focus {
            outline: none;
          }

          .searchButton {
            background: steelblue;
            border: none;
            padding: 15px 30px 15px 25px;
            border-radius: 100px;
            color: white;
            font-size: 18px;
            transition: 0.2s ease-out 0s;
          }

          .searchButton:hover {
            background: steelblue;
            opacity: 0.8;
            transition: 0.2s ease-out 0s;
          }
        `}</style>
      </div>
    )
  }
}

export default App
