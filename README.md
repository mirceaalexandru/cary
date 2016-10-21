# Server

## Purpose

This project is a WIP for building a starting point for any project that requires:
 * authentication
 * authorization - TBD
 * job execution using external microservices or/and Lambda functions.
 * communication between microservices and other components is done using SNS/SQS
 * MongoDB (in the near future also PostgreSQL/others)
 
## Architecture

![Diagram](https://github.com/mirceaalexandru/hapi-server-frame/blob/master/doc/arhitecture.png)

## Plugins

 * [server-frame-auth](https://github.com/mirceaalexandru/server-frame-auth) - Authentication plugin
 * [server-frame-mongo](https://github.com/mirceaalexandru/server-frame-mongo) - Mongo DB plugin
 * [server-frame-utils](https://github.com/mirceaalexandru/server-frame-utils) - Utility plugin
 * [server-frame-lambda](https://github.com/mirceaalexandru/server-frame-lambda) - Lambda functions that are used by this project.
