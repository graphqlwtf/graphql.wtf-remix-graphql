import { useLoaderData, json, redirect } from "remix";
import { gql } from "graphql-request";

import { client } from "~/lib/graphql-client";

const GetCountryByCode = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      name
      code
      capital
      currency
    }
  }
`;

export let loader = async ({ params }) => {
  const { code } = params;

  const { country } = await client.request(GetCountryByCode, {
    code,
  });

  return json({ country });
};

export let action = async ({ request }) => {
  let { code } = await request.formData();

  redirect(`/countries/${code}`);
};

export default function CountryPage() {
  let { country } = useLoaderData();

  return (
    <>
      <form method="post" action={`/countries/${country.code}`}>
        <label>
          <input name="code" type="text" placeholder="Country code" />
        </label>
        <button type="submit">Go</button>
      </form>
      <pre>{JSON.stringify(country, null, 2)}</pre>
    </>
  );
}
