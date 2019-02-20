# Bluejay
Bluejay is a simple database viewing app to sort through basic census data.

## Organization Conventions
### Components
All functional components of this app are stored in the components directory.
Within this directory, each component has a subdirectory of name `ComponentName`. This in turn contains the subdirectories, `containers` and `views`. Containers holds components, with name `ComponentNameContainer` that 'do something', e.g. get data, prepare data, but do not have any display capability. They pass props for display to components stored in views.

The views directory contains components, with name `ComponentNameView`, which display based on the props passed into them. This directory also contains css files, with the same name as their respective component but camelCased. Finally, there is a jest testing file with the same name as its respective component, with '.test' appended to it.

Note that this convention of UpperSentenceCase components and camelCase helpers continues throughout.

#### UI
This directory is dedicated to resuable presentational components, which contain so little logic on their own, and cannot be associated with a particular Functionality level component. 

### Utilities
The utilities subdirectory holds non-component elements,
such as the network helpers and redux store. These are used by components.

### Boilerplate
index, App, and their related files (created by boilerplate) have been left in the root for simplicity and differentiation from other 'custom' files.

## Deployment
This app is built in typescript, and has its assets compiled to js (in dist) by the command `npm run build-ts`.

When deploying, *do not* include this directory. Typescript will be compiled, and a react production build will be assembled, automatically upon Heroku deploy.

## Important Design Decisions
    1.  A search filter, as a proof of concept, was included because of the large amount of data. The search process was not optimized since 1) proof of concept, and 2) Only 100 rows being filtered, modern computers can handle it.

    2. While mobile is 'generally' supported, it is not optimized of foolproof. It was thought that this is primarily a desktop app and was developed as such.

    3. An  HTML table was not used, and was instead reimplemented is CSS using simple flex, because it offered a great deal of control regarding the styles desired and was not overtly complicated to develop and maintain.

    4. Gradient was chosen due to its re-emergence in web design.

    5. Caching was done since use-case was not specified, but a hard-reload button with reminder timer was also included to allow flexibility.

    6. 100% Round corners indicare inputs of some sort.

    7. I'm not saying there's an easter egg if you hover the logo...but I'm also not saying there isn't...

    8. TODO: Clean up the css styling, but that convention depends on organization.

    9. I used CSS zoom...which I know is a questionable idea. It isn't supported by firefox which is why the scaling is off there. It was used because my design tool (XD) has pixel sizing a little bit off from normal desktop in my experience. Scaling allowed me to move faster.

    In proper development, I'd use either a CSS preprocessor or a root{} variable to store a unit size in px, then write all other dimensions as calced functions of that base unit.

    