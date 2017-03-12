# README

TODO:
1. Install memcached, dalli for better caching
2. Add redis for Rails
3. Make production-ready so that users can easily deploy to a VPS/droplet/whatever or a docker host like heroku





# Camaleon Docker

A Dockerized, ready to deploy implementation of Camaleon CMS with Rails 5.0.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You'll need a machine running Docker and Docker Compose with Rails 5. I build this project on an Ubuntu 16.04 machine, but it is possible to run this project from Windows and Mac as well.

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```



End with an example of getting some data out of the system or using it for a little demo



## Deployment

Add additional notes about how to deploy this on a live system

## How this Project was Built:

1. Install Rails, Docker
2. Add Camaleon to the App, and run the install generator. Update the system.json file, if desired.
3. Run rake db:migrate to initialize the db for camaleon.
4. Create the Dockerfile and .dockerigone so that we can begin dockerizing this application.
4. Add part for install json to Dockerfile
	- ignore the compiled assets in both docker and git
4. Navigate and set up your database.yml. In this example, I include EXAMPLE config. You'll want to change this for your own system and for security purposes as well. Don't pass the password through an ENV variable, that's asking for trouble.
5. Update the Puma config, at config/puma.rb to use the port 8080. That's what the proxy server is configured to use. You can go ahead an update the number of threads as well - I set it to be between 0 and 16 threads (unless you want to set this through an environment variable, which might be helpful in a larger-scale production environment).
6. Update your hosts configuration file - /etc/hosts to point camaleon.docker to 127.0.0.1 so that you can navigate to your site. Alternatively

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [rails-on-docker](https://github.com/neckhair/rails-on-docker) - Used his docker setup to build this one. Very helpful!
* [camaleon_cms]() 