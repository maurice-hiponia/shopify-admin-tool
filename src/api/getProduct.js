import { client } from './../config/shopifyClient.js';

export async function getProducts() {
  const operation = `
    query GetProducts {
      products(first: 200) {
        nodes {
          id
          title
        }
      }
    }`;

  const { data, errors } = await client.request(operation);

  if (errors) {
    console.error(errors);
    return [];
  }

  return data.products.nodes;
}
