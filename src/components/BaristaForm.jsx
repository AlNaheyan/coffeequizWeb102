"use client"

import { useState } from "react"
import RecipeChoices from "./RecipeChoices"
import drinksJson from "../drinks.json"

const BaristaForm = () => {
  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  }
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  })
  const [currentDrink, setCurrentDrink] = useState("")
  const [trueDrink, setTrueDrink] = useState({})

  const onNewDrink = () => {
    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    })
    getNextDrink()

    setCorrectBlend("")
    setCorrectMilk("")
    setCorrectSyrup("")
    setCorrectTemperature("")
  }

  const getNextDrink = () => {
    const randomizerIndex = Math.floor(Math.random() * drinksJson.drinks.length)
    setCurrentDrink(drinksJson.drinks[randomizerIndex].name)
    setTrueDrink(drinksJson.drinks[randomizerIndex].ingredients)
  }

  const onCheckAnswer = () => {
    if (trueDrink.temperature !== inputs["temperature"]) {
      setCorrectTemperature("wrong")
    } else {
      setCorrectTemperature("correct")
    }

    if (trueDrink.milk !== inputs["milk"]) {
      setCorrectMilk("wrong")
    } else {
      setCorrectMilk("correct")
    }

    if (trueDrink.syrup !== inputs["syrup"]) {
      setCorrectSyrup("wrong")
    } else {
      setCorrectSyrup("correct")
    }

    if (trueDrink.blended !== inputs["blended"]) {
      setCorrectBlend("wrong")
    } else {
      setCorrectBlend("correct")
    }
  }

  const [correctTemperature, setCorrectTemperature] = useState("")
  const [correctMilk, setCorrectMilk] = useState("")
  const [correctSyrup, setCorrectSyrup] = useState("")
  const [correctBlend, setCorrectBlend] = useState("")

  return (
    <div className="barista-form">
      <h2>Hi, I'd like to order a: </h2>
      <div className="drink-container">
        <h2 className="mini-header">{currentDrink || "Click New Drink to start"}</h2>
        <button type="button" className="button newdrink" onClick={onNewDrink}>
          🔄
        </button>
      </div>

      <div className="container">
        <div className="mini-container">
          <h3>Temperature</h3>
          <div className="answer-space" id={correctTemperature}>
            {inputs["temperature"] || "Select temperature"}
          </div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="temperature"
            choices={ingredients["temperature"]}
            checked={inputs["temperature"]}
          />
        </div>
        <div className="mini-container">
          <h3>Milk</h3>
          <div className="answer-space" id={correctMilk}>
            {inputs["milk"] || "Select milk type"}
          </div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="milk"
            choices={ingredients["milk"]}
            checked={inputs["milk"]}
          />
        </div>
        <div className="mini-container">
          <h3>Syrup</h3>
          <div className="answer-space" id={correctSyrup}>
            {inputs["syrup"] || "Select syrup"}
          </div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="syrup"
            choices={ingredients["syrup"]}
            checked={inputs["syrup"]}
          />
        </div>
        <div className="mini-container">
          <h3>Blended</h3>
          <div className="answer-space" id={correctBlend}>
            {inputs["blended"] || "Select blended option"}
          </div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="blended"
            choices={ingredients["blended"]}
            checked={inputs["blended"]}
          />
        </div>
      </div>

      <div className="button-container">
        <button onClick={onCheckAnswer} type="submit" className="button submit">
          Check Answer
        </button>
        <button onClick={onNewDrink} type="button" className="button newdrink">
          New Drink
        </button>
      </div>
    </div>
  )
}

export default BaristaForm

