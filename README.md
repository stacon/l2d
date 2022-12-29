# L2D (Link to Documentation)

Connect codebase with documentation easily

## Highlights

[L2D] is a VSCode extension which provides the ability for your files and codebase to be linked with documentation.

Based on your file name or file path segment you can provide links on File level

<img src="https://raw.githubusercontent.com/stacon/l2d/develop--v.1.0.2/images/readme/app-vue-example.png" alt="">

_Image #1_

This can be achieved through the following configuration `l2d.config.json`

<img src="https://raw.githubusercontent.com/stacon/l2d/develop--v.1.0.2/images/readme/first-config-example.png" alt="">

_Image #2_

- `App.vue` works as a filepath matcher
- `link` is the external url which will be redirected if the lens indication is clicked
- `description` is the string that will be included on the lens like `# L2D: {description} #` as shown on the first image (Image #1)

## Configuration requirements and breakdown

The configuration file must be at the top project level and should be named `l2d.config.json`.
