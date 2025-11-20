## Philosophie / Différence avec les REST API

Le but des APIs REST est de dicter des pratiques qui permettent de designer des backend de manière indépendante du frontend, le design d'une API REST est fortement lié au schéma de la base de données, ça revient à une sorte d'abstraction de la base de données.

** GraphQL apporte de la flexibilité, ce qui est très pratique pour les applications Web modernes utilisant des framework tel que React **

> [!info]
>
> Le fondateur de GraphQL est Lee Byron, il est également connu pour avoir travaillé sur React
> Un documentaire sur la création de React peut être trouvé [ici](https://www.youtube.com/watch?v=8pDqJVdNa44)

Le langage de requête de GraphQL peut être séparé en deux: Queries et Mutations

| Nom             | Queries | Mutations             |
| --------------- | ------- | --------------------- |
| Equivalent REST | GET     | POST PUT PATCH DELETE |

## Exemples GraphQL

Pour mieux comprendre les requêtes GraphQL (côté client) on peut utiliser l['API GraphQL de GitHub](https://docs.github.com/fr/graphql/overview/explorer) qui nous permet d'explorer les informations de GitHub.

Par exemple la requête basique

```
query {
	viewer {
		login
	}
}
```

donne (DamsSifma est mon identifiant GitHub)

```json
{
  "data": {
    "viewer": {
      "login": "DamsSifma"
    }
  }
}
```

#### Nommer des queries / Variables

On peut également nommer des queries et les faire utiliser des variables

```
query getUser ($login: String!) {
  user(login: $login) {
    login
    name
    email
    company
    bio
  }
}
```

En executant cette query en passant en argument `{"login": "DamsSifma"}` on obtient

```json
{
  "data": {
    "user": {
      "login": "DamsSifma",
      "name": "Damien Massif",
      "email": "",
      "company": "Tricentis",
      "bio": "Software Engineer Apprentice working on Neoload @Tricentis "
    }
  }
}
```

## Erreurs

En prenant la requête précédente mais en changeant login en un entier (5 ici) on obtient

```json
{
  "errors": [
    {
      "extensions": {
        "value": 5,
        "problems": [
          {
            "path": [],
            "explanation": "Could not coerce value 5 to String"
          }
        ]
      },
      "locations": [
        {
          "line": 1,
          "column": 16
        }
      ],
      "message": "Variable $login of type String! was provided invalid value"
    }
  ]
}
```

Ici GraphQL nous renvoie une erreur sur la valeur "5" car la variable $login est de type String et ne peut donc pas être autre chose qu'une chaîne de caractère (cela aurait marché avec `login:"5"`)

## Requêtes multiples et renommage

Il est possible de faire plusieurs requête à la suite et nommer l'objet dans lequel insérer le résultat de la sous-requête

```
query getOrganizations {
	facebook: organization(login: "facebook") {
		login
		description
	}

	microsoft: organization(login: "microsoft") {
	login
	description
	}
}
```

_Une organisation est une sorte de "groupe" GitHub_, vous noterez que dans la requête nous ne récuéprons pas la valeur d'organisation car nous lui mettons un alias (facebook ou microsoft)

```json
{
  "data": {
    "facebook": {
      "login": "facebook",
      "description": "We are working to build community through open so\
			urce technology."
    },
    "microsoft": {
      "login": "Microsoft",
      "description": "Open source, from Microsoft with love"
    }
  }
}
```

## Fragments

Les queries pouvant être assez large on peut utiliser des fragments pour réutiliser des champs à travers les différentes requêtes

```
query getOrganizations {
	facebook: organization(login: "facebook") {
		...commonOrgInfo
		# on peut ajouter des champs ici
	}
	microsoft: organization(login: "microsoft") {
		...commonOrgInfo
		  url
	}
}

fragment commonOrgInfo on Organization {
  login
  description
}
```

## Interface et héritage

Les _Interfaces_ en GraphQL ont un fonctionnement similaire aux interfaces java ou à l'héritage dans d'autre langage (C++)
Prenons le type _Organization_ de l'API GraphQL de GitHub

```
interface RepositoryOwner {
	login: String!
	avatarUrl: String
	# ...
}
type Organization implements RepositoryOwner {
	login: String!
	avatarUrl: String
	description: String
	# ...
}
type User implements RepositoryOwner {
	login: String!
	avatarUrl: String
	company: String
	bio: String
	# ...
}
```

Ainsi _Repositoryowner_ est une interface implémentée par Organization et User, qui possèdent donc les champs de RepositoryOwner en plus d'autres champs

> En GraphQL il faut répéter les classes de l'interface dans ses implémentations

the implementations.

### Exemples plus complexes

```
query getOwner ($login : String!) {
	repositoryOwner (login: $login) {
		__typename
		avatarUrl
		... on Organization {
			description
			name
		}
		... on User {
			company
			bio
		}
	}
}
```

Réponse (avec `login: microsoft`)

```json
{
  "data": {
    "repositoryOwner": {
      "__typename": "Organization",
      "avatarUrl": "https://avatars.githubusercontent.com/u/6154722?v=4",
      "description": "Open source projects and samples from Microsoft",
      "name": "Microsoft"
    }
  }
}
```

Réponse (avec `"login": "DamsSifma"`)

```json
{
  "data": {
    "repositoryOwner": {
      "__typename": "User",
      "avatarUrl": "https://avatars.githubusercontent.com/u/119428147?v=4",
      "company": "Tricentis",
      "bio": "Software Engineer Apprentice Neoload @Tricentis"
    }
  }
}
```

## Mutations

Le but des mutations est de modifier des données, elles marchent comme les requêtes qui modifient des données dans les API REST (comme un POST)

# Clients GraphQL dédiés

Plusieurs clients GraphQL dédiés existent

- [Apollo](https://www.apollographql.com/docs) client (le plus populaire et utilisé) ->
- [Relay](https://relay.dev/) (maintenu et utilisé par Facebook) -> fait pour React et pensé en considérant la scalibilité des applications
- [Graffle](https://github.com/graffle-js/graffle) (client minimaliste)
- **[urql](https://github.com/urql-graphql/urql)** client léger mais ayant quand même beaucoup de fonctionnalités telle que le _caching_

Je vais ici utiliser Apollo client comme c'est le plus utilisé (et que nous allons aussi utiliser Apollo server plus tard)

### Mini projet GraphQL avec Apollo

Pour ce projet j'ai décidé d'utiliser Apollo pour le serveur mais aussi pour le client GraphQL, j'ai décidé de faire un monorépo.
la structure est simple

## Apollo Client

> The ApolloClient manages the complexity of orchestrating all queries. It is responsible for scheduling, optimizing, caching and sending queries to a GraphQL-endpoint

### Mise en place du projet

J'ai décidé de faire dans mon dépot deux dossier :

- Un qui sera utilisé pour le server (back) qui utilisera Apollo server
- Un pour le front (client) qui utilisera Apollo Client

#### Mise en place Apollo server

J'ai utilisé la [Documentation officielle d'Apollo server](https://www.apollographql.com/docs/apollo-server/getting-started)

- Il suffit d'initialiser un projet avec npm (ou autre) et d'installer graphql et apollo/server
  `npm install @apollo/server graphql`
- Ensuite il faut faire une petite configuration pour faire du projet un "module" qui est parfois utile (dans notre cas cela permet d'utiliser l'`await` de haut niveau - c'est à dire sans `async`)
  Dans mon cas j'ai réalisé l'installation avec Typescript car elle est recommandée et que je préfère TypeScript à JavaScript, c'est également très intéressant dans le cas d'Apollo server car nous allons pouvoir transcrire nos objets GraphQL en type TypeScript (ce qui permet de la cohérence et de la sécurité sur les types de notre code)
  (je n'explique pas cette partie là qui est classique avec TypeScript et qui est dans la documentation d'Apollo)

##### Création du schéma

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The type "Query" permet d'indiquer tout ce que l'utilsateur peut requêter
  et le résultat de ces requêtes
  type Query {
    books: [Book]
  }
`;

// Dataset de test
const books = [
  {
    title: "Le Seigneur des Anneaux",
    author: "J.R.R. Tolkien",
  },
  {
    title: "L'Étranger",
    author: "Albert Camus",
  },
];

// Résolveur qui permet de dire où chercher les types définit dans le schéma, ici pas encore de base de donnée donc on met notre tableau books

const resolvers = {
  Query: {
    books: () => books,
  },
};

// Pour construire l'objet ApolloServer il suffit de lui donner le schéma et les resolvers que l'on a définit préalablement
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// permet de créer le serveur qui va écouter les requêtes qu'on a définit (ici juste pour obtenir les livres)
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
```

> [!INFO]
>
> > Ajouter`#graphql` au début d'un [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) / [litéral de gabarit](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals) permet d'avoir la syntaxe correctement dans notre IDE (VSCode avec l'extension Apollo GraphQL officielle)

On peut désormais lancer le serveur avec `npm start` ce qui nous permet d'accéder à http://localhost:4000 pour avoir une sandbox (ressemble à celle de GitHub dans la premières partie) qui nous permet de faire des requêtes graphql et d'obtenir des résultats, on peut pas exemple requêter les livres et le reste est géré par le ApolloServer qeue l'on a créé avec notre schéma et notre résolveur pour les livres

#### Mise en place Apollo client

Pour créer le projet on créer d'abord un projet React avec Vite (outil de build Javascript très utile) puis on installe vite et ses dépendances, j'ai choisi de travailler avec TypeScript ici aussi même si la documentation d'Apollo client est en JS (ce qui est un peu dommage car en TS pour Apollo Server)

```
npm create vite@latest
npm install @apollo/client graphql rxjs
```

On peut modifier le fichier `main.tsx`pour y initialiser un ApolloClient et ajouter un provider autour de notre app avec le lien du serveur est un cache,

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
```

Ainsi tout ce qui est contenu dans notre composant `App` aura le contexte de notre ApolloProvider et pourra faire des requête à notre back à l'aide de notre ApolloClient
Voici mon `App.tsx` qui va afficher l'entièreté (pour l'instant 2) des livres stockés dans notre objet côté back.
useQuery est un _hook_ d'Apollo permettant de faire une requête à notre client (dont notre composant App possède le contexte via le ApolloProvider)

```tsx
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./App.css";

interface Book {
  title: string;
  author: string;
}

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Chargement des livres...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Ma collection de livres</h1>
      <div className="books-list">
        {data.books.map((book: Book, index: number) => (
          <div key={index} className="book-card">
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
```

Après avoir lancé le serveur avec `npm run dev` on peut aller sur http://localhost:5173 (ou le port choisi) pour accéder à notre application

#### Comment lier correctement les entités entre front et back - codegen

Voir https://www.apollographql.com/docs/apollo-server/workflow/generate-types pour générer les types côtés client

```
├── client
│   ├── eslint.config.js
│   ├── index.html
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   ├── components
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── queries
│   └── vite.config.ts
└── server
    └── src
        └── index.ts

```

## Exemple application API GraphQL Github https://github.com/Aebel-Shajan/gitmon-card-generator

# Sources

- https://www.graphqladmin.com/books/fullstack-graphql/00-preface$
- Fullstack GraphQL The Complete Guide to Writing GraphQL Servers and Clients with TypeScript (Gaetano Checinskil & Roy Derks)
- GraphQL in action (Samer Buna)
- Documentation d'Apollo Client et Apollo Server
