# Initialisation du projet

- Créer la base de l'application avec

```
npx create next-app@latest test-idun-group
```

# Structure du projet

```
test-idun-group
├──app
│   ├──favoris
│   │   ├──layout.tsx
│   │   └──page.tsx
│   ├──produits
│   │   ├──[id]
│   │   │   ├──loading.tsx
│   │   │   ├──not-found.tsx
│   │   │   └──page.tsx
│   │   └──page.tsx
│   ├──favicon.ico
│   ├──globals.css
│   ├──layout.tsx
│   ├──not-found.tsx
│   └──page.tsx
├──components
│   ├──favorites
│   │   └──favorites-table.tsx
│   ├──product
│   │   └──product-detail.tsx
│   └──shared
│   │   ├──header
│   │   │   ├──index.tsx
│   │   │   └──main-menu.tsx
│   │   └──footer.tsx
├──data
│   └──produits.json
├──hooks
│   ├──useDebounce.ts
│   └──useFavorites.ts
├──lib
│   ├──actions
│   │   └──product.actions.ts
│   ├──constants
│   │   └──index.ts
│   └──utils.ts
├──public
│   ├──images
│   │   └──logo.svg
│   ├──file.svg
│   ├──globe.svg
│   ├──next.svg
│   ├──vercel.svg
│   └──window.svg
├──types
│   └──index.ts
├──AI_LOG.md
├──eslint.config.mjs
├──exemple.env
├──next.config.ts
├──package-lock.json
├──package.json
├──postcss.config.mjs
├──README.md
├──tsconfig.json
└──.gitignore
```

# 2 Configuration

    - Rendre accessible l'exploitation des images du fichier products.json issu de picsum.photos par Next
    - Créer .env pour facilité le renseignement des metadatas et la configuration du projet
        NEXT_PUBLIC_APP_NAME
        NEXT_PUBLIC_APP_DESCRIPTION
        NEXT_PUBLIC_SERVER_URL

# 3 Détail de la structure et organisation

- /types
  // Liste l'ensemble des types utilisé dans l'application

- /lib
  /actions
  | - pruduct.actions.ts (getPrducts - getProductById)
  // Centrealiser l'ensemblre des actions sur un model Product et simule l'asscès aux données avec des fonction asynchones

  | utils.ts

  - formatCurrency // fixe la devise local en EUR
    // regroupe les fonctions utilitaires, comme la mise en forme des prix

  /constantes

  - index.ts
    // Créer des varialble globale pour accéder facilement si le .env n'est pas renseigné

- / components
  | /shared // Des composants commun dau sein de l'application
  | /product // Composants dédié aux produits
  | /favorites // Composants dédié aux favoris

- /hooks
  - useFavorites // Pour facilité la gestion des favoris et la sauvegarde dans le localStoratge par le biais d'un hook
  - useDebounce // Facilite l'utilisation du débouce pour les actions de la fait sue la barre de recherche
    // Regroupe les différents hooks utilisé aus seins de l'application

# 4 Utilisation de l'IA

    - Avoir un exemple pour la gestion des favoris avec le localStorage
    - Avoir un exemple de barre de recherche et les différents filtre rapidement fonctionnnel
    - Avoir un exemple pour les metadata dynamique
