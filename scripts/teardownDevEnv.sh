echo "Stoping mysql..."
sudo mysql-ctl stop
echo "Stoping node..."
cd /home/ubuntu/workspace/www/jitterbugs/api/eotg/
killall node
echo "Stoping NGINX..."
sudo service nginx stop
echo "All services stopped!"
