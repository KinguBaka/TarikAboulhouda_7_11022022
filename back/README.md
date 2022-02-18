initialisation du back : 
    --> depuis la racide du back : ../TarikAboulhouda_7_11022022/back

"npm init" : Installation des dépendences

"nodemon" : Lancement sur le port 3000 par default

API nodejs / express & BDD basé sur MySQL

Routes & requêtes :

"http://localhost:3000/api" + 

Users

POST --> /signup : Enregistrer un utilisateur. Champ : email(obligatoire),password(obligatoire),username(obligatoire),bio(optionnel)

POST --> /login : Se connecter avec un utilisateur. Champ : email,password
    --> Renvoi l'id de l'utilisateur ainsi que son Bearer Token valable 12h

GET --> /me : Renvoi les informations de l'utilisateur connecté.
    --> Renvoi l'id,l'email,l'username,la bio,et si l'utilisateur est Admin

GET --> /user/:id : Renvoi les informations de l'utilisateur concerné.
    --> Renvoi l'id et username de l'utilisateur renseigné

PUT --> /me : Modifie le(s) champ(s) selectionné(s). Champ : email, username, password, bio

DELETE --> /me : Supprime l'utilisateur de la bdd ainsi que tout ses posts et commentaires

        ------------------------------------------------


Posts

POST --> /post/publish : Ajoute un post dans la bdd. Champ : title(obligatoire), content(obligatoire), attachment(optionnel)

GET --> /post/all : Renvoi tout les post de la bdd.
    --> Renvoi tout les posts ainsi que leurs informations

GET --> /user/:id/post : Renvoi les posts de l'utilisateur concerné.
    --> Renvoi tout les posts ainsi que leurs informations de l'utilisateur concerné

PUT --> /post/:id : Modifie le post selectionné. Champ : title, content, attachment

PUT --> /post/:id/like : Ajoute un like et l'id de l'utilisateur dans les UsersLiked du post. Champ like(1 ou 0)

DELETE --> /post/:id : Supprime le post selectionné ainsi que tout ses commentaires de la bdd.

        -------------------------------------------------


Comments

POST --> /post/:idPost/comment/publish : Ajoute un commentaire dans la bdd. Champ : content(obligatoire)

GET --> /post/:idPost/comment : Renvoi tout les commentaire du post.
    --> Renvoi tout les commentaires du post ainsi que leur informations

PUT --> /post/:idPost/comment/:idComment : Modifie le commentaire selectionné Champ : content

DELETE --> /post/:idPost/comment/:idComment : Supprime le commentaire selectionné de la bdd.
