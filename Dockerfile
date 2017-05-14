# Build from the Alpine linux image for the base box.
FROM ruby:2.3
MAINTAINER William Payne <will@paynelabs.io>

ENV APP_DIR=/usr/
ENV RAILS_ENV=production

# Install the basic dependencies for building rails-based apps.
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y tzdata libmysqlclient-dev nodejs curl git

RUN mkdir -p $APP_DIR

WORKDIR $APP_DIR

RUN gem install rails -v 5.0.1 --no-rdoc --no-ri

RUN rails new camaleon --skip-bundle
WORKDIR $APP_DIR/camaleon



COPY Gemfile ./Gemfile
COPY config/database.yml ./config/
COPY config/puma.rb ./config/
COPY config/application.rb ./config/application.rb

RUN echo "gem \"camaleon_cms\",  '>= 2.4.3.5'" >> Gemfile

RUN bundle install --without development test -j4


RUN rails generate camaleon_cms:install

# Finally, precompile the asset pipeline
RUN RAILS_ENV=production bundle exec rake assets:precompile

RUN chown -R nobody:nogroup $APP_DIR/camaleon
USER nobody
RUN cat ./config/puma.rb

# Publish port 8080, because that's the port that nginx-proxy looks for. Be sure this is configured in your config/puma.rb file if you're recreating this repo.
EXPOSE 8080