FROM ruby:2.1.6

ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY ./Gemfile $APP_HOME
RUN bundle install
COPY . $APP_HOME
RUN bundle exec rake db:setup

RUN useradd -r -U docker
RUN chown -R docker:docker $APP_HOME /usr/local/bundle

USER docker
