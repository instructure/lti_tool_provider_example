# Example LTI Tool Provider Using ims-lti Gem

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

This is a basic and simple LTI Tool Provider that uses the
[ims-lti](https://github.com/instructure/ims-lti) 2.0.0.beta gem.
It currently only supports LTI2 launches

To get this running in your development environment, check out the repo then:

    bundle install
    bundle exec rake db:setup
    bundle exec rails s


You can add the tool to a tool consumer with the the '/tool_proxy' endpoint
