# Camaleon Docker

A Dockerized, ready to deploy implementation of Camaleon CMS with Rails 5.0. **WIP**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You'll need a machine running Docker and Docker Compose with Rails 5. I build this project on an Ubuntu 16.04 machine, but it is possible to run this project from Windows and Mac as well.

### Installing

If you don't want to build from scratch or follow this like a tutorial (see below for steps on how to recreate this repo), then simply clone this repository and run these commands:


```
docker-compose up -d db #Start up the database container
docker-compose run web rake db:setup #Set up the database, this does the database creation and schema load
docker-compose up #This starts up the whole thing - the complete app, which includes the web, db, and proxy
```
After these commands, simply point your browser to localhost and you'll be greeted with the Camaleon installer. Enjoy!

## Deployment

I want this to become a production ready repo for those out there who simply want a turn-key solution using docker. I'll get to this more later, but if you just clone this onto a server, change the virtual host name in the docker-compose.yml file, and then run "docker-compose up -d" you'll actually be able to access it on your server from the web. No guarantees on safety yet, but that works. If you'd like to help make this repo more robust or improve/get it into line with best practices, create a PR!

## How this Project was Built:

1. Install Rails, Docker
2. Add Camaleon to the App, and run the install generator. Update the system.json file, if desired.
3. Run rake db:migrate to initialize the db for camaleon.
4. Create the Dockerfile and .dockerigone so that we can begin dockerizing this application.
5. Add part for install json to Dockerfile
	- ignore the compiled assets in both docker and git
6. Navigate and set up your database.yml. In this example, I include EXAMPLE config. You'll want to change this for your own system and for security purposes as well. Don't pass the password through an ENV variable, that's asking for trouble. Update the 
7. Update the Puma config, at config/puma.rb to use the port 8080. That's what the proxy server is configured to use. You can go ahead an update the number of threads as well - I set it to be between 0 and 16 threads (unless you want to set this through an environment variable, which might be helpful in a larger-scale production environment). Also update the environments/production.rb

I'll make this a lot more detailed soon. This project is still a work in progress.

##TODO:

* [x] Install memcached, dalli for better caching
* [ ] Add redis for Rails
* [ ] Make production-ready so that users can easily deploy to a VPS/droplet/whatever or a docker host like heroku
* [ ] Make a blog post describing the details of how I made this.

## Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **William Payne** - *Initial work* - Github Organization: [PayneLabs](https://github.com/PayneLabs) External Site: [PayneLabs](http://paynelabs.io)

See also the list of [contributors](https://github.com/PayneLabs/camaleon-docker/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [rails-on-docker](https://github.com/neckhair/rails-on-docker) - Used his docker setup to build this one. Very helpful!
* [camaleon_cms](https://github.com/owen2345/camaleon-cms) - The actualy Camaleon repository. 