# Paidy weather-app assignment

## Installation

> npm install

> npm run


## Summary

I took this as an opportunity to learn about several APIs and libraries:

- React Places Autocomplete - suggestions of city name
- Recharts - graph of temperature forecast
- StyledComponents - conditional styling at the component level
- React Weather Icons - display an icon depending on weather description
- FontAwesome - scalable icons for some controls
- Google places API - getting long/lat from the city name
- Google Maps API - getting the local timezone of the city
- OpenWeatherMap API - getting current weather and forecast

I wanted to demonstrate that with the limited time (4-6 hours) I could be as effective as possible; choosing modern, well maintained libraries that I could leverage to fit the design of my app.

All components were styled myself in an attempt to demonstrate a basic understanding of design principals and layout tools such as flexbox.

## Features and design considerations

### Autocomplete of city names

Absolutely necessary for a weather app. Note the search-box does not lose focus when a search is made, so that the user may enter a new city name with ease.

### Future forecast

The graph has a hoverable tooltip, providing the temperature and weather description. Note the re-use of the "WeatherDisplay" component in both the weather summary and the graph's tooltip - I recognise the opportunity to save time and effort!

The forecast uses local time, which I determined via a timezone query to Google Maps. Unfortunately, the weather API I used only gave forecasts in 3 hour intervals. I elected to only show the next 24 hours of weather; for later days I would consider a weekly summary component as well as this graph.

### Responsive design

The app is usable at a wide variety of viewport sizes. Check for yourself by resizing the window! The auto-suggestions list overlaps the app with some slight transparency if necessary.

## Compromises

Given the limited time-frame, the app cannot be made perfect and some compromises with its design were made:

- No error state for the autocomplete search - No message is displayed if the autocomplete API fails; instead simply no results will show.

- Simplistic visual design - While a styled component library would have made the app more visually appealing, I chose to demonstrate my own understanding of CSS and apply a simple design to the app myself.

- Brittle loading/error state - The app has 3 conditions pertaining to the state of its data: hydrated, loading and error. The way the weather report is conditionally rendered based on these could perhaps be handled in a better way, especially as complexity grows.

- No automated testing - While I am a proponent of BDD, writing automated tests for an app of such limited scope would be inefficient. A full integration test can be manually performed in a coupe of minutes. If the project scope were to grow, my prioroties would of course shift.

- Flat project structure - I believe project/folder structure is an iterative process; I adapt it as the project grows and patterns emerge. With less than 10 files, I think folders are not necessary and simply make the content take longer to access.

A large number of decisions were made during my time coding - I really hope we can take a deep-dive into my code sometime soon!
