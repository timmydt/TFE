// Premier point d'API pour envoyer le mail
// Rajouter un champ resetPasswordToken et resetPasswordTokenExpiration dans l'user
// Quand l'user veut un nouveau mot de passe, on set le nouveau token, et l'expiration avec date actuelle+10mn
// On envoie le mail

// Second point d'API pour reset le mdp
// Avec une url du type //reset/{token}
// On cherche l'user avec le token dans l'url
// On check si la date d'expiration est passé
// Si oui on jette l'user
// Si non on rehash le password, on reset le token et la date et on update l'user