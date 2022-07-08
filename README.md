# Weather Weer

Get the weather forecast for the next 15 days, and the weather history for a specific date range for the past 5 years based on the city and dates entered.  Allows users to better understand what the weather may be like in a specific location.  Can be used for planning vacation or to get a perspective of climate change. 

**Full Website:** https://weather-weer.herokuapp.com

- [Weather Weer](#weather-weer)
  - [Motivation](#motivation)
  - [Optimizations](#optimizations)
  - [Lessons Learned](#lessons-learned)
  - [Built with](#built-with)

### Screenshot

![Screenshot of landing page](img/Screenshot%20-%20forecast.png)
![Screenshot of search result](img/Screenshot%20-%20forecast%20and%20historical.png)

***
## Motivation

I started this project initilially to learn how to work with API, and manipulating the DOM to present information to users. The product has since evolved to v2 as v1 broke when the weather API used stopped permitting cross domain requests, which is now resolved through the backend.  I took the opportunity to add weather forecast to expand on the product offering.  Additionally, I took my learning from V1 and converted to using React for the frontend.  See [Lessons Learned](#lessons-learned) below for more details on this.

There are many Weather APIs available with free tiers that's great for learning and personal projects.  I chose Visual Crossing's API as I knew I wanted the option to get weather data from the past, and they were one of the few that offered the data history in the free tier.

### Use cases
- **Travel planning** - the first time I thought about how nice it would be to know what the weather was like the past few years for the date range was when I visited Hawaii the first time.  Everyone paints Hawaii as an amazing tropical getaway all-year-round, but instead I was faced with cold and rain and thought to myself, why was I so unlucky? What if I could've known the facts (past weather data) instead of other people's experience when I was booking my tickets before it was too late (when forecast was available)?
- **Understanding the impact of climate change** - with climate change happening and the effect more noticiable, how has the weather changed in your area throughout the years? Is it as you remembered? Is it more drastic than you remembered? Will this drive you to make a change?

## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility

- Add query limit
- Add option to toggle between Celsius and Fahrenheit
- Refactor
- Refine the frontend experience and optimize for mobile
## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

1.  v1 - I need to learn a frontend framework.
I wanted to present the weather data for each day nicely in each 'WeatherCard', where I first used createElement(), classList.add(), and appendChild() methods.  By the end of the first iteration of the project, I was displeased with how tedious it was to code a single element on the DOM.  Thus that was when I set out to learn React, which has accelerated my development time on the frontend for subsequent projects and allowed me to be more creative with the applications I build.

2.  v2 - The challenge of setting up a fullstack application.
With v2 of the product, I planned to utilize the backend to get the weather data to work around the CORS issue from the client side.  I also plan to connect to a database to help keep track of the number of query credits used, which is not available in the Visual Crossing Weather API, and limit it to prevent overcharge so that I can show case the product without fear of sudden overcharge.  This leads me to working on my first fullstack application where I need to think about the organization of the project.  During development in local, I was able to keep the code in the project between frontend and backend separate.  However, during deployment to Heroku, I wasn't able to maintain the separation and needed to combine the frontend files together with the backend files.  I may try something different during development setup for my next project to see if I still run into this issue, but for now, I'm happy that it's on Heroku so that it's easier to share. If you know of a better way, please let me know.  
## Built with

- React
- Node
- Express
- MongoDB
