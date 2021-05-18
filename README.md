<p align="center">
    <a target="_blank" href="https://performer.plurid.cloud">
        <img src="https://raw.githubusercontent.com/plurid/performer/master/about/identity/performer-logo.png" height="250px">
    </a>
    <br />
    <br />
    <a target="_blank" href="https://github.com/plurid/performer/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    performer
</h1>


<h3 align="center">
    Cloud Service for Continuous Integration/Continuous Delivery Builder
</h3>



<br />



`performer` is a [service](https://performer.plurid.cloud) or self-hosted system task-runner/builder based on GitOps.

Specialized support for the runtimes

+ `NodeJS`

`performer` uses [plurid](https://github.com/plurid/plurid) to explore information as a 3D structure.


<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/performer/master/about/screenshots/ss-1.png" height="500px">
</p>



### Contents

+ [Install](#install)
+ [Usage](#usage)
+ [Building](#building)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## Install

run

``` bash
npm install @plurid/performer
```

or

``` bash
yarn add @plurid/performer
```

create a `server.js` file

``` typescript
import Performer from '@plurid/performer';


const performer = new Performer();

performer.start();
```

and run it

``` bash
node server.js
```

performer starts a server listening on port `56065` serving the performer UI on `/`, or which can receive GraphQL API requests on `/perform`.



## Usage

In order to use performer, once the installation setup is finished, launch the performer UI and

`Phase 0.⠀` — add `provider(s)`;

`Phase 1a.` — link `repositories`;

`Phase 1b.` — add `imagene(s)`;

`Phase 2.⠀` — setup `webhook(s)`;

`Phase 3.⠀` — generate `project(s)`;

`Phase 4.⠀` — store `secret(s)`;

`Phase 5.⠀` — generate `trigger(s)`;

`Phase 6.⠀` — generate `deployer(s)`;

——— `performer` setup finished ———

`Phase 7.⠀` — code in the local repositories (linked at `Phase 1a`);

`Phase 8.⠀` — push to branch listened by trigger (`Phase 5`);

`Phase 9.⠀` — `performer` will automatically handle the builds and deploys based on the specified repositories, webhooks, triggers, and deployers;

`Phase 10.` — once `performer` finishes the build and deploy, run `git fetch origin` and `git pull` to update the local repositories.


### Trigger example

``` yaml
stages:
- name: 'Name of the Stage'
  directory: '/path/of/the/directory/to/work/in'
  imagene: 'image-name-to-run-in-the-container'
  command: 'run a command'
  environment:
  - 'LIST=of-environment-variables'
  secretsEnvironment:
  - 'SECRET'

- name: 'Deploy'
  imagene: 'deployer'
  id: 'deployer-id'

timeout: 720s

secrets:
- 'SECRET'

nodejs:
  cacheModulesActive: true # cache node_modules and .lock files for faster container creation
  cacheModulesTime: 5h # interger + 'h' for hours or 'forever'
```


### Deployer example

``` yaml
- name: 'Generate Latest Deployment'
  directory: '/path/of/the/directory/to/work/in'
  imagene: 'ubuntu'
  command: [
    '/bin/bash',
    '-c',
    'sed "s/COMMIT_SHA/${SHORT_SHA}/g" Deployment.template.yaml > Deployment.latest.yaml'
  ]

- name: 'Deploy Latest Imagene'
  directory: '/path/of/the/directory/to/work/in'
  imagene: 'kubectl'
  command: [
    'apply',
    '-f',
    'Deployment.latest.yaml'
  ]
```



## Building

``` bash
docker build --file ./configurations/production.dockerfile \
    --tag performer \
    --build-arg PORT= \
    --build-arg PERFORMER_QUIET= \
    --build-arg PERFORMER_LOG_LEVEL= \
    --build-arg DOCKER_AUTH_USERNAME= \
    --build-arg DOCKER_AUTH_PASSWORD= \
    --build-arg DOCKER_AUTH_SERVER_ADDRESS= \
    --build-arg PERFORMER_DATABASE_TYPE= \
    --build-arg PERFORMER_STORAGE_TYPE= \
    --build-arg PERFORMER_STORAGE_BUCKET= \
    --build-arg PERFORMER_STORAGE_ROOT_PATH= \
    --build-arg PERFORMER_BASE_PATH= \
    --build-arg PERFORMER_AWS_API_VERSION= \
    --build-arg PERFORMER_AWS_REGION= \
    --build-arg PERFORMER_AWS_ACCESS_KEY_ID= \
    --build-arg PERFORMER_AWS_SECRET_ACCESS_KEY= \
    --build-arg GOOGLE_APPLICATION_CREDENTIALS= \
    --build-arg PERFORMER_CUSTOM_LOGIC= \
    --build-arg PERFORMER_PRIVATE_USAGE= \
    --build-arg PERFORMER_PRIVATE_OWNER_IDENTONYM= \
    --build-arg PERFORMER_PRIVATE_OWNER_KEY= \
    --build-arg PERFORMER_PRIVATE_TOKEN= \
    --build-arg PERFORMER_IN_CONTAINER_USAGE= \
    --build-arg PERFORMER_IN_CONTAINER_HOST_BIND= \
    .
```

`performer` uses by default [`delog`](https://github.com/plurid/delog) for logging purposes.

In order to configure `performer` with `delog` pass the following required build arguments

```
    --build-arg USE_DELOG=true \
    --build-arg DELOG_ENDPOINT= \
    --build-arg DELOG_TOKEN= \
```

or customize the `delog` through any other build arguments

```
    --build-arg DELOG_GROUND_LEVEL= \
    --build-arg DELOG_FORMAT= \
    --build-arg DELOG_PROJECT= \
    --build-arg DELOG_SPACE= \
```



## Packages

<a target="_blank" href="https://www.npmjs.com/package/@plurid/performer">
    <img src="https://img.shields.io/npm/v/@plurid/performer.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/performer][performer-server] • the server application

[performer-server]: https://github.com/plurid/performer/tree/master/packages/performer-server


<a target="_blank" href="https://www.npmjs.com/package/@plurid/performer-cli">
    <img src="https://img.shields.io/npm/v/@plurid/performer-cli.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/performer-cli][performer-cli] • the command-line interface

[performer-cli]: https://github.com/plurid/performer/tree/master/packages/performer-cli


<a target="_blank" href="https://www.npmjs.com/package/@plurid/performer-requests">
    <img src="https://img.shields.io/npm/v/@plurid/performer-requests.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/performer-requests][performer-requests] • the API requests

[performer-requests]: https://github.com/plurid/performer/tree/master/packages/performer-requests



## [Codeophon](https://github.com/ly3xqhl8g9/codeophon)

+ licensing: [delicense](https://github.com/ly3xqhl8g9/delicense)
+ versioning: [αver](https://github.com/ly3xqhl8g9/alpha-versioning)
