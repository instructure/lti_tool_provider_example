FROM ruby:2.1.6

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN useradd -r -U docker
RUN chown -R docker:docker /usr/src/app

RUN bundle install
RUN chown -R docker:docker /usr/local/bundle/gems

RUN bundle exec rake db:setup

USER docker
