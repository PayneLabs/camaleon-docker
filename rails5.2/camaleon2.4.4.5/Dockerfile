# Build from the Ruby 2.5 slim linux image for the base box, which is built on Debian Jesse.
FROM ruby:2.5-slim
LABEL maintainer="William Payne <will@paynelabs.io>"

#Create the directory from which the production code will be hosted
ENV APP_DIR=/usr/
# Set the rails environment early on, so that all processes are done with production settings
ENV RAILS_ENV=production
# Set the port to serve this application by Puma
ENV RAILS_SERVE_STATIC_FILES=true
ENV PORT=8080

# Install the basic dependencies for building rails-based applications
RUN apt-get update && apt-get upgrade -y && apt-get install -yf build-essential tzdata curl git advancecomp gifsicle jhead jpegoptim libjpeg-progs optipng pngcrush pngquant libsqlite3-dev default-libmysqlclient-dev


RUN curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN npm install -g svgo

RUN mkdir -p $APP_DIR

WORKDIR $APP_DIR

# Install rails. 
RUN gem install rails -v 5.2 --no-rdoc --no-ri
RUN gem install sqlite3
# Create a new rails app, but skip the bundle because we're going to add some gems.
RUN rails new camaleon --skip-bundle

# Change the working directory to where the rails root actually is.
WORKDIR $APP_DIR/camaleon

# Copy the database settings
COPY database.yml ./config/

# Production configuration
COPY production.rb ./config/environments/

# Install necessary gems
RUN bundle inject camaleon_cms "2.4.4.5"
RUN bundle inject dalli "2.7.8"
RUN bundle inject json "2.1.0"
RUN bundle inject mysql2 "0.5.2"
RUN bundle inject draper "3.0"
RUN bundle install --without development test -j4

# Generate the Camaleon files
RUN rails generate camaleon_cms:install

#Configuration file for Camaleon, which allows more customization
COPY system.json ./config/

# Finally, precompile the asset pipeline
RUN bundle exec rake assets:precompile

# Publish port 8080, because that's the port that nginx-proxy looks for. Be sure this is configured in your config/puma.rb file if you're recreating this repo.
EXPOSE 8080

CMD ["bundle", "exec", "puma -C config/puma.rb"]