<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/performer/master/about/identity/performer-logo.png" height="250px">
    <br />
    <a target="_blank" href="https://github.com/plurid/performer/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>



<h1 align="center">
    performer
</h1>


<h3 align="center">
    Cloud-Native Continuous Integration/Continuous Delivery Build Pipeline
</h1>


Performer is a build system specialized for the `NodeJS` runtime.



### Contents

+ [Install](#install)
+ [Usage](#usage)
    + [Setup](#setup)
    + [Command-Line Interface](#command-line-interface)
+ [Packages](#packages)



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

1. Connect the server to one or more repositories

2. Create a trigger for one of the repositories, given a specific path for the build file, and a specific path to listen for changes

3. Write a build file with one or more stages

``` yaml
stages:
- name: 'Name of the Stage'
  repository: 'name-of-registered-repository'
  directory: '/path/of/the/directory/to/work/in'
  image: 'image-name-to-run-in-the-container'
  command: 'run a command'
  environment:
  - 'LIST=of-environment-variables'
  secretsEnvironment:
  - 'LIST=of-variables-to-be-inserted-from-the-secrets'

timeout: 720s

secrets:
- keychain: 'name-of-keychain'
  secrets:
    KEY: 'base64-encrypted-key'

nodejs:
  storeModulesActive: true # saves node_modules and .lock files for faster container creation
  storeModulesTime: 5h
```

4. Push a change to the repository.


### Setup

### Command-Line Interface

Options:

    -v, --version                   output the version number

    -h, --help                      display help for command

Commands:



## Packages


<a target="_blank" href="https://www.npmjs.com/package/@plurid/performer">
    <img src="https://img.shields.io/npm/v/@plurid/performer.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/performer][performer] • the server application

[performer]: https://github.com/plurid/datasign/tree/master/packages/performer
