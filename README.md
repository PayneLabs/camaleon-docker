# Camaleon Docker

A Dockerized, ready to deploy implementation of Camaleon CMS with Rails 5.0. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You'll need a machine running Docker and Docker Compose with Rails 5. I built this project on an Ubuntu 16.04 machine, but it is possible to run this project from Mac and Windows as well, provided you have a VM environment configured that can run docker.

### Installing Locally

```
docker-compose up -d db #Start up the database container
docker-compose run web rake db:setup #Set up the database, this does the database creation and schema load
docker-compose up #This starts up the whole thing - the complete app, which includes the web, db, and reverse proxy
```
After these commands, simply point your browser to localhost and you'll be greeted with the Camaleon installer. Enjoy!

## Deployment to Production

I want this to become a production ready repo for those out there who simply want a turn-key solution using docker. I'll get to this more later, but if you just clone this onto a server, change the virtual host name in the docker-compose.yml file, and then run "docker-compose up -d" you'll actually be able to access it on your server from the web. No guarantees on safety yet, but that works. If you'd like to help make this repo more robust or improve/get it into line with best practices, create a PR!

## Environment Variables

There are a number of environment variables in the Docker Compose file that help with configuration and extensibility. 

```
DB_MYSQL_ROOT_PASSWORD: the password to your database container's root user.
DB_MYSQL_HOST: the name of the host container in the Docker Compose file. These environment variable is needed by database.yml in the rails application, which species database connection details.

SECRET_KEY_BASE: a hallmark of Rails applications, this is needed by Rails for security purposes and should be generated using a random generator. The best way to generate this is with a OpenSSL: openssl rand -hex 64

VIRTUAL_HOST: when using jwilder/nginx-proxy, this environment variable is used for generating the NGinX configuration. This should be your registered domain name. 
```

### How to deploy this project to production on a VPS or Dedicated Server

1. Clone the project onto your server

```
git clone https://github.com/PayneLabs/camaleon-docker.git
```

2. Modify your docker-compose.yml file
  - Change the database passwords
  - Change the Virtual Host to your host name. Multiple hosts can be separated with commas, i.e. www.example.com,example.com. (See https://github.com/jwilder/nginx-proxy for details on using nginx proxy)

3. Pull and run the containers with docker-compose

```
docker-compose pull
docker-compose up -d db
docker-compose run web rake db:setup
docker-compose up -d
```

4. Navigate to your domain, and the Camaleon installer should appear. That's it!

5. If you want to run another Camaleon install, or have other docker containers running on your machine, simply remove the nginx proxy container from the docker-compose.yml. You only need one nginx-proxy container running on the machine. Remember, Camaleon has support for multiple domains, so you can simply add new domains to your docker-compose.yml file like so:

```
VIRTUAL_HOST: www.example.com,example.com,www.example2.com,example2.com
```
Then, you'll be able to access the new domains through the single control panel on your site. Be sure to enter the information for the new domain in your Camaleon admin panel first.

6. To add a custom theme to your Camaleon Docker image, follow these steps:

  1. Add the theme you want as a submodule in Git by running:

```
  git submodule add https://github.com/PayneLabs/FoundationCama
```

  2. Copy the newly cloned repository into your container:

```
  COPY ./FoundationCama $APP_DIR/camaleon/app/apps/themes/FoundationCama
```

  See the examples for other ways to import your theme.


## How this Project was Built:

1. Install Rails, Docker
2. Add Camaleon to the App, and run the install generator. Update the system.json file, if desired.
3. Run rake db:migrate to initialize the db for camaleon.
4. Create the Dockerfile and .dockerigone so that we can begin dockerizing this application.
5. Add part for install json to Dockerfile
	- ignore the compiled assets in both docker and git
6. Navigate and set up your database.yml. In this example, I include EXAMPLE config. You'll want to change this for your own system and for security purposes as well. Don't pass the password through an ENV variable, that's asking for trouble. Update the 
7. Update the Puma config, at config/puma.rb to use the port 8080. That's what the proxy server is configured to use. You can go ahead an update the number of threads as well - I set it to be between 0 and 16 threads (unless you want to set this through an environment variable, which might be helpful in a larger-scale production environment). Also update the environments/production.rb file.

I'll make this a lot more detailed soon. This project is still a work in progress.

##TODO:

* [x] Install memcached and dalli for better caching and better load speeds.
* [ ] Add Redis for better cabling.
* [ ] Make production-ready so that users can easily deploy to a VPS/droplet/whatever or a docker host like heroku
* [ ] Make a blog post describing the details of how I made this.
* [ ] Make this project compatible with docker swarm and include instructions on how to use it.
* [ ] Push this project as a container to docker hub.
* [ ] Add the configuration for Postgres in production.

## Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **William Payne** - *Initial work* - Github Organization: [PayneLabs](https://github.com/PayneLabs) External Site: [PayneLabs](http://paynelabs.io)

See also the list of [contributors](https://github.com/PayneLabs/camaleon-docker/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* [camaleon_cms](https://github.com/owen2345/camaleon-cms) - The actual Camaleon repository. 
* [nginx-proxy](https://github.com/jwilder/nginx-proxy) - The proxy container that was used in rails-on-docker example and that is used in this project.