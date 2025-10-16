import { startStandaloneServer } from "@apollo/server/standalone";
import { server } from "./server.js";

// Permet de créer le serveur qui va écouter les requêtes qu'on a définit (ici juste pour obtenir les livres)
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
