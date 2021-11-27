import { useLoaderData, json, Link } from "remix";
import { gql } from "graphql-request";

import { client } from "~/lib/graphql-client";

const GetAllCountries = gql`
  {
    countries {
      name
      code
    }
  }
`;

export let loader = async () => {
  const { countries } = await client.request(GetAllCountries);

  return json({ countries });
};

export let meta = () => {
  return {
    title: "GraphQL + Remix",
    description: "WTF is GraphQL?",
  };
};

export default function Index() {
  let { countries } = useLoaderData();

  return (
    <div>
      <h1>Remix + GraphQL!</h1>

      <ul>
        {countries.map(({ code, name }) => (
          <li key={code}>
            <Link to={`/countries/${code}`} prefetch="intent">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
