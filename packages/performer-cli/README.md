<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/performer/master/about/identity/performer-logo.png" height="250px">
    <br />
    <a target="_blank" href="https://www.npmjs.com/package/@plurid/performer-cli">
        <img src="https://img.shields.io/npm/v/@plurid/performer-cli.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
    </a>
    <a target="_blank" href="https://github.com/plurid/performer/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>



<h1 align="center">
    performer · command-line interface
</h1>


<h3 align="center">
    Cloud-Native Continuous Integration/Continuous Delivery Builder
</h1>


[Performer](https://github.com/plurid/performer) is a service or self-hosted system task-runner/builder based on GitOps.

Specialized support for the runtimes

+ `NodeJS`

Performer uses [plurid](https://github.com/plurid/plurid) to explore information as a 3D structure.


<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/performer/master/about/screenshots/ss-1.png" height="500px">
</p>



### Contents

+ [Install](#install)
+ [Usage](#usage)
+ [Packages](#packages)



## Install

To install the `performer-cli` globally, run

``` bash
npm install -g @plurid/performer-cli
```



## Usage


```
Usage: performer <command>

Options:
  -v, --version          output the version number
  -h, --help             display help for command

Commands:
  status                 show the connection status
  login [options]        login into a performer server using the identonym and the key
  logout                 log out of the performer server
  add                    add an existing, external entity
  link                   link an existing, external entity
  setup                  setup an entity
  store                  store an entity
  generate               generate an entity
  get                    get one or more entities
  obliterate             obliterate one or more entities
  register <files...>    register entities from one or more files
  deregister <files...>  deregister entities from one or more files
```



## Packages


<a target="_blank" href="https://www.npmjs.com/package/@plurid/performer">
    <img src="https://img.shields.io/npm/v/@plurid/performer.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/performer][performer-server] • the server application

[performer-server]: https://github.com/plurid/datasign/tree/master/packages/performer-server


<a target="_blank" href="https://www.npmjs.com/package/@plurid/performer-cli">
    <img src="https://img.shields.io/npm/v/@plurid/performer-cli.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/performer-cli][performer-cli] • the command-line interface

[performer-cli]: https://github.com/plurid/datasign/tree/master/packages/performer-cli


<a target="_blank" href="https://www.npmjs.com/package/@plurid/performer-requests">
    <img src="https://img.shields.io/npm/v/@plurid/performer-requests.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/performer-requests][performer-requests] • the API requests

[performer-requests]: https://github.com/plurid/datasign/tree/master/packages/performer-requests
