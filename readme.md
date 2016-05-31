# Example LTI Tool Provider Using ims-lti Gem

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

This is a basic and simple LTI Tool Provider that uses the
[ims-lti](https://github.com/instructure/ims-lti) 2.0.0.beta gem.

To get this running in your development environment, check out the repo then:

    bundle install
    bundle exec rake db:create
    bundle exec rake db:migrate
    bundle exec rake db:seed
    bundle exec rails s

To get this running with Docker, follow these steps:

  $ cp docker-compose/config/* config/
  $ docker-compose build
  $ docker-compose run --rm lti-test-tool bundle install
  $ docker-compose run --rm lti-test-tool bundle exec rake db:create
  $ docker-compose run --rm lti-test-tool bundle exec rake db:migrate
  $ docker-compose run --rm lti-test-tool bundle exec rake db:seed
  $ docker-compose up

You can add the tool to a tool consumer with the the '/tool_proxy' endpoint
