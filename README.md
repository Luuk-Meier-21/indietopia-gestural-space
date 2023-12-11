# Project issues

ES imports need a staring point of `/` or `./`, otherwise Rollup failed the deploymend build. https://stackoverflow.com/questions/67696920/vite-rollup-failed-to-resolve-build-error
`import { ExternalType, logExternal } from "./external"`;
