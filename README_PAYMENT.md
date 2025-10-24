# Intégration des Paiements Wave et Orange Money

Ce guide vous explique comment configurer et utiliser les APIs de paiement Wave et Orange Money dans votre application e-commerce.

## 🚀 Fonctionnalités

- ✅ Intégration Wave Mobile Money
- ✅ Intégration Orange Money
- ✅ Interface de paiement moderne et responsive
- ✅ Gestion des erreurs et statuts de paiement
- ✅ Validation des formulaires
- ✅ Redirection sécurisée vers les plateformes de paiement

## 📋 Prérequis

1. **Compte Wave** : Inscrivez-vous sur [Wave](https://wave.com) pour obtenir vos clés API
2. **Compte Orange Money** : Inscrivez-vous sur [Orange Money Business](https://business.orange.ci) pour obtenir vos identifiants
3. **Variables d'environnement** : Configurez vos clés API dans le fichier `.env.local`

## ⚙️ Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet avec les variables suivantes :

```env
# Configuration de base
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Configuration Wave
WAVE_API_URL=https://api.wave.com/v1
WAVE_PUBLIC_KEY=your_wave_public_key_here
WAVE_SECRET_KEY=your_wave_secret_key_here
NEXT_PUBLIC_WAVE_API_URL=https://api.wave.com/v1
NEXT_PUBLIC_WAVE_PUBLIC_KEY=your_wave_public_key_here

# Configuration Orange Money
ORANGE_MONEY_API_URL=https://api.orange.com/orange-money-webpay
ORANGE_MONEY_CLIENT_ID=your_orange_money_client_id_here
ORANGE_MONEY_CLIENT_SECRET=your_orange_money_client_secret_here
NEXT_PUBLIC_ORANGE_MONEY_API_URL=https://api.orange.com/orange-money-webpay
NEXT_PUBLIC_ORANGE_MONEY_CLIENT_ID=your_orange_money_client_id_here
```

### 2. Obtenir les clés API

#### Wave

1. Connectez-vous à votre compte Wave Business
2. Allez dans la section "API" ou "Développeurs"
3. Générez vos clés API (clé publique et clé secrète)
4. Copiez-les dans votre fichier `.env.local`

#### Orange Money

1. Connectez-vous à votre compte Orange Money Business
2. Allez dans la section "API" ou "Intégration"
3. Créez une nouvelle application
4. Récupérez votre `client_id` et `client_secret`
5. Copiez-les dans votre fichier `.env.local`

## 🔧 Utilisation

### 1. Page de paiement

La page de paiement est accessible via `/payment` et permet aux utilisateurs de :

- Sélectionner leur méthode de paiement (Wave ou Orange Money)
- Saisir leurs informations de livraison
- Confirmer leur commande

### 2. Flux de paiement

1. **Sélection de la méthode** : L'utilisateur choisit entre Wave et Orange Money
2. **Saisie des informations** : Nom, email, téléphone
3. **Initiation du paiement** : Redirection vers la plateforme de paiement
4. **Confirmation** : Retour sur la page de succès/échec

### 3. API Endpoints

#### Initier un paiement Wave

```typescript
POST /api/payment/wave
{
  "amount": 1000,
  "currency": "XOF",
  "description": "Commande ORDER_123",
  "orderId": "ORDER_123",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+225123456789"
  },
  "items": [...]
}
```

#### Initier un paiement Orange Money

```typescript
POST /api/payment/orange-money
{
  "amount": 1000,
  "currency": "XOF",
  "description": "Commande ORDER_123",
  "orderId": "ORDER_123",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+225123456789"
  },
  "items": [...]
}
```

#### Vérifier le statut d'un paiement

```typescript
GET / api / payment / status / { method } / { transactionId };
```

## 🎨 Personnalisation

### Modifier les méthodes de paiement

Pour ajouter ou modifier les méthodes de paiement, éditez le fichier `app/payment/page.tsx` :

```typescript
const paymentMethods: PaymentMethod[] = [
  {
    id: "wave",
    name: "Wave",
    icon: "🌊",
    description: "Paiement sécurisé via Wave Mobile Money",
    enabled: true,
  },
  {
    id: "orange_money",
    name: "Orange Money",
    icon: "🍊",
    description: "Paiement sécurisé via Orange Money",
    enabled: true,
  },
  // Ajoutez d'autres méthodes ici
];
```

### Styling personnalisé

Les composants utilisent Tailwind CSS. Vous pouvez personnaliser les styles en modifiant les classes CSS dans les fichiers de composants.

## 🔒 Sécurité

### Bonnes pratiques

1. **Ne jamais exposer les clés secrètes** côté client
2. **Utiliser HTTPS** en production
3. **Valider toutes les données** côté serveur
4. **Implémenter des webhooks** pour les notifications de paiement
5. **Logger les transactions** pour le suivi

### Variables d'environnement sécurisées

- Les clés secrètes (`WAVE_SECRET_KEY`, `ORANGE_MONEY_CLIENT_SECRET`) ne sont utilisées que côté serveur
- Les clés publiques peuvent être exposées côté client si nécessaire

## 🧪 Tests

### Mode développement

En mode développement, les APIs utilisent des réponses simulées. Pour tester avec de vraies APIs :

1. Configurez vos vraies clés API
2. Décommentez le code d'appel API réel dans les fichiers de route
3. Testez avec de petits montants

### Tests de paiement

1. Utilisez les numéros de test fournis par Wave et Orange Money
2. Testez les différents scénarios (succès, échec, annulation)
3. Vérifiez les redirections et les callbacks

## 🚨 Dépannage

### Erreurs courantes

1. **"Clé API invalide"** : Vérifiez vos clés dans `.env.local`
2. **"Erreur de connexion"** : Vérifiez l'URL de l'API
3. **"Montant invalide"** : Assurez-vous que le montant est positif
4. **"Numéro de téléphone requis"** : Vérifiez le format du numéro

### Logs

Les erreurs sont loggées dans la console du serveur. Vérifiez les logs pour diagnostiquer les problèmes.

## 📞 Support

Pour obtenir de l'aide :

1. **Wave** : [Support Wave](https://wave.com/support)
2. **Orange Money** : [Support Orange Money Business](https://business.orange.ci/support)
3. **Documentation technique** : Consultez les docs officielles des APIs

## 🔄 Mises à jour

Pour mettre à jour l'intégration :

1. Vérifiez les changements dans les APIs Wave et Orange Money
2. Mettez à jour les URLs et paramètres si nécessaire
3. Testez les nouvelles fonctionnalités
4. Mettez à jour la documentation

---

**Note** : Cette intégration utilise des réponses simulées en mode développement. Pour la production, décommentez et configurez les vrais appels API dans les fichiers de route.




