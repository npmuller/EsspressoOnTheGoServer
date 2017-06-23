# Esspresso On The Go Web Server
Web server for an [Espresso on the Go](http://espressotg.info) (EOTG) device, a Spring 2017 ECE Senior Design project at Georgia Tech.
Find all the usage documentation you need [here](http://espressotg.info/team-docs/EOTG_API.pdf).

## Configuration
This repository does not contain a config file, so before you run the server you must create one at <EOTG_TOP_LEVEL_DIR>/config/config.json.  Your config file should consit of a wrapper json object that contains at least one JSON object called "production," like so:

    {
        "production": {
            "username": "<db_username>",
            "password": "<db_password>",
            "database": "brew", // NOTE: this value should not change in your config file
            "port": <configured_port>,
            "dburl": "<db_url>"
        }
    }
    
 ## Upstart Job
 Since node.js does not run as a service on its own, we created an upstart job to run our server for us.  This script runs the EOTG server on startup and restart, and respawns it up to 5 times a minute before it dies permanently.  For more info about writing upstart scripts, head over [here](http://upstart.ubuntu.com/getting-started.html).  Otherwise, just blantenly steal ours:
 
    description "Espresso on the Go Web Server"
    author "Nathan Muller"
    start on runlevel [2345]
    
    pre-start script
        echo "[`date`] EOTG Web Server starting..." >> /usr/local/eotg-server/api/logs/server-log.txt
        exec sudo -u root service mysql restart
        exec sudo -u root service nginx restart
    end script
    
    post-stop script
        echo "[`date`] EOTG Web Server stoping..." >> /usr/local/eotg-server/api/logs/server-log.txt
    end script
    
    script
        cd /usr/local/eotg-server/api/
        npm start >> /usr/local/eotg-server/api/logs/server-log.txt 2>&1
    end script
    respawn
    respawn limit 5 60
    
## nginx configuration
Nothing super special, just make sure you forward all your requests to the right port!

Have fun, hopefully you can make the hardware work.  We sure couldn't!
