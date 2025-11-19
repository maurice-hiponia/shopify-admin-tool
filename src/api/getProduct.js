import { client } from './../config/shopifyClient.js';

export async function getProducts() {
  const allProducts = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const operation = `
      query GetProducts($cursor: String) {
        products(first: 250, after: $cursor) {
          edges {
            node {
              id
              title
              status
              handle
              mediaCount {
                count
              }
              priceRangeV2 {
                maxVariantPrice {
                  amount
                }
              }
              compareAtPriceRange {
                maxVariantCompareAtPrice {
                  amount
                }
              }
              tags
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`;

    const variables = cursor ? { cursor } : {};

    const { data, errors } = await client.request(operation, { variables });

    if (errors) {
      console.error(errors.graphQLErrors);
      return [];
    }

    const products = data.products.edges.map(edge => edge.node);
    allProducts.push(...products);

    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
  }

  return allProducts;
}
