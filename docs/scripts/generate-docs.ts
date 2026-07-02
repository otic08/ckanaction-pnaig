import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

void generateFiles({
  input: createOpenAPI({
    input: ["./lib/openapi.yml"],
  }),
  output: './content/docs',
  // Group operation pages in folders using OpenAPI tags.
  // This allows sidebar submenus such as datasets/, users/, orgs/, etc.
  per: 'operation',
  groupBy: 'tag',
  // Generate meta.json files for grouped folders.
  meta: {
    folderStyle: 'folder',
  },
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
});
