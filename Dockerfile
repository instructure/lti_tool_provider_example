FROM ruby:2.1.6

RUN mkdir -p /usr/src/app
RUN useradd -r docker
RUN chown -R docker /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN bundle install
RUN chown -R docker /usr/local/bundle/gems

USER docker
