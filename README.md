# MerkleAssignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Assignment details

This application was created with Angular X and TypeScript. SASS was used as the CSS preprocessor and the UI was made to be responsive.

To run the application firstly run the `npm install` command followed by `ng serve -o` which will open a new browser window or tab with the application running.

The application is structured in one main module and a landing page component. This was mostly done for future scalability, as it
wasn't exactly necessary for the task at hand but will definitely be helpful when the application grows and multiple modules and
components will be added. This will also allow for further optimization with lazyloading, for example.

I chose not to implement any state management as the user will only be viewing items and not performing any actions with them.

I first get the top stories ids through the provided API endpoint, then choose 10 random ids, and then retrieve the story details for those ids to sort them in ascending order by the score.

I've created a basic service to handle all the API calls with a simple error handling functionality. Also implemented a loading handler for slower connections.

The first 3 stories are displayed in a trio for the only reason of visual diversity, the remaining 7 in a grid below. Again, for the sake of esthetics I didn't display the URL for the first three but do for the remaining 7, but still keep the functionality of navigating to the story by clicking the entire card.

The score for each story is represented in the top left corner and the rest of the required data is displayed with a suggestive icon next to them. In some cases, the URL is missing, in which case, I don't show the icon at all so there is no uneven spacing.


