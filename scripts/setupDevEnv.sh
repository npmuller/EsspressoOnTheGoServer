echo "Starting mysql..."
sudo mysql-ctl start
echo "Starting NGINX..."
sudo service nginx start
echo "Starting node..."
cd /home/ubuntu/workspace/eotg_api/
node server.js