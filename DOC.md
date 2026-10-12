# Documentation API REST — Express Backend

**Base URL** : `http://localhost:3000`

> **Authentification** : les routes d'écriture de `/products` (`POST`, `PUT`, `DELETE`) exigent un token JWT dans l'en-tête `Authorization: Bearer <token>`. Le token s'obtient via `POST /auth/login`. Voir [TUTO_AUTHENTIFICATION_JWT.md](TUTO_AUTHENTIFICATION_JWT.md).

---

## Routes `/auth`

### Inscription (publique)

```
POST /auth/register
Content-Type: application/json
```

```json
{ "username": "alice", "password": "secret1234" }
```

`username` : 3 caractères minimum. `password` : 8 caractères minimum. Le rôle attribué est toujours `user`.

**Réponse** `201` : `{ "id": "2", "username": "alice", "role": "user" }`
**Réponse** `400` : champ manquant ou trop court
**Réponse** `409` : `{ "message": "Ce nom d'utilisateur est déjà utilisé" }`

---

### Connexion (publique)

```
POST /auth/login
Content-Type: application/json
```

```json
{ "username": "admin", "password": "admin123" }
```

**Réponse** `200` : `{ "token": "<jwt>", "user": { "id": "1", "username": "admin", "role": "admin" } }`
**Réponse** `401` : `{ "message": "Identifiants invalides" }`

Compte de démonstration créé au démarrage : `admin` / `admin123`.

---

### Profil connecté (protégée)

```
GET /auth/me
Authorization: Bearer <token>
```

**Réponse** `200` : `{ "id": "1", "username": "admin", "role": "admin" }`
**Réponse** `401` : `{ "message": "Token manquant" }`, `"Token invalide"` ou `"Token expiré"`

---

### Product

| Champ         | Type     | Description                     |
|---------------|----------|---------------------------------|
| `id`          | `string` | Identifiant unique (auto-généré)|
| `name`        | `string` | Nom du produit (unique)         |
| `description` | `string` | Description du produit          |
| `price`       | `number` | Prix en euros                   |
| `category`    | `string` | Catégorie du produit            |
| `stock`       | `number` | Quantité en stock               |

---

## Routes `/products`

### Lister tous les produits

```
GET /products
```

**Réponse** `200` : tableau de `Product[]`

---

### Récupérer un produit par ID

```
GET /products/:id
```

| Paramètre | Type     | Description            |
|-----------|----------|------------------------|
| `id`      | `string` | Identifiant du produit |

**Réponse** `200` : objet `Product`
**Réponse** `404` : `{ "message": "Produit non trouvé" }`

---

### Récupérer un produit par nom

```
GET /products/name/:name
```

| Paramètre | Type     | Description       |
|-----------|----------|-------------------|
| `name`    | `string` | Nom du produit    |

**Réponse** `200` : objet `Product`
**Réponse** `404` : `{ "message": "Produit non trouvé" }`

---

### Récupérer les catégories

```
GET /products/categories
```

**Réponse** `200` : tableau de `string[]`

---

### Filtrer les produits par catégorie

```
GET /products/category/:category
```

| Paramètre  | Type     | Description                |
|------------|----------|----------------------------|
| `category` | `string` | Catégorie du produit       |

**Catégories disponibles** : `informatique`, `smartphone`, `audio`, `accessoire`, `tablette`, `stockage`, `tv`, `gaming`, `photo`, `composant`, `wearable`, `maison`, `réseau`, `mobilier`

**Réponse** `200` : tableau de `Product[]`

---

### Vérifier si un produit existe

```
GET /products/exists/:name
```

**Réponse** `200` : `true` ou `false`

---

### Compter le nombre total de produits

```
GET /products/count/total
```

**Réponse** `200` : `number`

---

### Créer un produit (protégée)

```
POST /products
Authorization: Bearer <token>
Content-Type: application/json
```

**Corps de la requête** :

```json
{
  "name": "Nouveau Produit",
  "description": "Description du produit",
  "price": 49.99,
  "category": "accessoire",
  "stock": 10
}
```

**Réponse** `200` : objet `Product` créé (avec `id` généré)
**Réponse** `400` : `{ "message": "Produit avec ce nom existe déjà" }`
**Réponse** `401` : token manquant, invalide ou expiré

---

### Modifier un produit (protégée)

```
PUT /products/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Corps de la requête** : même structure que la création.

**Réponse** `200` : objet `Product` mis à jour
**Réponse** `401` : token manquant, invalide ou expiré
**Réponse** `404` : `{ "message": "Produit non trouvé" }`

---

### Supprimer un produit par ID (protégée)

```
DELETE /products/:id
Authorization: Bearer <token>
```

**Réponse** `200` : `{ "message": "Produit avec id {id} supprimé" }`
**Réponse** `401` : token manquant, invalide ou expiré
**Réponse** `404` : `{ "message": "Produit non trouvé" }`

---

### Supprimer un produit par nom (protégée)

```
DELETE /products/name/:name
Authorization: Bearer <token>
```

**Réponse** `200` : `{ "message": "Produit \"{name}\" supprimé" }`
**Réponse** `401` : token manquant, invalide ou expiré
**Réponse** `404` : `{ "message": "Produit non trouvé" }`

---

## Gestion des erreurs

Toute erreur serveur non gérée retourne :

```
HTTP 500
```

```json
{
  "error": {
    "message": "Description de l'erreur"
  }
}
```
