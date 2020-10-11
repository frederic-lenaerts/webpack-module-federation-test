# Test: Webpack 5 Module Federation

Open three terminal windows and execute te following commands in the first two:

```bash
yarn start-module-a
```
```bash
yarn start-module-b
```

Wait for the build to complete and het http-server to start.  
Then execute following command in the final window:

```bash
yarn start-root
```

Open localhost:5000 to see the root app with federated modules from A and B.