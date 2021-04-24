# Front End Migration

## Install the needed tool dependencies

```shell
yarn add -D typescript ts-migrate
```

## Create a tsconfig.json

This is the one CRA outputs

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "downlevelIteration": true,
    "jsx": "react-jsx",
    "baseUrl": "./src"
  },
  "include": ["src"]
}
```

## Install all the @types packages you can

This is project by project, but solid starting point is to grab all your dependencies, add `@types/...` and run the install.
Adding the `;` in-between each `yarn` command allows for the command to fail, and not stop installing. This is an easy way to just try to install your dependencies' types without researching if they have a types package first.

```shell
yarn add -D @types/react-lazyload ; \
; yarn add -D @types/react-redux \
; yarn add -D @types/react-router-bootstrap
```
