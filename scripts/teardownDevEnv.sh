echo "Stoping mysql..."
sudo mysql-ctl stop
echo "Stoping node..."
cd /home/ubuntu/workspace/eotg_api
killall node
echo "Stoping NGINX..."
sudo service nginx stop
echo "All services stopped!"
