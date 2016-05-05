FROM ruby:2.1.6

RUN apt-get update && apt-get install -y \
    postgresql-client \
  && rm -rf /var/lib/apt/lists/*

ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY ./Gemfile $APP_HOME
COPY ./Gemfile.lock $APP_HOME
RUN bundle install
COPY . $APP_HOME

RUN useradd -r -U docker
RUN chown -R docker:docker $APP_HOME /usr/local/bundle

USER docker
