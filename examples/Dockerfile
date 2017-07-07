FROM wpayne/camaleon-docker
MAINTAINER William Payne <will@paynelabs.io>


# Clone in custom theme
COPY ./custom-theme /usr/camaleon/app/apps/themes/custom-theme


# Finally, precompile the asset pipeline
RUN bundle exec rake assets:precompile

RUN chown -R nobody:nogroup $APP_DIR/camaleon
USER nobody

# Publish port 8080, because that's the port that nginx-proxy looks for. Be sure this is configured in your config/puma.rb file if you're recreating this repo.
EXPOSE 8080