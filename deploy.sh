pnpm run build
if [ ! -d /var/www/dns-selector ];then mkdir /var/www/dns-selector;elif [[ -n $(ls /var/www/dns-selector) ]];then rm -r /var/www/dns-selector/*;fi
cp -r ./dist/* /var/www/dns-selector/
#scp -r dist/* root@39.101.151.195:/var/www/dns-selector/
nginx -s reload
