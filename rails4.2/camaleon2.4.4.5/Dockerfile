# Build from the Ruby 2.4 slim linux image for the base box, which is built on Debian Jesse.
FROM ruby:2.4-slim
LABEL maintainer="William Payne <will@paynelabs.io>"

#Create the directory from which the production code will be hosted
ENV APP_DIR=/usr/
# Set the rails environment early on, so that all processes are done with production settings
ENV RAILS_ENV=production
# Set the port to serve this application by Puma
ENV PORT=8080

# Install the basic dependencies for building rails-based applications
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y build-essential tzdata libmysqlclient-dev nodejs curl git libsqlite3-dev

RUN mkdir -p $APP_DIR

WORKDIR $APP_DIR

# Install rails. 
RUN gem install rails -v 4.2 --no-rdoc --no-ri

# Create a new rails app, but skip the bundle because we're going to add some gems.
RUN rails new camaleon --skip-bundle

# Change the working directory to where the rails root actually is.
WORKDIR $APP_DIR/camaleon

# Copy the database settings
COPY database.yml ./config/

# Production configuration
COPY production.rb ./config/environments/

# Install necessary gems
RUN bundle add camaleon_cms -v "2.4.4.5"
RUN bundle install --without development test -j4
RUN bundle add dalli
RUN bundle add json
RUN bundle add mysql2
RUN bundle add draper

# Generate the Camaleon files
RUN rails generate camaleon_cms:install

#Configuration file for Camaleon, which allows more customization
COPY system.json ./config/

# Finally, precompile the asset pipeline
RUN bundle exec rake assets:precompile

# Publish port 8080, because that's the port that nginx-proxy looks for. Be sure this is configured in your config/puma.rb file if you're recreating this repo.
EXPOSE 8080