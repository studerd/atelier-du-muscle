#i!bin/bash
sudo certbot certonly --standalone -d api.atelierdumuscle.be -d www.api.atelierdumuscle.be
sudo certbot certonly --standalone -d admin.atelierdumuscle.be -d www.admin.atelierdumuscle.be
sudo certbot certonly --standalone -d atelierdumuscle.be -d www.atelierdumuscle.be
sudo certbot certonly --standalone -d dev.atelierdumuscle.be -d www.dev.atelierdumuscle.be