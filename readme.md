# MixSim

This is a basic 3D simulation of a multi-paddle dry mixer.
Such equipment is commonly used in the chemical, pharmaceutical and food industries to blend powders and particulates.

The simulation was primarily created to accompany a corresponding physical model in a research laboratory.
A secondary motivation was to investigate Babylon.js as an alternative to Sketchfab for creating interactive 3D scenes for teaching and research.
In addition, I wanted to get more familiar with TypeScript development.

## Implementation

The simulation is implemented using TypeScript and the Babylon.js 3D engine.
The main scene consists of a horizontal, cylindrical chamber.
In the chamber, a polydispersed particle population is being mixed.
Particles collide with each other, the paddles and the chamber walls.
Classes of particles are coloured according to their size (small=black, medium=yellow, large=red).
A main camera can be moved to inspect the simulation.
An inset camera can be used to observe a top-down view of the mixing behaviour.
A slider (built using lil-gui) allows users to control the mixing speed in the chamber.

## Limitations

### Model

The geometrical modelling was done using Babylon.js primitives (cylinders, boxes, spheres) and Boolean operations (union, subtraction).
As no dedicated modelling software was used (e.g., Blender), the designs are rudimentary in nature.
Furthermore, there is not labelling of elements currently, as the scene was quickly prototyped for presentation purposes.

### Collisions

An array of invisible "backup" collision impostors extends around the central chamber to prevent particles escaping the main chamber — this is not perfect (particles may occasionally still escape) and probably not performant either.
It would be preferable to have better collision detection within the chamber.

### Performance

There are ~100 particles (with their own physics) being simulated and this may cause some frame-rate drops depending on your hardware.
In my most recent tests (browsers: Firefox, Chrome; computers: Lenovo Thinkpad, Lenovo P11 Plus) the frame-rate averaged 60-80 FPS with no noticeable dips.
It would be good to have an option for the user to adjust the number of particles in the scene to suit their device.

### Screen Orientation

The app should probably be locked to landscape orientation on mobile devices and does not transition well between orientations, usually requiring a refresh.

## Plans

- More detailed modelling (e.g., better motor, steel textures)
- Kill stray particles
- Add clickable/expandable annotations for different elements
- Establish some link with physical model (i.e., QR code) in laboratory
- Add more interactive elements (e.g., adjust particle numbers)
- Create other simulation "spokes" and link together in hub
- Refactor code for style consistency and less redundancy
- Add Loading screen (or fade in)
- Add license
- Add links to readme
