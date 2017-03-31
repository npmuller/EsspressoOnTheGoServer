echo "Starting mysql..." >> /usr/local/eotg-server/api/logs/server-log.txt
service mysql start >> /usr/local/eotg-server/api/logs/server-log.txt
echo "Starting nginx..." >> /usr/local/eotg-server/api/logs/server-log.txt
service nginx start >> /usr/local/eotg-server/api/logs/server-log.txt
#cd /usr/local/eotg-server/api/
#npm start
