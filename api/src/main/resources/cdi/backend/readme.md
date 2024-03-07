
## Comment utiliser le dockerfile

1. Vous devez builder votre application en .jar (mvn clean package dans intellij et utiliser ctrl+ enter pour executer)
2. Vous devez ensuite le copier ici au même niveau que le dockerfile
3. Finalement modifier le dockerfile pour exposer le port qu'expose votre application (voir server.port du fichier application.properties)

Une fois que le tout est en ordre, simplement builder l'image,
le code d'exemple dans script/build_api.sh est pour linux
Pour window voir avec docker desktop
