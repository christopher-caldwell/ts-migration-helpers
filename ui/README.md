# Muster the Fleet
A fullstack, MongoDB, Express, React, and NodeJS stack application for building a fleet to play Star Wars: Armada
  

## Left Side ##
- All buttons are `<Link to ="/x"/>` JSX from React Router
- Upon click, path changes to designated card display 
- No state changes other than displaying the selected ships
- Chosen ships will live in `SelectedShips` component
- Chosen ships are stored in an array inside of the parent state
- Each ship currently shows upgrades an array of objects representing the data relevant to the upgrade

### Desired Data Storage ###
- I'd like to be able to store upgrades as object properties, but I cannot figure out how to display them

## Right Side ##
- Display changes based on which button on the `Left` side was clicked
- Each card has an event listener that adds it to the state in the correct place
- Card types are displayed from Routes
- `'/ships'` displays the ship cards

### Ships ###
- Ships are added to an empty array stored in the state

### Upgrades ###
- Upgrades of their respective type are assigned to a specific index position, storing an object relating to the relevant data

  
